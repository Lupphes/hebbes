from typing import TYPE_CHECKING, List
from db.database import Base

from sqlalchemy import Integer, ForeignKey, String
from sqlalchemy.orm import relationship, backref, mapped_column, Mapped

from models.item_category import item_category_association

if TYPE_CHECKING:
    from .picture import Picture
    from .item import Item


class Category(Base):
    __tablename__ = "category"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    category_id: Mapped[int] = mapped_column(Integer, nullable=True, unique=True)

    name: Mapped[str] = mapped_column(String, nullable=True)
    parent_id: Mapped[int] = mapped_column(
        Integer,
        ForeignKey("category.id"),
        nullable=True,
    )

    subcategories: Mapped[List["Category"]] = relationship(
        "Category", backref=backref("parent", remote_side=[id])
    )
    pictures: Mapped[List["Picture"]] = relationship(
        "Picture", back_populates="category"
    )
    items: Mapped[List["Item"]] = relationship(
        "Item", secondary=item_category_association, back_populates="categories"
    )

    def __str__(self):
        return f"Category(id={self.id}, name={self.name}, parent_id={self.parent_id}, subcategories={self.subcategories})"
