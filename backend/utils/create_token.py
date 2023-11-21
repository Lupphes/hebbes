from datetime import datetime, timedelta
from jose import jwt
import os

from backend.db.jwt_secret import generate_and_retrieve_rsa_keys_serialized


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
