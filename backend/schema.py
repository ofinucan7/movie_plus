from pydantic import BaseModel, EmailStr

# base user class
class UserCreate(BaseModel):
    email: EmailStr
    username: str
    password: str
    stripe_token: str
    subscription_type: str

# used for updating password (in main.py)
class UpdatePassword(BaseModel):
    password: str