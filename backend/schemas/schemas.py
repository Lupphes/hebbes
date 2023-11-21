from pydantic import BaseModel, EmailStr, Field, StringConstraints
from typing import Annotated


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
        orm_mode = True


class Token(BaseModel):
    access_token: str = Field(description="The JWT access token")
    token_type: str = Field(
        default="bearer", description="The type of the token (typically 'bearer')"
    )
