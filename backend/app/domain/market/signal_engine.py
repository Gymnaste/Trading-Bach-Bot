from app.config import BUY_THRESHOLD, SELL_THRESHOLD, SCORE_TECHNIQUE_WEIGHT, SCORE_SENTIMENT_WEIGHT

def generate_signal(symbol, indicators, sentiment_score=0.0):
    if not indicators: return {"recommendation": "HOLD", "probability_up": 0.5}
    
    score_tech = 0.5
    s20, s50 = indicators.get("sma20"), indicators.get("sma50")
    if s20 and s50: score_tech = 0.7 if s20 > s50 else 0.3
    
    rsi = indicators.get("rsi")
    if rsi:
        if rsi < 30: score_tech += 0.2
        if rsi > 70: score_tech -= 0.2

    score_sent = (sentiment_score + 1) / 2
    final = (score_tech * SCORE_TECHNIQUE_WEIGHT) + (score_sent * SCORE_SENTIMENT_WEIGHT)
    
    rec = "BUY" if final >= BUY_THRESHOLD else "SELL" if final <= SELL_THRESHOLD else "HOLD"
    
    return {
        "symbol": symbol,
        "recommendation": rec,
        "probability_up": final,
        "confidence_score": final,
        "score_technique": score_tech,
        "score_sentiment": score_sent,
        "justification": f"Tech: {score_tech:.2f}, Sent: {score_sent:.2f}",
        "current_price": indicators.get("current_price"),
        "rsi": rsi, "sma20": s20, "sma50": s50
    }
