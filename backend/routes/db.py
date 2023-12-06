from utils.misc import get_db
from fastapi import Depends, APIRouter
from typing import List, Optional
from sqlalchemy.orm import Session
from schemas.schemas import (
    ItemSchema,
    ItemSchema,
    PictureSchema,
    StoreSchema,
    CategorySchema,
)

from crud.crud_items import populate_tables, get_items


router = APIRouter()


@router.get("/populate_tables")
def populate_items(db: Session = Depends(get_db)):
    return populate_tables(db=db)


@router.get("/items", response_model=List[ItemSchema])
def read_items(
    id: Optional[int] = None,
    category_id: Optional[int] = None,
    store_id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    items = get_items(
        db, id=id, category_id=category_id, store_id=store_id, skip=skip, limit=limit
    )
    items_response = [
        ItemSchema(
            id=item.id,
            name=item.name,
            brand=item.brand,
            description=item.description,
            gln=item.gln,
            gtin=item.gtin,
            measurements_units=item.measurements_units,
            measurements_amount=item.measurements_amount,
            measurements_label=item.measurements_label,
            picture_link=PictureSchema(
                id=item.picture.id,
                item_id=item.picture.item_id,
                category_id=item.picture.category_id,
                width=item.picture.width
                if item.picture and item.picture.width is not None
                else 0,
                height=item.picture.height
                if item.picture and item.picture.height is not None
                else 0,
                url=item.picture.url
                if item.picture and isinstance(item.picture.url, str)
                else "",
            ),
            categories=[
                CategorySchema(
                    id=cat.id,
                    category_id=cat.category_id,
                    name=cat.name,
                    parent_id=cat.parent_id,
                    pictures=[
                        PictureSchema(
                            id=picture.id,
                            item_id=picture.item_id,
                            category_id=picture.category_id,
                            width=picture.width,
                            height=picture.height,
                            url=picture.url,
                        )
                        for picture in cat.pictures
                    ],
                )
                for cat in item.categories
            ]
            if item.categories
            else [],
            stores=[
                StoreSchema(
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
