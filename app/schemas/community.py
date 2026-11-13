from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

class CommunityCreate(BaseModel):
    name: str = Field(min_length=3, max_length=120)
    description: str = Field(default='', max_length=2000)
    location: str = Field(default='', max_length=160)
    category: str = Field(default='General', max_length=60)

class CommunityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    description: str
    location: str
    category: str
    owner_id: int
    created_at: datetime
    member_count: int = 0
    is_member: bool = False
