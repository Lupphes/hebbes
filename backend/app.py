import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

from db.database import Base, engine
from db.jwt_secret import generate_and_retrieve_rsa_keys_serialized
from routes.auth import router as auth_router
from routes.hello import router as hello_router
from routes.db import router as db_router


def configure_logging():
    """
    Configures the logging for the application.
    """
    logging.basicConfig()
    logging.getLogger("sqlalchemy").setLevel(logging.ERROR)
    uvicorn_error = logging.getLogger("uvicorn.error")
    uvicorn_error.disabled = True
    uvicorn_access = logging.getLogger("uvicorn.access")
    uvicorn_access.disabled = True


def create_app() -> FastAPI:
    """
    Creates and configures an instance of the FastAPI app.
    - Initializes RSA keys for JWT.
    - Creates database tables if they don't exist.
    - Configures CORS middleware.
    - Includes various routes for the application.
    """
    app = FastAPI()
    generate_and_retrieve_rsa_keys_serialized()

    try:
        Base.metadata.create_all(engine, checkfirst=True)
    except Exception as e:
        logging.error(f"Error creating tables: {e}")

    domain = os.getenv("DOMAIN", "http://localhost:3000")
    origins = [domain]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router, prefix="/auth")
    app.include_router(db_router, prefix="/db")
    app.include_router(hello_router)

    return app


configure_logging()
price_bandit = create_app()
