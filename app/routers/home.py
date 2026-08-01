from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def home():
    return {
        "project": "SyncRadius",
        "version": "1.0.0",
        "status": "Running 🚀"
    }


@router.get("/health")
def health():
    return {
        "status": "Healthy",
        "server": "Running"
    }


@router.get("/about")
def about():
    return {
        "developer": "Aastha",
        "purpose": "Learning FastAPI by building SyncRadius"
    }