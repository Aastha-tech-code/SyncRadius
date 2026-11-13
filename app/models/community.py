from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime, UniqueConstraint
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

class Community(Base):
    __tablename__ = 'communities'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(120), nullable=False)
    description = Column(Text, default='')
    location = Column(String(160), default='')
    category = Column(String(60), default='General')
    owner_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    owner = relationship('User', back_populates='owned_communities')
    members = relationship('CommunityMember', back_populates='community', cascade='all, delete-orphan')

class CommunityMember(Base):
    __tablename__ = 'community_members'
    __table_args__ = (UniqueConstraint('community_id', 'user_id', name='uq_community_member'),)
    id = Column(Integer, primary_key=True, index=True)
    community_id = Column(Integer, ForeignKey('communities.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    joined_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    community = relationship('Community', back_populates='members')
    user = relationship('User', back_populates='communities')
