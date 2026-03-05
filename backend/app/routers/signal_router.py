from fastapi import APIRouter, Depends
from app.database import get_db
from app.services.trading_service import TradingService
from app.core.auth_deps import get_current_user_id

router = APIRouter(tags=["Trading"])
service = TradingService()

@router.get("/signals")
def get_signals(db=Depends(get_db), user_id: str = Depends(get_current_user_id)):
    from app.config import MARKET_SYMBOLS
    all_symbols = list(set(MARKET_SYMBOLS + TradingService._discovered_symbols))
    return {"signals": service.generate_signals_for_all(db, user_id, all_symbols)}

@router.post("/run-cycle")
def run_cycle(db=Depends(get_db), user_id: str = Depends(get_current_user_id)):
    # Cycle is now user-specific for this manual trigger
    return service.run_trading_cycle(db, user_id)
