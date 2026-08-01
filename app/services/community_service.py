from sqlalchemy.orm import Session

from app.models.community import Community
from app.schemas.community import CommunityCreate


def create_community(
    db: Session,
    community: CommunityCreate
):
    db_community = Community(
        name=community.name,
        description=community.description
    )

    db.add(db_community)
    db.commit()
    db.refresh(db_community)

    return db_community


def get_communities(db: Session):
    return db.query(Community).all()


def get_community(
    db: Session,
    community_id: int
):
    return db.query(Community).filter(
        Community.id == community_id
    ).first()


def update_community(
    db: Session,
    community_id: int,
    updated_community: CommunityCreate
):
    community = db.query(Community).filter(
        Community.id == community_id
    ).first()

    if community is None:
        return None

    community.name = updated_community.name
    community.description = updated_community.description

    db.commit()
    db.refresh(community)

    return community


def delete_community(
    db: Session,
    community_id: int
):
    community = db.query(Community).filter(
        Community.id == community_id
    ).first()

    if community is None:
        return None

    db.delete(community)
    db.commit()

    return community