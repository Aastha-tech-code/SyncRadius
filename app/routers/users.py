from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin
from app.services.user_service import create_user, login_user

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)


@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    return login_user(
        db,
        form_data.username,
        form_data.password
    )

@router.get("/me")
def read_current_user(
    current_user: User = Depends(get_current_user)
):
    return current_user