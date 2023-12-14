from pydantic import BaseModel, Field
from typing import Optional


class StoreSchema(BaseModel):
    id: int = Field(description="The unique identifier of the store")
    name: str
    store_link: Optional[str]

    class Config:
        from_attributes = True
