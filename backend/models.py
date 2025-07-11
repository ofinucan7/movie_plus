from sqlalchemy import Column, Integer, String, Date
from database import Base

# Create the model class User
class User(Base):
    # Labels name of table as users
    __tablename__ = 'users'

    # id is primary key; email and username must be unique
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True)
    password = Column(String)
    stripe_customer_id = Column(String)
    subscription_type = Column(String)
    renew_date = Column(Date)