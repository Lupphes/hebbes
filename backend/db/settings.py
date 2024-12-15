import os
from pydantic import Field
from pydantic_settings import BaseSettings
from pathlib import Path
from dotenv import load_dotenv


def find_project_root(current_path: Path, filename: str = ".env") -> Path:
    """
    Traverse up the directory hierarchy to find the root directory of the project
    by looking for a specific file (default is '.env').

    Parameters:
        current_path (Path): The starting path for the search.
        filename (str): The name of the file to look for.

    Returns:
        Path: The path of the directory where the file is found, or the current path
        if the file is not found.
    """
    for parent in current_path.parents:
        if (parent / filename).exists():
            return parent
    return current_path


class Settings(BaseSettings):
    """
    Settings class to load and store configuration from environment variables
    and a .env file using Pydantic.

    Each attribute represents a configuration item, with a default value
    and optionally loaded from an environment variable.
    """

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
        """
        Construct the PostgreSQL connection string using the loaded settings.

        Returns:
            str: The PostgreSQL connection string.
        """
        return f"postgresql://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}@{self.POSTGRES_URL}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"

    def check_settings(self):
        """
        Check and print the status of the settings, including whether the .env file
        was found and which settings are loaded from the .env file or using defaults.
        """
        print(f"Expected .env file path: {self.Config.env_file.resolve()}")
        if self.Config.env_file.exists():
            print(".env file found in the project")
        else:
            print(".env file NOT found in the project")

        for field_name, model_field in self.__class__.model_fields.items():
            default = model_field.default
            value = getattr(self, field_name)
            if value != default:
                print(f"{field_name}: Loaded from .env file")
            else:
                print(f"{field_name}: Using default value")


settings = Settings()
dotenv_path = Path(find_project_root(Path(__file__)) / ".env")
load_dotenv(dotenv_path=dotenv_path)
print(settings.postgres_connection_string)
settings.check_settings()
