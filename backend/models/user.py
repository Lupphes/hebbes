from datetime import datetime
from typing import Optional
from db.database import Base

from sqlalchemy import String, Integer, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import mapped_column, Mapped


class User(Base):
    __tablename__ = "user"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    email: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    password: Mapped[str] = mapped_column(String(256))
    is_active: Mapped[Optional[bool]] = mapped_column(Boolean, default=True)
    created_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
