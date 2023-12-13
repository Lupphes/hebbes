from pydantic import BaseModel
from typing import Optional


class PictureSchema(BaseModel):
    id: Optional[int]
    item_id: Optional[int]
    category_id: Optional[int]
    width: int
    height: int
    url: str
