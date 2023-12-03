from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    jwt_secret_key: str
    jwt_algorithm: str
    postgres_user: str
    postgres_password: str
    postgres_db: str
    postgres_url: str
    postgres_port: int
    expire_delta: int

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    @property
    def postgres_connection_string(self):
        return f"postgresql://{self.postgres_user}:{self.postgres_password}@{self.postgres_url}:{self.postgres_port}/{self.postgres_db}"


settings = Settings()

SQLALCHEMY_DATABASE_URL = settings.postgres_connection_string
print(SQLALCHEMY_DATABASE_URL)

engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=False)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
