from typing import Union

from factory import price_bandit


@price_bandit.get("/")
def read_root():
    return {"Hello": "World"}


@price_bandit.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


if __name__ == "__main__":
    price_bandit.run()
