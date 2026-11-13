from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    full_name = Column(String(100), nullable=False, default='')
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    location = Column(String(160), nullable=True, default='')
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    activities = relationship('Activity', back_populates='owner', cascade='all, delete-orphan')
    communities = relationship('CommunityMember', back_populates='user', cascade='all, delete-orphan')
    owned_communities = relationship('Community', back_populates='owner')
