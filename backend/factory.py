from typing import Annotated
from fastapi import Depends, FastAPI, APIRouter, HTTPException, status, Header
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from db import config
import bcrypt

from werkzeug.security import check_password_hash

from db.config import SessionLocal, engine

from utils.create_token import create_access_token
from jose import jwt, JWTError

from crud import crud
from models import user
from schemas import schemas

from models.user import User

user.Base.metadata.create_all(bind=engine)


auth = APIRouter()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/login")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@auth.post("/register", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return crud.register_user(db=db, userCreate=user)


@auth.get("/users", response_model=list[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@auth.post("/login")
async def login(userLogin: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=userLogin.email)
    if db_user is not None and bcrypt.checkpw(
        userLogin.password.encode("utf-8"), db_user.password.encode("utf-8")
    ):
        access_token = create_access_token(db_user.email, config.settings.expire_delta)
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


blacklisted_tokens = set()


@auth.post("/logout")
async def logout(authorization: str = Header(None)):
    token = authorization.split("Bearer ")[1]
    blacklisted_tokens.add(token)
    return {"message": "Logged out successfully"}


@auth.get("/debug")
def debug_headers(authorization: str = Header(None)):
    return {"Authorization Header": authorization}


def get_current_user(authorization: str = Header(None)):
    if authorization is None:
        raise HTTPException(status_code=401, detail="Missing authorization header")
    try:
        public_key = open("jwt-key.pub").read()
        token = authorization.split("Bearer ")[1]
        if token in blacklisted_tokens:
            raise HTTPException(status_code=401, detail="Token revoked")
        payload = jwt.decode(
            token,
            public_key,
            algorithms=[config.settings.jwt_algorithm],
        )
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(
                status_code=401, detail="Could not validate credentials"
            )
        return email
    except jwt.JWTError as e:
        print(f"JWT Error: {str(e)}")


@auth.get("/protected")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": "This is a protected route", "current_user": current_user}


def createApp():
    app = FastAPI()
    origins = ["http://localhost:3000"]
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(auth, prefix="/auth")
    return app


price_bandit = createApp()
