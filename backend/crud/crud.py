from sqlalchemy.orm import Session
import bcrypt
import json

from models import user, item, item_company, item_category, company
from schemas import schemas

def get_user(db: Session, user_id: int):
    return db.query(user.User).filter(user.User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(user.User).filter(user.User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user.User).offset(skip).limit(limit).all()


def register_user(db: Session, userCreate: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        userCreate.password.encode("utf-8"), bcrypt.gensalt()
    )
    hashed_password = hashed_password.decode("utf-8")
    db_user = user.User(email=userCreate.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def populate_items(db: Session):
    file_path = "www.ah.nl/products.json"
    all_added = True
    with open(file_path, "r") as file:
        data = json.load(file)

    for item_data in data:
        # Create Item instance
        print(item_data)
        new_item = item.Item(name=item_data.get("name"), link=item_data.get("link"), brand=item_data.get("brand"))
        db.add(new_item)
        db.flush()  # Flush to get the item_id

        # Create ItemCompany instance
        # new_company = company.Company(name="ah")
        # db.add(new_company)
        # db.flush()
        
        # Create ItemCompany instance
        # new_item_company = item_company.ItemCompany(item_id=item.Item.id, company_id=company.Company.id)
        # db.add(new_item_company)
        # all_added = True
    db.commit()
    db.close()
    return all_added