from pydantic import BaseModel
from typing import Dict, List, Optional

from schemas import PictureSchema, CategorySchema


class ItemInfoSchema(BaseModel):
    id: int
    item_id: Optional[int]
    store_id: Optional[int]
    product_link: str
    price: Optional[float]
    discount_info: List[Optional[dict]]

    class Config:
        from_attributes = True


class ItemSchema(BaseModel):
    id: int
    name: str
    brand: str
    description: str
    gln: str
    gtin: str
    measurements_units: str
    measurements_amount: str
    measurements_label: str
    picture_link: Optional[PictureSchema]
    categories: List[CategorySchema]
    item_info: Dict[str, ItemInfoSchema]

    class Config:
        from_attributes = True
