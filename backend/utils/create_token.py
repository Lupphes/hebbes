from db import config
from datetime import datetime, timedelta

from jose import jwt, JWTError


def create_access_token(email, expires_delta):
    to_encode = {"sub": email}
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        config.settings.jwt_secret_key,
        algorithm=config.settings.jwt_algorithm,
    )
    return encoded_jwt
