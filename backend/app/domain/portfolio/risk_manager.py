from app.config import MAX_POSITION_SIZE

class RiskManager:
    def check_trade_allowed(self, capital, price, quantity, open_trades):
        if price * quantity > capital: return False, "Funds too low"
        if price * quantity > capital * MAX_POSITION_SIZE * 1.1: return False, "Too large"
        return True, "OK"
