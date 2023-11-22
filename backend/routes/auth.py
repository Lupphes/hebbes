from fastapi import Depends, APIRouter, HTTPException, status, Header


from db.settings import settings
from utils.misc import get_db
from utils.create_token import create_access_token
from utils.users import get_current_user
from utils.misc import blacklisted_tokens

import bcrypt
from sqlalchemy.orm import Session


from crud import crud
from schemas import schemas

router = APIRouter()


@router.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return crud.register_user(db=db, userCreate=user)


@router.get("/users", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@router.post("/login")
async def login(userLogin: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=userLogin.email)
    if db_user is not None and bcrypt.checkpw(
        userLogin.password.encode("utf-8"), db_user.password.encode("utf-8")
    ):
        # Assuming db_user is an instance of a SQLAlchemy model and has an email attribute
        if db_user.email is not None and isinstance(db_user.email, str):
            access_token = create_access_token(db_user.email, settings.EXPIRE_DELTA)
        else:
            raise Exception()

        response = {
            "access_token": access_token,
            "token_type": "bearer",
            "user": db_user,
        }
        return response
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate user"
        )


@router.post("/logout")
async def logout(authorization: str = Header(None)):
    token = authorization.split("Bearer ")[1]
    blacklisted_tokens.add(token)
    return {"message": "Logged out successfully"}


@router.get("/debug")
def debug_headers(authorization: str = Header(None)):
    return {"Authorization Header": authorization}


@router.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": "This is a protected route", "current_user": current_user}
