from utils.misc import get_db
from fastapi import Depends, APIRouter, HTTPException, status, Header
from sqlalchemy.orm import Session
from schemas import schemas

from crud import crud_items


router = APIRouter()


@router.post("/populate_tables")
def populate_items(db: Session = Depends(get_db)):
    return crud_items.populate_tables(db=db)


@router.get("/items", response_model=list[schemas.ItemResponse])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud_items.get_top_100_items(db, skip=skip, limit=limit)
    items_response = [
        schemas.ItemResponse(
            id=item_data.id,  # type: ignore
            name=item_data.name,  # type: ignore
            brand=item_data.brand,  # type: ignore
            description=item_data.description,  # type: ignore
            gln=item_data.gln,  # type: ignore
            gtin=item_data.gtin,  # type: ignore
            measurements_units=item_data.measurements_units,  # type: ignore
            measurements_amount=item_data.measurements_amount,  # type: ignore
            measurements_label=item_data.measurements_label,  # type: ignore
            picture_links=schemas.PictureLink(
                **item_data.picture_link.__dict__
            ),  # Assuming picture_links is a single object
            categories=[
                schemas.Category(**category.__dict__)
                for category in item_data.categories
            ],
            stores=[schemas.Store(**store.__dict__) for store in item_data.stores],
        )
        for item_data in items
    ]

    return items_response
