from typing import List, Optional, TYPE_CHECKING

from db.database import Base

from sqlalchemy import JSON, ForeignKey, String, Integer, Float, null
from sqlalchemy.orm import relationship, mapped_column, Mapped, backref

if TYPE_CHECKING:
    from .store import Store
    from .item import Item


class ItemInfo(Base):
    __tablename__ = "item_info"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    item_id: Mapped[int] = mapped_column(Integer, ForeignKey("item.id"))
    store_id: Mapped[int] = mapped_column(Integer, ForeignKey("store.id"))
    product_link: Mapped[str] = mapped_column(String(255), nullable=True)
    price: Mapped[float] = mapped_column(Float, nullable=True)
    discount_info: Mapped[List[Optional[dict]]] = mapped_column(JSON)

    item: Mapped["Item"] = relationship("Item", back_populates="item_infos")
    store: Mapped["Store"] = relationship(
        "Store", backref=backref("item_infos", uselist=True, cascade="delete,all")
    )
