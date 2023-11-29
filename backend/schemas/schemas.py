from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import List, Optional, Annotated


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

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str = Field(description="The JWT access token")
    token_type: str = Field(
        default="bearer", description="The type of the token (typically 'bearer')"
    )


class PictureLink(BaseModel):
    width: int
    height: int
    url: str


class Category(BaseModel):
    sub_category_name: str
    top_category_name: str


class Store(BaseModel):
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
    picture_links: PictureLink
    categories: List[Category]
    stores: List[Store]
