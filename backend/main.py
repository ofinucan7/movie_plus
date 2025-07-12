from fastapi import FastAPI, Depends, HTTPException, Body
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, encrypt, stripe_handler, schema
from datetime import date, timedelta
from fastapi.middleware.cors import CORSMiddleware
from schema import UpdatePassword

# init fastapi app and add backend
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://movieplus-production.up.railway.app"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ensure all tables defined in models are there; bind=engine connects to db
models.Base.metadata.create_all(bind=engine)

# opens new SQLalchemy session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# post request; ensure user input matches schema format and injects db to route
@app.post("/register")
def register_user(user: schema.UserCreate, db: Session = Depends(get_db)):
    # check if the email is already in the db
    email_already_exists = db.query(models.User).filter_by(email=user.email).first()
    if email_already_exists:
        raise HTTPException(status_code=400, detail="Email already in use.")
    
    # encrypt the pw
    encrypted_pw = encrypt.encrypt_pw(user.password)

    # create customer w/ stripe based on email and card token
    try:
        stripe_id = stripe_handler.create_stripe_customer(user.email, user.stripe_token)
    except Exception as e:
        raise HTTPException(status_code=400, details=f"Stripe error: {str(e)}")
    
    # create the User object and commit it to the db
    new_user = models.User(email=user.email, username=user.username, password=encrypted_pw, stripe_customer_id=stripe_id, subscription_type=user.subscription_type,
                           renew_date=(date.today() + timedelta(days=30)))
    db.add(new_user)
    db.commit()

    # reloads the object to get auto-generated field(s); ie (id)
    db.refresh(new_user)

    return {"message" : "user successfully added"}

# post request; try to login the user
@app.post("/login")
def user_login(data: dict=Body(...), db: Session=Depends(get_db)):
    # get the username and password entered
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        raise HTTPException(status_code=400, detail="Please enter a username and password")
    
    # check if the user exists
    user = db.query(models.User).filter_by(username=username).first()

    if not user:
        raise HTTPException(status_code=401, detail="Please enter a valid username")
    else:
        # if user exists, check if the entered password is correct
        pw_valid = encrypt.verify_pw(password, user.password)
        if not pw_valid:
            raise HTTPException(status_code=401, detail="Invalid password")
        
    return {"message": "Login successful!", "username":user.username, "email":user.email, "subscription_type":user.subscription_type, "renew_date":str(user.renew_date)}

# load the data for { username }
@app.get("/profile/{username}")
def get_profile(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(username=username).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "username": user.username,
        "email": user.email,
        "subscription_type": user.subscription_type,
        "renew_date": user.renew_date
    }

# update the password of { username }
@app.put("/update-password/{username}")
def update_password(username: str, pw_data: UpdatePassword, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(username=username).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # encrypt the new password
    encrypted_pw = encrypt.encrypt_pw(pw_data.password)
    user.password = encrypted_pw

    db.commit()
    return {"message": "Password updated successfully"}

# delete the account of { username }
@app.delete("/delete-account/{username}")
def delete_account(username: str, db: Session = Depends(get_db)):
    user = db.query(models.User).filter_by(username=username).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    db.delete(user)
    db.commit()
    return {"message": "User account deleted"}
