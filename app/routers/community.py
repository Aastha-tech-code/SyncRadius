from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from app.core.dependencies import get_db, get_current_user
from app.models.user import User
from app.models.community import Community, CommunityMember
from app.schemas.community import CommunityCreate, CommunityResponse

router = APIRouter(prefix='/communities', tags=['Communities'])

def serialize(community: Community, user_id: int | None = None):
    return {'id': community.id, 'name': community.name, 'description': community.description or '', 'location': community.location or '', 'category': community.category or 'General', 'owner_id': community.owner_id, 'created_at': community.created_at, 'member_count': len(community.members), 'is_member': bool(user_id and any(m.user_id == user_id for m in community.members))}

@router.get('/', response_model=list[CommunityResponse])
def list_communities(q: str = '', location: str = '', db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    query = db.query(Community)
    if q: query = query.filter(Community.name.ilike(f'%{q}%'))
    if location: query = query.filter(Community.location.ilike(f'%{location}%'))
    return [serialize(c, user.id) for c in query.order_by(Community.created_at.desc()).all()]

@router.post('/', response_model=CommunityResponse, status_code=201)
def create_community(data: CommunityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    community = Community(**data.model_dump(), owner_id=user.id)
    db.add(community); db.flush()
    db.add(CommunityMember(community_id=community.id, user_id=user.id))
    db.commit(); db.refresh(community)
    return serialize(community, user.id)

@router.get('/{community_id}', response_model=CommunityResponse)
def get_community(community_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    c = db.query(Community).filter(Community.id == community_id).first()
    if not c: raise HTTPException(404, 'Community not found')
    return serialize(c, user.id)

@router.post('/{community_id}/join')
def join_community(community_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    c = db.query(Community).filter(Community.id == community_id).first()
    if not c: raise HTTPException(404, 'Community not found')
    existing = db.query(CommunityMember).filter_by(community_id=community_id, user_id=user.id).first()
    if existing: return {'message': 'Already a member'}
    db.add(CommunityMember(community_id=community_id, user_id=user.id)); db.commit()
    return {'message': 'Joined community successfully'}

@router.delete('/{community_id}/join')
def leave_community(community_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    member = db.query(CommunityMember).filter_by(community_id=community_id, user_id=user.id).first()
    if not member: raise HTTPException(404, 'Membership not found')
    community = db.query(Community).filter_by(id=community_id).first()
    if community and community.owner_id == user.id: raise HTTPException(400, 'Community owner cannot leave their own community')
    db.delete(member); db.commit()
    return {'message': 'Left community successfully'}

@router.put('/{community_id}', response_model=CommunityResponse)
def update_community(community_id: int, data: CommunityCreate, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    c = db.query(Community).filter_by(id=community_id).first()
    if not c: raise HTTPException(404, 'Community not found')
    if c.owner_id != user.id: raise HTTPException(403, 'Only the community owner can update it')
    for key, value in data.model_dump().items(): setattr(c, key, value)
    db.commit(); db.refresh(c)
    return serialize(c, user.id)

@router.delete('/{community_id}')
def delete_community(community_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    c = db.query(Community).filter_by(id=community_id).first()
    if not c: raise HTTPException(404, 'Community not found')
    if c.owner_id != user.id: raise HTTPException(403, 'Only the community owner can delete it')
    db.delete(c); db.commit()
    return {'message': 'Community deleted successfully'}

@router.get('/mine/joined', response_model=list[CommunityResponse])
def my_communities(db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    rows = db.query(Community).join(CommunityMember).filter(CommunityMember.user_id == user.id).all()
    return [serialize(c, user.id) for c in rows]
