import os
from pathlib import Path
import secrets


def get_or_create_secret_key():
    secret_key_file = Path(__file__).parent / "jwt_secret.key"
    if secret_key_file.is_file():
        with open(secret_key_file, "r") as file:
            secret_key = file.read()
    else:
        secret_key = secrets.token_urlsafe(32)
        with open(secret_key_file, "w") as file:
            file.write(secret_key)
    return secret_key
