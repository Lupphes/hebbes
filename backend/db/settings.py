import os
from pydantic import Field
from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv


def find_project_root(current_path: Path, filename: str = ".env") -> Path:
    # Go up in the directory hierarchy to find the file
    for parent in current_path.parents:
        if (parent / filename).exists():
            return parent
    return current_path


class Settings(BaseSettings):
    JWT_ALGORITHM: str = os.environ.get("JWT_ALGORITHM", "RS256")
    POSTGRES_USER: str = os.environ.get("POSTGRES_USER", "timescale")
    POSTGRES_PASSWORD: str = Field(
        default=os.environ.get("POSTGRES_PASSWORD", "WZ3IIub7hj12v0kztf7UEtzsifYKadei")
    )
    POSTGRES_DB: str = os.environ.get("POSTGRES_DB", "timescale")
    POSTGRES_URL: str = os.environ.get("POSTGRES_URL", "timescaledb")
    POSTGRES_PORT: int = int(os.environ.get("POSTGRES_PORT", 5432))
    EXPIRE_DELTA: int = int(os.environ.get("EXPIRE_DELTA", 100000))

    class Config:
        env_file = find_project_root(Path(__file__)) / ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"

    @property
    def postgres_connection_string(self):
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_URL}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    def check_settings(self):
        print(f"Expected .env file path: {self.Config.env_file.resolve()}")
        if self.Config.env_file.exists():
            print(".env file found.")
        else:
            print(".env file NOT found.")

        for field_name, model_field in self.__class__.model_fields.items():
            default = model_field.default
            value = getattr(self, field_name)
            if value != default:
                print(f"{field_name}: Loaded from .env file")
            else:
                print(f"{field_name}: Using default value")


# Load settings
settings = Settings()
dotenv_path = Path(find_project_root(Path(__file__)) / ".env")
load_dotenv(dotenv_path=dotenv_path)
print(settings.postgres_connection_string)
settings.check_settings()
