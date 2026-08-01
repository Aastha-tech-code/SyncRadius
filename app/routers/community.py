from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.schemas.community import (
    CommunityCreate,
    CommunityResponse
)
from app.services.community_service import (
    create_community,
    get_communities,
    get_community,
    update_community,
    delete_community
)

router = APIRouter(
    prefix="/communities",
    tags=["Communities"]
)


@router.post("/", response_model=CommunityResponse)
def add_community(
    community: CommunityCreate,
    db: Session = Depends(get_db)
):
    return create_community(db, community)


@router.get("/", response_model=list[CommunityResponse])
def read_communities(
    db: Session = Depends(get_db)
):
    return get_communities(db)


@router.get("/{community_id}", response_model=CommunityResponse)
def read_community(
    community_id: int,
    db: Session = Depends(get_db)
):
    community = get_community(db, community_id)

    if community is None:
        raise HTTPException(
            status_code=404,
            detail="Community not found"
        )

    return community


@router.put("/{community_id}", response_model=CommunityResponse)
def edit_community(
    community_id: int,
    community: CommunityCreate,
    db: Session = Depends(get_db)
):
    updated = update_community(
        db,
        community_id,
        community
    )

    if updated is None:
        raise HTTPException(
            status_code=404,
            detail="Community not found"
        )

    return updated


@router.delete("/{community_id}")
def remove_community(
    community_id: int,
    db: Session = Depends(get_db)
):
    deleted = delete_community(
        db,
        community_id
    )

    if deleted is None:
        raise HTTPException(
            status_code=404,
            detail="Community not found"
        )

    return {
        "message": "Community deleted successfully"
    }