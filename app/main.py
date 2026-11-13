from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import Base, engine
from app import models  # noqa: F401 - registers all SQLAlchemy models
from app.routers.home import router as home_router
from app.routers.users import router as users_router
from app.routers.activities import router as activities_router
from app.routers.community import router as community_router

Base.metadata.create_all(bind=engine)
app = FastAPI(title='SyncRadius API', description='A location-based community collaboration platform', version='2.0.0')
app.add_middleware(CORSMiddleware, allow_origins=['http://localhost:5173', 'http://127.0.0.1:5173'], allow_credentials=True, allow_methods=['*'], allow_headers=['*'])
app.include_router(home_router)
app.include_router(users_router)
app.include_router(activities_router)
app.include_router(community_router)
