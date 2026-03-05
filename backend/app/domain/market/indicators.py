import pandas as pd
import numpy as np
from app.core.logger import setup_logger

logger = setup_logger("indicators")

def calculate_sma(prices, window):
    return prices.rolling(window=window).mean()

def calculate_rsi(prices, period=14):
    delta = prices.diff()
    gain = delta.clip(lower=0)
    loss = -delta.clip(upper=0)
    avg_gain = gain.ewm(com=period - 1, min_periods=period).mean()
    avg_loss = loss.ewm(com=period - 1, min_periods=period).mean()
    rs = avg_gain / avg_loss.replace(0, np.nan)
    return 100 - (100 / (1 + rs))

def calculate_macd(prices):
    ema12 = prices.ewm(span=12, adjust=False).mean()
    ema26 = prices.ewm(span=26, adjust=False).mean()
    macd = ema12 - ema26
    signal = macd.ewm(span=9, adjust=False).mean()
    return {"macd": macd, "signal": signal, "hist": macd - signal}

def compute_all_indicators(df):
    if df.empty: return {}
    c = df["Close"]
    s20 = calculate_sma(c, 20)
    s50 = calculate_sma(c, 50)
    rsi = calculate_rsi(c)
    m = calculate_macd(c)
    return {
        "sma20": s20.iloc[-1] if not s20.empty else None,
        "sma50": s50.iloc[-1] if not s50.empty else None,
        "rsi": rsi.iloc[-1] if not rsi.empty else None,
        "macd_hist": m["hist"].iloc[-1] if not m["hist"].empty else None,
        "current_price": c.iloc[-1],
    }
