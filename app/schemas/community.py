from pydantic import BaseModel


class CommunityCreate(BaseModel):
    name: str
    description: str


class CommunityResponse(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True