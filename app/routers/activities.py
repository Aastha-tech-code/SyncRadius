from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.activity import Activity
from app.models.community import CommunityMember
from app.schemas.activity import ActivityCreate, ActivityResponse

router = APIRouter(prefix='/activities', tags=['Activities'])

@router.get('/', response_model=list[ActivityResponse])
def list_activities(q: str = '', location: str = '', db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    query = db.query(Activity)
    if q: query = query.filter(Activity.title.ilike(f'%{q}%'))
    if location: query = query.filter(Activity.location.ilike(f'%{location}%'))
    return query.order_by(Activity.date_time.asc()).all()

@router.post('/', response_model=ActivityResponse, status_code=201)
def create_activity(data: ActivityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    if data.community_id:
        membership = db.query(CommunityMember).filter_by(community_id=data.community_id, user_id=user.id).first()
        if not membership: raise HTTPException(403, 'Join the community before creating its activity')
    activity = Activity(**data.model_dump(), owner_id=user.id)
    db.add(activity); db.commit(); db.refresh(activity)
    return activity

@router.get('/{activity_id}', response_model=ActivityResponse)
def get_activity(activity_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    activity = db.query(Activity).filter_by(id=activity_id).first()
    if not activity: raise HTTPException(404, 'Activity not found')
    return activity

@router.put('/{activity_id}', response_model=ActivityResponse)
def update_activity(activity_id: int, data: ActivityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    activity = db.query(Activity).filter_by(id=activity_id).first()
    if not activity: raise HTTPException(404, 'Activity not found')
    if activity.owner_id != user.id: raise HTTPException(403, 'Only the activity creator can update it')
    for key, value in data.model_dump().items(): setattr(activity, key, value)
    db.commit(); db.refresh(activity)
    return activity

@router.delete('/{activity_id}')
def delete_activity(activity_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    activity = db.query(Activity).filter_by(id=activity_id).first()
    if not activity: raise HTTPException(404, 'Activity not found')
    if activity.owner_id != user.id: raise HTTPException(403, 'Only the activity creator can delete it')
    db.delete(activity); db.commit()
    return {'message': 'Activity deleted successfully'}

@router.get('/mine/created', response_model=list[ActivityResponse])
def my_activities(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    return db.query(Activity).filter_by(owner_id=user.id).order_by(Activity.date_time.asc()).all()
