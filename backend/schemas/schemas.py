from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import Dict, List, Optional, Annotated
from datetime import datetime


class UserBaseSchema(BaseModel):
    email: EmailStr = Field(..., description="The user's email address")


class UserCreateSchema(UserBaseSchema):
    password: Annotated[str, StringConstraints(min_length=8)] = Field(
        description="The user's password (minimum 8 characters)"
    )


class UserLoginSchema(UserBaseSchema):
    password: str = Field(description="The user's password for login")


class UserSchema(UserBaseSchema):
    id: int = Field(description="The unique identifier of the user")
    is_active: Optional[bool] = Field(default=True, description="Is the user active")
    created_at: Optional[datetime] = Field(description="User creation time")

    class Config:
        from_attributes = True


class TokenSchema(BaseModel):
    access_token: str = Field(description="The JWT access token")
    token_type: str = Field(
        default="bearer", description="The type of the token (typically 'bearer')"
    )


class PictureSchema(BaseModel):
    id: Optional[int]
    item_id: Optional[int]
    category_id: Optional[int]
    width: int
    height: int
    url: str


class CategorySchema(BaseModel):
    id: int
    category_id: Optional[int]
    name: str
    parent_id: Optional[int]
    subcategories: List["CategorySchema"] = []

    pictures: List[PictureSchema] = []

    class Config:
        orm_mode = True


class ItemNested(BaseModel):
    id: int
    name: str
    description: str
    picture: Optional[PictureSchema]

class StoreSchema(BaseModel):
    id: int = Field(description="The unique identifier of the store")
    name: str
    store_link: Optional[str]
    items: List[ItemNested] = []
    class Config:
        orm_mode = True
class ItemInfoSchema(BaseModel):
    id: int
    item_id: Optional[int]
    store_id: Optional[int]
    product_link: str
    price: float
    discount_info: List[Optional[dict]]
    class Config:
        orm_mode = True
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
        orm_mode = True
