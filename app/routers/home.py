from fastapi import APIRouter
router = APIRouter()
@router.get('/')
def home(): return {'project': 'SyncRadius', 'version': '2.0.0', 'status': 'Running'}
@router.get('/health')
def health(): return {'status': 'healthy'}
