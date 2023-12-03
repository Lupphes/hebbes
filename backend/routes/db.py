from utils.misc import get_db
from fastapi import Depends, APIRouter
from typing import List
from sqlalchemy.orm import Session
from schemas.schemas import ItemResponse, ItemResponse, PictureLink, Store, Category

from crud.crud_items import populate_tables, get_top_100_items


router = APIRouter()


@router.get("/populate_tables")
def populate_items(db: Session = Depends(get_db)):
    return populate_tables(db=db)


@router.get("/items", response_model=List[ItemResponse])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_top_100_items(db, skip=skip, limit=limit)
    items_response = [
        ItemResponse(
            id=item.id,  # type: ignore
            name=item.name,  # type: ignore
            brand=item.brand,  # type: ignore
            description=item.description,  # type: ignore
            gln=item.gln,  # type: ignore
            gtin=item.gtin,  # type: ignore
            measurements_units=item.measurements_units,  # type: ignore
            measurements_amount=item.measurements_amount,  # type: ignore
            measurements_label=item.measurements_label,  # type: ignore
            picture_link=PictureLink(
                width=item.picture_link.width
                if item.picture_link and item.picture_link.width is not None
                else 0,
                height=item.picture_link.height
                if item.picture_link and item.picture_link.height is not None
                else 0,
                url=item.picture_link.url
                if item.picture_link and isinstance(item.picture_link.url, str)
                else "",
            ),
            categories=[Category(id=cat.id, name=cat.name) for cat in item.categories]
            if item.categories
            else [],
            stores=[
                Store(
                    id=store.id,
                    name=store.name,
                    link=store.link,
                    price=store.price,
                    discount_info=store.discount_info,
                )
                for store in item.stores
            ],
        )
        for item in items
    ]
    return items_response
