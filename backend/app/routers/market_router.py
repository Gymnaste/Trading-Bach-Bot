from fastapi import APIRouter, Depends, HTTPException
from app.providers.market_provider import MarketProvider
from app.core.auth_deps import get_current_user_id

from app.services.openai_service import OpenAIService

router = APIRouter(prefix="/market", tags=["Market"])
market_provider = MarketProvider()
openai_service = OpenAIService()

@router.get("/{symbol}/info")
def get_stock_info(symbol: str, user_id: str = Depends(get_current_user_id)):
    """Renvoie les informations d'une entreprise."""
    return market_provider.get_stock_info(symbol)

@router.get("/{symbol}/history")
def get_stock_history(symbol: str, period: str = "6mo", user_id: str = Depends(get_current_user_id)):
    """Renvoie l'historique détaillé des prix."""
    history = market_provider.get_stock_history(symbol, period)
    if not history:
        raise HTTPException(status_code=404, detail="Historique introuvable")
    return {"symbol": symbol, "history": history}

@router.get("/search-ticker")
def search_ticker(query: str, user_id: str = Depends(get_current_user_id)):
    """Suggère un ticker à partir d'une recherche utilisateur (IA)."""
    ticker = openai_service.get_ticker_suggestion(query)
    return {"query": query, "suggested_ticker": ticker}
