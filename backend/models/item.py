from db.database import Base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from models.item_store import item_store_association
from .category import item_category_association


class PictureLink(Base):
    __tablename__ = "picture_links"
    id = Column(Integer, primary_key=True)
    item_id = Column(Integer, ForeignKey("items.id"), nullable=True)
    category_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    url = Column(String, nullable=True)


class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    picture_link = relationship("PictureLink", uselist=False)

    brand = Column(String(50))

    measurements_units = Column(String)
    measurements_amount = Column(String)
    measurements_label = Column(String)

    description = Column(String)
    gln = Column(String(255))
    gtin = Column(String(255))
    categories = relationship(
        "Category", secondary=item_category_association, back_populates="items"
    )
    stores = relationship(
        "Store", secondary=item_store_association, back_populates="items"
    )
