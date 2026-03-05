import pandas as pd
import yfinance as yf
from app.config import MARKET_DATA_PERIOD
from app.core.logger import setup_logger

logger = setup_logger("market_provider")

class MarketProvider:
    def get_historical_data(self, symbol: str, period: str = MARKET_DATA_PERIOD):
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period)
            if df.empty: return pd.DataFrame()
            df.index = pd.to_datetime(df.index)
            return df
        except Exception as e:
            logger.error(f"Error fetch {symbol}: {e}")
            return pd.DataFrame()

    def get_current_price(self, symbol: str):
        try:
            ticker = yf.Ticker(symbol)
            # fast_info est souvent instable (retourne None), on préfère history(1d)
            hist = ticker.history(period="1d")
            if not hist.empty:
                return float(hist["Close"].iloc[-1])
            
            # Fallback ultime sur fast_info au cas où
            price = ticker.fast_info.get("last_price")
            return float(price) if price else None
        except Exception as e:
            logger.error(f"Error get_current_price {symbol}: {e}")
            return None

    def get_multiple_prices(self, symbols: list[str]):
        return {s: self.get_current_price(s) for s in symbols if self.get_current_price(s)}

    def get_stock_info(self, symbol: str) -> dict:
        """Récupère les informations de base de l'entreprise via yfinance."""
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            return {
                "symbol": symbol,
                "name": info.get("shortName", symbol),
                "sector": info.get("sector", "Inconnu"),
                "industry": info.get("industry", "Inconnu"),
                "marketCap": info.get("marketCap", None),
                "summary": info.get("longBusinessSummary", "Aucune description disponible.")
            }
        except Exception as e:
            logger.error(f"Error fetch info {symbol}: {e}")
            return {"symbol": symbol, "name": symbol, "error": str(e)}

    def get_stock_history(self, symbol: str, period: str = "6mo") -> list:
        """Récupère l'historique des prix pour le graphique, retourne une liste de dicts."""
        try:
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period=period)
            if hist.empty:
                return []
            
            # Formater les données pour le frontend
            result = []
            for date, row in hist.iterrows():
                result.append({
                    "date": date.strftime("%Y-%m-%d"),
                    "close": float(row["Close"]),
                    "volume": int(row["Volume"])
                })
            return result
        except Exception as e:
            logger.error(f"Error fetch history {symbol}: {e}")
            return []
