from sqlalchemy.orm import Session
import bcrypt

from models import user
from schemas import schemas


def get_user(db: Session, user_id: int):
    return db.query(user.User).filter(user.User.id == user_id).first()


def get_user_by_username(db: Session, username: str):
    return db.query(user.User).filter(user.User.username == username).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(user.User).offset(skip).limit(limit).all()


def register_user(db: Session, userCreate: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(
        userCreate.password.encode("utf-8"), bcrypt.gensalt()
    )
    hashed_password = hashed_password.decode("utf-8")
    db_user = user.User(username=userCreate.username, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
