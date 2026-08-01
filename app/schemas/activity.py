from datetime import datetime

from pydantic import BaseModel


class ActivityCreate(BaseModel):
    title: str
    description: str
    location: str
    date_time: datetime


class ActivityResponse(BaseModel):
    id: int
    title: str
    description: str
    location: str
    date_time: datetime

    class Config:
        from_attributes = True