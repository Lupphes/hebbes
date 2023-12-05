from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Table


item_store_association = Table(
    "item_store_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("item.id")),
    Column("store_id", Integer, ForeignKey("store.id")),
)
