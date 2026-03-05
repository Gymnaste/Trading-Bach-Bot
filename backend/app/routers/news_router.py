from fastapi import APIRouter, Depends
from app.database import get_db
from app.services.news_service import NewsService
from app.core.auth_deps import get_current_user_id

router = APIRouter(prefix="/news", tags=["News"])
service = NewsService()

@router.get("")
def get_news(limit: int = 20, db=Depends(get_db), user_id: str = Depends(get_current_user_id)):
    return {"news": service.get_recent_news(db, limit)} # News are global, but route is protected

@router.post("/refresh")
def refresh_news(db=Depends(get_db)):
    return {"success": True, "count": len(service.fetch_and_analyze_news(db))}
