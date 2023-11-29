from utils.misc import get_db
from fastapi import Depends, APIRouter, HTTPException, status, Header
from sqlalchemy.orm import Session

from crud import crud



router = APIRouter()


@router.post("/populate_items")
def populate_items(db: Session = Depends(get_db)):
    return crud.populate_items(db=db)


@router.post("/populate_companies")
def populate_companies(db: Session = Depends(get_db)):
    return crud.populate_items(db=db)

@router.post("/populate_items_companies")
def populate_items_companies(db: Session = Depends(get_db)):
    return crud.populate_items(db=db)