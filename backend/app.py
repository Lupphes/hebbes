from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import Base, engine
from db.jwt_secret import generate_and_retrieve_rsa_keys_serialized
from routes.auth import router as auth_router
from routes.hello import router as hello_router
from routes.db import router as db_router


def createApp():
    app = FastAPI()
    generate_and_retrieve_rsa_keys_serialized()
    # print(Base.metadata)
    try:
        Base.metadata.create_all(engine, checkfirst=True)
    except Exception as e:
        print(f"Error creating tables: {e}")

    # Middleware and router setup
    origins = ["http://localhost:3000"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router, prefix="/auth")
    app.include_router(db_router, prefix="/db")
    app.include_router(hello_router, prefix="/hello")

    return app


price_bandit = createApp()


if __name__ == "__main__":
    import uvicorn
    import logging

    logging.basicConfig()
    logging.getLogger("sqlalchemy").setLevel(logging.ERROR)
    uvicorn_error = logging.getLogger("uvicorn.error")
    uvicorn_error.disabled = True
    uvicorn_access = logging.getLogger("uvicorn.access")
    uvicorn_access.disabled = True
    uvicorn.run("app:price_bandit", host="0.0.0.0", port=5000, reload=True)
