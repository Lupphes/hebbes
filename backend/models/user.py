from db.config import Base
from sqlalchemy import Column, String, Integer


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    email = Column(String(100), unique=True, index=True)
    password = Column(String(256))
