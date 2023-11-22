from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey


class CategoryTree(Base):
    __tablename__ = "category_tree"

    category_id = Column(
        Integer, ForeignKey("categories.id"), primary_key=True, index=True
    )
    sub_category_id = Column(
        Integer, ForeignKey("categories.id"), primary_key=True, index=True
    )
