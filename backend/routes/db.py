from fastapi import Depends, APIRouter, HTTPException
from fastapi.encoders import jsonable_encoder

from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from schemas.schemas import (
    ItemInfoSchema,
    ItemSchema,
    PictureSchema,
    StoreSchema,
    CategorySchema,
)

from crud.crud_items import populate_tables, get_items
from utils.category_tools import get_subcategories, get_all_subcategories
from utils.misc import get_db
from models import Store, Category

router = APIRouter()


@router.get("/populate")
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
    items_response = []
    for item in items:
        item_info_dict = {}
        for info in item.item_infos:
            store_name = db.query(Store).filter(Store.id == info.store_id).first().name
            item_info_dict[store_name] = ItemInfoSchema(
                id=info.id,
                item_id=info.item_id,
                store_id=info.store_id,
                product_link=info.product_link,
                price=info.price,
                discount_info=info.discount_info,
            )

        item_schema = ItemSchema(
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
            item_info=item_info_dict
        )
        items_response.append(item_schema)
    return items_response


@router.get("/categories", response_model=List[CategorySchema])
def read_categories(
    skip: int = 0,
    limit: int = 100,
    depth: Optional[int] = 3,
    db: Session = Depends(get_db),
):
    query = (
        db.query(Category)
        .options(joinedload(Category.subcategories))
        .filter(Category.parent_id == None)
    )

    categories = query.offset(skip).limit(limit).all()

    actual_depth = depth if depth is not None else 3
    for category in categories:
        category.subcategories = get_subcategories(db, category.id, actual_depth)

    return categories


@router.get("/subcategories/{parent_id}", response_model=List[CategorySchema])
def read_subcategories(
    parent_id: int,
    depth: Optional[int] = 3,
    db: Session = Depends(get_db),
):
    parent_category = db.query(Category).filter(Category.id == parent_id).first()
    if not parent_category:
        raise HTTPException(status_code=404, detail="Category not found")

    actual_depth = depth if depth is not None else 3
    subcategories = get_subcategories(db, parent_id, actual_depth)
    return subcategories


@router.get("/stores", response_model=List[StoreSchema])
def read_stores(
    id: Optional[int] = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
):
    if id is not None:
        stores = db.query(Store).filter(Store.id == id).options(joinedload(Store.items)).offset(skip).limit(limit).all()
    else:
        stores = db.query(Store).options(joinedload(Store.items)).offset(skip).limit(limit).all()
    for store in stores:
        store.items = store.items[:20]
    return stores


@router.get("/search")
def search(db: Session = Depends(get_db)):
    return True
