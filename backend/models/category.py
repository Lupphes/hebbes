from db.database import Base
from sqlalchemy import Column, Integer, String
from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship, backref


item_category_association = Table(
    "item_category_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("items.id")),
    Column("category_id", Integer, ForeignKey("categories.id")),
)


class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=True)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    subcategories = relationship(
        "Category", backref=backref("parent", remote_side=[id])
    )
    pictures = relationship("PictureLink", backref="category")

    items = relationship(
        "Item", secondary=item_category_association, back_populates="categories"
    )

    def __str__(self):
        return f"Category(id={self.id}, name={self.name}, parent_id={self.parent_id}, subcategories={self.subcategories})"
