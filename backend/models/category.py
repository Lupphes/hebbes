from db.database import Base
from sqlalchemy import Column, Integer, String
from models.item_category import item_category_association
from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship, backref


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    id_category = Column(Integer, nullable=True, unique=True)

    name = Column(String, nullable=True)
    parent_id = Column(Integer, ForeignKey("categories.id_category"), nullable=True)
    subcategories = relationship(
        "Category", backref=backref("parent", remote_side=[id_category])
    )
    pictures = relationship("PictureLink", backref="category")

    items = relationship(
        "Item", secondary=item_category_association, back_populates="categories"
    )

    def __str__(self):
        return f"Category(id_category={self.id_category}, name={self.name}, parent_id={self.parent_id}, subcategories={self.subcategories})"
