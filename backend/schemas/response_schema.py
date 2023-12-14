from pydantic import BaseModel
from typing import Any, Optional


class ResponseSchema(BaseModel):
    data: Optional[Any] = None
    message: Optional[str] = None
    success: bool

    class Config:
        arbitrary_types_allowed = True

    @classmethod
    def success_response(cls, data: Any = None, message: str = "Operation successful"):
        return cls(data=data, message=message, success=True)

    @classmethod
    def error_response(cls, message: str = "Operation failed", data: Any = None):
        return cls(data=data, message=message, success=False)
