from typing import List, Optional, TYPE_CHECKING

from db.database import Base

from sqlalchemy import JSON, String, Integer, Float, null
from sqlalchemy.orm import relationship, mapped_column, Mapped

from models.item_store import item_store_association
if TYPE_CHECKING:
    from .item import Item


class Store(Base):
    __tablename__ = "store"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255), nullable=True)
    store_link: Mapped[str] = mapped_column(String(255), nullable=True)

    items: Mapped[List["Item"]] = relationship(
        "Item", secondary=item_store_association, back_populates="stores"
    )
