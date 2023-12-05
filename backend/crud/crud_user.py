from sqlalchemy.orm import Session
import bcrypt

from models.user import User
from schemas.schemas import UserCreateSchema


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(User).offset(skip).limit(limit).all()


def register_user(db: Session, userCreate: UserCreateSchema):
    hashed_password = bcrypt.hashpw(
        userCreate.password.encode("utf-8"), bcrypt.gensalt()
    )
    hashed_password = hashed_password.decode("utf-8")
    db_user = User(email=userCreate.email, password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
