from datetime import datetime, timedelta
from jose import jwt
import os

from backend.db.jwt_secret import get_or_create_secret_key


def create_access_token(email: str, expires_delta: int) -> str:
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode = {"sub": email, "exp": expire}
    encoded_jwt = jwt.encode(
        to_encode,
        get_or_create_secret_key(),
        algorithm=os.environ["JWT_ALGORITHM"],
    )
    return encoded_jwt
