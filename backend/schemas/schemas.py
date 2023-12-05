from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import List, Optional, Annotated
from datetime import datetime


class UserBase(BaseModel):
    email: EmailStr = Field(..., description="The user's email address")


class UserCreate(UserBase):
    password: Annotated[str, StringConstraints(min_length=8)] = Field(
        description="The user's password (minimum 8 characters)"
    )


class UserLogin(UserBase):
    password: str = Field(description="The user's password for login")


class User(UserBase):
    id: int = Field(description="The unique identifier of the user")
    is_active: Optional[bool] = Field(default=True, description="Is the user active")
    created_at: Optional[datetime] = Field(description="User creation time")

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str = Field(description="The JWT access token")
    token_type: str = Field(
        default="bearer", description="The type of the token (typically 'bearer')"
    )


class PictureLinkBase(BaseModel):
    id: Optional[int]
    item_id: Optional[int]
    category_id: Optional[int]
    width: int
    height: int
    url: str


class Category(BaseModel):
    id: int
    name: str
    parent_id: Optional[int]

    pictures: List[PictureLinkBase] = []

    class Config:
        from_attributes = True
        orm_mode = True

class Store(BaseModel):
    id: int = Field(description="The unique identifier of the store")
    name: str
    link: str
    price: Optional[float]
    discount_info: List[Optional[dict]]


class ItemResponse(BaseModel):
    id: int
    name: str
    brand: str
    description: str
    gln: str
    gtin: str
    measurements_units: str
    measurements_amount: str
    measurements_label: str
    picture_link: Optional[PictureLinkBase]
    categories: List[Category]
    stores: List[Store]

    class Config:
        from_attributes = True
        orm_mode = True