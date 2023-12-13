from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import Optional, Annotated
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
