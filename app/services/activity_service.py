from sqlalchemy.orm import Session

from app.models.activity import Activity
from app.schemas.activity import ActivityCreate


from app.models.user import User

def create_activity(
    db: Session,
    activity: ActivityCreate,
    current_user: User
):
    db_activity = Activity(
        title=activity.title,
        description=activity.description,
        location=activity.location,
        date_time=activity.date_time,
        owner_id=current_user.id
    )

    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)

    return db_activity

def get_activities(db: Session):
    return db.query(Activity).all()

def get_activity(db: Session, activity_id: int):

    return db.query(Activity).filter(
        Activity.id == activity_id
    ).first()


def delete_activity(db: Session, activity_id: int):

    activity = db.query(Activity).filter(
        Activity.id == activity_id
    ).first()

    if activity is None:
        return None

    db.delete(activity)
    db.commit()

    return activity

def update_activity(
    db: Session,
    activity_id: int,
    updated_activity: ActivityCreate
):
    activity = db.query(Activity).filter(
        Activity.id == activity_id
    ).first()

    if activity is None:
        return None

    activity.title = updated_activity.title
    activity.description = updated_activity.description
    activity.location = updated_activity.location
    activity.date_time = updated_activity.date_time

    db.commit()
    db.refresh(activity)

    return activity