from fastapi import FastAPI
from typing import Union
from db.database import Base, engine
from db.jwt_secret import generate_and_retrieve_rsa_keys_serialized

price_bandit = FastAPI()

generate_and_retrieve_rsa_keys_serialized()
Base.metadata.create_all(bind=engine)


@price_bandit.get("/")
def read_root():
    return {"Hello": "World"}


@price_bandit.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:price_bandit", host="0.0.0.0", port=5000, reload=True)
