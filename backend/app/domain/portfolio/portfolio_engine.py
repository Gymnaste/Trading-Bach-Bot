from datetime import datetime
from app.config import STOP_LOSS, TAKE_PROFIT, MAX_POSITION_SIZE

class PortfolioEngine:
    def calculate_position_size(self, capital, price):
        return round((capital * MAX_POSITION_SIZE) / price, 4) if price > 0 else 0

    def calculate_sl_tp(self, price):
        return round(price * (1 - STOP_LOSS), 2), round(price * (1 + TAKE_PROFIT), 2)

    def calculate_portfolio_value(self, capital, open_trades, prices):
        v = sum((prices.get(t.symbol) or t.entry_price) * t.quantity for t in open_trades)
        return round(capital + v, 2)
