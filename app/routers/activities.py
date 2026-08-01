from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user
from app.models.user import User

from app.core.dependencies import get_db
from app.schemas.activity import ActivityCreate, ActivityResponse
from app.services.activity_service import (
    create_activity,
    get_activities,
    get_activity,
    update_activity,
    delete_activity
)

router = APIRouter(
    prefix="/activities",
    tags=["Activities"]
)


@router.post("/", response_model=ActivityResponse)
def add_activity(
    activity: ActivityCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return create_activity(
        db,
        activity,
        current_user
    )


@router.get("/", response_model=list[ActivityResponse])
def read_activities(
    db: Session = Depends(get_db)
):
    return get_all_activities(db)


@router.get("/{activity_id}", response_model=ActivityResponse)
def read_activity(
    activity_id: int,
    db: Session = Depends(get_db)
):
    activity = get_activity(db, activity_id)

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return activity

@router.put("/{activity_id}", response_model=ActivityResponse)
def edit_activity(
    activity_id: int,
    activity: ActivityCreate,
    db: Session = Depends(get_db)
):
    updated = update_activity(
        db,
        activity_id,
        activity
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return updated

@router.delete("/{activity_id}")
def remove_activity(
    activity_id: int,
    db: Session = Depends(get_db)
):
    activity = delete_activity(db, activity_id)

    if activity is None:
        raise HTTPException(
            status_code=404,
            detail="Activity not found"
        )

    return {"message": "Activity deleted successfully"}