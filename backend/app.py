from fastapi import FastAPI
from typing import Union

price_bandit = FastAPI()


@price_bandit.get("/")
def read_root():
    return {"Hello": "World"}


@price_bandit.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:price_bandit", host="0.0.0.0", port=8000, reload=True)
