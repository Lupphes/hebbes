from db.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship, declarative_base
from models.item_category import item_category_association


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    sub_category_name = Column(String, nullable=True)
    top_category_name = Column(String, nullable=True)

    items = relationship(
        "Item", secondary=item_category_association, back_populates="categories"
    )
