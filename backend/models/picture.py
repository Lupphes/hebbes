from typing import Optional, TYPE_CHECKING
from db.database import Base

from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import mapped_column, Mapped, relationship

if TYPE_CHECKING:
    from .item import Item
    from .category import Category


class Picture(Base):
    __tablename__ = "picture"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    item_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("item.id"), nullable=True
    )
    category_id: Mapped[Optional[int]] = mapped_column(
        Integer, ForeignKey("category.id"), nullable=True
    )
    width: Mapped[int] = mapped_column(Integer, nullable=True)
    height: Mapped[int] = mapped_column(Integer, nullable=True)
    url: Mapped[str] = mapped_column(String, nullable=True)

    item: Mapped[Optional["Item"]] = relationship("Item", back_populates="picture")
    category: Mapped[Optional["Category"]] = relationship(
        "Category", back_populates="pictures"
    )
