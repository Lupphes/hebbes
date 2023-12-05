from typing import TYPE_CHECKING, List
from db.database import Base

from sqlalchemy import Integer, String
from sqlalchemy.orm import relationship, mapped_column, Mapped

from models.item_category import item_category_association
from models.item_store import item_store_association

if TYPE_CHECKING:
    from .picture import Picture
    from .store import Store
    from .category import Category


class Item(Base):
    __tablename__ = "item"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    name: Mapped[str] = mapped_column(String(255))
    brand: Mapped[str] = mapped_column(String(50))
    description: Mapped[str] = mapped_column(String)
    gln: Mapped[str] = mapped_column(String(14))
    gtin: Mapped[str] = mapped_column(String(14))

    measurements_units: Mapped[str] = mapped_column(String)
    measurements_amount: Mapped[str] = mapped_column(String)
    measurements_label: Mapped[str] = mapped_column(String)

    picture: Mapped["Picture"] = relationship(
        "Picture", uselist=False, back_populates="item"
    )
    stores: Mapped[List["Store"]] = relationship(
        "Store", secondary=item_store_association, back_populates="items"
    )
    categories: Mapped[List["Category"]] = relationship(
        "Category", secondary=item_category_association, back_populates="items"
    )
