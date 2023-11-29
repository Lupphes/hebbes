from db.database import Base
from sqlalchemy import JSON, Column, String, Integer, Float
from sqlalchemy.orm import relationship, declarative_base
from models.item_store import item_store_association


class Store(Base):
    __tablename__ = "stores"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=True)
    link = Column(String(255), nullable=True)
    price = Column(Float, nullable=True)
    discount_info = Column(JSON)  # Store discount_info as JSON

    items = relationship(
        "Item", secondary=item_store_association, back_populates="stores"
    )
