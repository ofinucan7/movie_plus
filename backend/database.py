from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os

# load the db url from .env
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

# connect sqlalchemy --> DB w/ the URL
engine = create_engine(DATABASE_URL)

# Get class to make DB session object
# Note: autoflush disables pushing changes to DB unless manually commit() or flush()
SessionLocal = sessionmaker(bind=engine, autoflush=False)

# create a base class
Base = declarative_base()