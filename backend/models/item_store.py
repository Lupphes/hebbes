from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Table


item_store_association = Table(
    "item_store_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("items.id")),
    Column("store_id", Integer, ForeignKey("stores.id")),
)
