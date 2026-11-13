from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime

class ActivityCreate(BaseModel):
    title: str = Field(min_length=3, max_length=140)
    description: str = Field(default='', max_length=3000)
    location: str = Field(min_length=2, max_length=160)
    date_time: datetime
    community_id: int | None = None

class ActivityResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str
    location: str
    date_time: datetime
    community_id: int | None
    owner_id: int
