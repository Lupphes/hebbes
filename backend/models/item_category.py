from db.database import Base
from sqlalchemy import Column, Integer, ForeignKey, Table


item_category_association = Table(
    "item_category_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("item.id")),
    Column("category_id", Integer, ForeignKey("category.id")),
)
