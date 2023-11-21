from pydantic import Field
from pydantic_settings import BaseSettings
from pathlib import Path


class Settings(BaseSettings):
    JWT_ALGORITHM: str = "HS256"
    POSTGRES_USER: str = "timescale"
    POSTGRES_PASSWORD: str = Field(default="default_password")
    POSTGRES_DB: str = "timescale"
    POSTGRES_URL: str = "timescaledb"
    POSTGRES_PORT: int = 5432
    EXPIRE_DELTA: int = 100000

    class Config:
        env_file = Path(__file__).parent / ".env"
        env_file_encoding = "utf-8"

    @property
    def postgres_connection_string(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_URL}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"


# Load settings
settings = Settings()
