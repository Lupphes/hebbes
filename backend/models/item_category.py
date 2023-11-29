from db.database import Base
from sqlalchemy import Column, ForeignKey, Integer, Table
from sqlalchemy.orm import relationship


item_category_association = Table(
    "item_category_association",
    Base.metadata,
    Column("item_id", Integer, ForeignKey("items.id")),
    Column("category_id", Integer, ForeignKey("categories.id")),
)
