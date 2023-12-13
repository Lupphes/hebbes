from pydantic import BaseModel
from typing import List, Optional

from schemas import PictureSchema


class CategorySchema(BaseModel):
    id: int
    category_id: Optional[int]
    name: str
    parent_id: Optional[int]
    subcategories: List["CategorySchema"] = []

    pictures: List[PictureSchema] = []

    class Config:
        from_attributes = True
