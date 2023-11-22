from db.database import Base
from sqlalchemy import Column, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import relationship
from models.item import Item
from models.category import Category


class ItemCategory(Base):
    __tablename__ = "item_category"

    item_id = Column(Integer, ForeignKey("items.id"), primary_key=True, index=True)
    category_id = Column(
        Integer, ForeignKey("categories.id"), primary_key=True, index=True
    )
    item = relationship(Item, foreign_keys=[item_id])
    company = relationship(Category, foreign_keys=[category_id])

    __table_args__ = (
        UniqueConstraint("item_id", "category_id", name="_item_category_uc"),
    )
