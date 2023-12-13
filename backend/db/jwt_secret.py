from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.backends import default_backend
from pathlib import Path


def generate_and_retrieve_rsa_keys_serialized():
    """
    Generates RSA private and public keys if they do not exist, or retrieves them
    if they already exist. Keys are saved in PEM format in the same directory as
    this script's parent directory.

    Returns:
        tuple: A tuple containing the private key and public key in PEM format.

    Very much done by ChatGPT with comments
    """

    # Define the path for the key files
    key_path = Path(__file__).parent.parent
    private_key_file = key_path / "jwt_private_key.pem"
    public_key_file = key_path / "jwt_public_key.pem"

    # Check if the private and public key files already exist
    if private_key_file.is_file() and public_key_file.is_file():
        # Read and return the existing private key in serialized format
        with open(private_key_file, "rb") as file:
            private_key = serialization.load_pem_private_key(
                file.read(), password=None, backend=default_backend()
            )
        private_key_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        ).decode("utf-8")

        # Read and return the existing public key in serialized format
        with open(public_key_file, "rb") as file:
            public_key = serialization.load_pem_public_key(
                file.read(), backend=default_backend()
            )
        public_key_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode("utf-8")
    else:
        # Generate a new private key
        private_key = rsa.generate_private_key(
            backend=default_backend(), public_exponent=65537, key_size=2048
        )

        # Serialize and save the new private key
        private_key_pem = private_key.private_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PrivateFormat.PKCS8,
            encryption_algorithm=serialization.NoEncryption(),
        ).decode("utf-8")
        with open(private_key_file, "wb") as file:
            file.write(private_key_pem.encode("utf-8"))

        # Generate, serialize, and save the new public key
        public_key = private_key.public_key()
        public_key_pem = public_key.public_bytes(
            encoding=serialization.Encoding.PEM,
            format=serialization.PublicFormat.SubjectPublicKeyInfo,
        ).decode("utf-8")
        with open(public_key_file, "wb") as file:
            file.write(public_key_pem.encode("utf-8"))

    # Return the private and public keys in serialized format
    return private_key_pem, public_key_pem
