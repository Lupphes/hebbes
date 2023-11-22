from db.database import Base
from sqlalchemy import Column, String, Integer


class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    link = Column(String(255))
    description = Column(String)
