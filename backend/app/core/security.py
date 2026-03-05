from fastapi import HTTPException
from app.core.logger import setup_logger

logger = setup_logger("security")

def validate_symbol(symbol: str) -> str:
    if not symbol or not isinstance(symbol, str):
        raise HTTPException(status_code=400, detail="Symbole invalide")
    clean = symbol.strip().upper()
    if len(clean) < 1 or len(clean) > 10:
        raise HTTPException(status_code=400, detail=f"Symbole '{clean}' invalide")
    return clean

def validate_positive_float(value: float, field_name: str = "valeur") -> float:
    if not isinstance(value, (int, float)) or value <= 0:
        raise HTTPException(status_code=400, detail=f"{field_name} doit être positif")
    return float(value)
