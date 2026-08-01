from fastapi import FastAPI

from app.core.database import Base, engine
from app.models.user import User
from app.models.activity import Activity
from app.models.community import Community
from app.routers.home import router as home_router
from app.routers.users import router as users_router
from app.routers.activities import router as activities_router
from app.routers.community import router as community_router

app = FastAPI(
    title="SyncRadius API",
    description="A location-based community collaboration platform",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

    
app.include_router(home_router)
app.include_router(users_router)
app.include_router(activities_router)
app.include_router(community_router)

print("Users router included!")
print(app.openapi()["paths"].keys())