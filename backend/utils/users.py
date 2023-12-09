import os
from fastapi import HTTPException, Header

from db.jwt_secret import generate_and_retrieve_rsa_keys_serialized
from utils.misc import blacklisted_tokens

from jose import jwt
from jose.exceptions import JWTError


def get_current_user(authorization: str = Header()):
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
