from db.database import Base
from sqlalchemy import (
    Column,
    Integer,
    ForeignKey,
    UniqueConstraint,
)
from sqlalchemy.orm import relationship
from models.item import Item
from models.company import Company


class ItemCompany(Base):
    __tablename__ = "item_company"

    item_id = Column(Integer, ForeignKey("items.id"), primary_key=True, index=True)
    company_id = Column(
        Integer, ForeignKey("companies.id"), primary_key=True, index=True
    )

    item = relationship(Item, foreign_keys=[item_id])
    company = relationship(Company, foreign_keys=[company_id])

    __table_args__ = (
        UniqueConstraint("item_id", "company_id", name="_item_company_uc"),
    )
