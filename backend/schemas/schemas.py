from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import List, Optional, Annotated
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

    pictures: List[PictureSchema] = []

    class Config:
        orm_mode = True


class StoreSchema(BaseModel):
    id: int = Field(description="The unique identifier of the store")
    name: str
    link: str
    price: Optional[float]
    discount_info: List[Optional[dict]]


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
    stores: List[StoreSchema]

    class Config:
        from_attributes = True
        orm_mode = True
