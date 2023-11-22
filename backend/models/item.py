from db.database import Base
from sqlalchemy import Column, Integer, String, Float, JSON


class Item(Base):
    __tablename__ = "items"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255))
    link = Column(String(255))
    piture_links = Column(JSON)
    brand = Column(String(50))
    saleUnitSize_units = Column(String(50))
    saleUnitSize_amount = Column(Float)
    saleUnitSize_label = Column(String(255))
    measurements = Column(JSON)
    specific = Column(JSON)
    description = Column(String(300))
    gln = Column(String(255))
    gtin = Column(String(255))
