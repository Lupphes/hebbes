import os

from datetime import datetime, timedelta

from fastapi import HTTPException, Header

from jose import jwt
from jose.exceptions import JWTError

from db.jwt_secret import generate_and_retrieve_rsa_keys_serialized
from utils.helpers import blacklisted_tokens


def create_access_token(email: str, expires_delta: int) -> str:
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    expire_timestamp = int(expire.timestamp())

    private_key, _ = generate_and_retrieve_rsa_keys_serialized()
    to_encode = {"sub": email, "exp": expire_timestamp}
    encoded_jwt = jwt.encode(
        to_encode,
        private_key,
        algorithm=os.environ.get("JWT_ALGORITHM", "RS256"),
    )
    return encoded_jwt


def validate_user_auth(authorization: str = Header()):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    try:
        token = authorization.split("Bearer ")[1]
        if token in blacklisted_tokens:
            raise HTTPException(status_code=401, detail="Token revoked")

        private_key, _ = generate_and_retrieve_rsa_keys_serialized()
        payload = jwt.decode(
            token,
            private_key,
            algorithms=os.environ.get("JWT_ALGORITHM", "RS256"),
        )
        email = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=401, detail="Could not validate credentials"
            )
        return email
    except JWTError as e:
        raise HTTPException(status_code=401, detail=f"JWT Error: {str(e)}")
