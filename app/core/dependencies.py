from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.services.user_service import get_user_by_username
from app.utils.security import verify_access_token

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/users/login"
)


def get_db():
    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):
    username = verify_access_token(token)

    user = get_user_by_username(db, username)

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="User not found"
        )

    return user