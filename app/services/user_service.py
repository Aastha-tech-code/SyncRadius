from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.utils.security import hash_password, verify_password, create_access_token

def create_user(db: Session, data: UserCreate) -> User:
    existing = db.query(User).filter(or_(User.username == data.username, User.email == data.email)).first()
    if existing:
        raise HTTPException(status_code=409, detail='Username or email already registered')
    user = User(username=data.username, full_name=data.full_name, email=data.email.lower(), location=data.location, hashed_password=hash_password(data.password))
    db.add(user); db.commit(); db.refresh(user)
    return user

def login_user(db: Session, username: str, password: str) -> dict:
    user = db.query(User).filter(User.username == username).first()
    if not user or not verify_password(password, user.hashed_password):
        raise HTTPException(status_code=401, detail='Incorrect username or password')
    return {'access_token': create_access_token({'sub': user.username}), 'token_type': 'bearer', 'user': user}
