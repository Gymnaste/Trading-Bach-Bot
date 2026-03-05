from app.repositories.portfolio_repository import PortfolioRepository, TradeRepository
from app.domain.portfolio.portfolio_engine import PortfolioEngine
from app.providers.market_provider import MarketProvider

class PortfolioService:
    def __init__(self):
        self.repo = PortfolioRepository()
        self.trade_repo = TradeRepository()
        self.engine = PortfolioEngine()
        self.market = MarketProvider()

    def get_detailed_positions(self, db, user_id: str):
        trades = self.trade_repo.get_open_trades(db, user_id)
        symbols = [t.symbol for t in trades]
        prices = self.market.get_multiple_prices(symbols)
        
        detailed_positions = []
        for t in trades:
            current_price = prices.get(t.symbol)
            pos_dict = {
                "id": t.id,
                "symbol": t.symbol,
                "entry_price": t.entry_price,
                "quantity": t.quantity,
                "entry_date": t.entry_date,
                "stop_loss": t.stop_loss,
                "take_profit": t.take_profit,
                "justification": t.justification,
                "current_price": current_price,
                "status": t.status,
                "pnl": round((current_price - t.entry_price) * t.quantity, 2) if current_price else None,
            }
            detailed_positions.append(pos_dict)
        return detailed_positions

    def get_portfolio_summary(self, db, user_id: str):
        p = self.repo.get_or_create_portfolio(db, user_id)
        detailed_positions = self.get_detailed_positions(db, user_id)
        
        prices = {pos["symbol"]: pos["current_price"] for pos in detailed_positions}
        val = self.engine.calculate_portfolio_value(p.capital, self.trade_repo.get_open_trades(db, user_id), prices) if p else 0
        
        return {
            "capital": p.capital if p else 0, 
            "valeur_totale": val, 
            "positions_ouvertes": detailed_positions
        }

    def open_position(self, db, user_id: str, symbol: str, price: float, qty=None, sl=None, tp=None, justification=None):
        p = self.repo.get_or_create_portfolio(db, user_id)
        if price is None or price <= 0:
            return {"success": False, "error": "Prix invalide"}
        calculated_qty = qty if qty and qty > 0 else self.engine.calculate_position_size(p.capital, price)
        if calculated_qty <= 0:
            return {"success": False, "error": "Quantité nulle, capital insuffisant"}
        cost = calculated_qty * price
        if cost > p.capital:
            return {"success": False, "error": f"Capital insuffisant (coût: ${cost:.2f}, disponible: ${p.capital:.2f})"}
        def_sl, def_tp = self.engine.calculate_sl_tp(price)
        final_sl = sl if sl and sl > 0 else def_sl
        final_tp = tp if tp and tp > 0 else def_tp
        self.trade_repo.create_trade(db, user_id, symbol, price, calculated_qty, final_sl, final_tp, justification)
        self.repo.update_capital(db, user_id, p.capital - cost)
        return {"success": True, "quantity": calculated_qty, "cost": cost}

    def close_position(self, db, user_id: str, trade_id: int):
        trade = self.trade_repo.get_trade_by_id(db, trade_id)
        if not trade or trade.status != "OPEN" or trade.user_id != user_id:
            return {"success": False, "error": "Position introuvable ou déjà fermée"}
        current_price = self.market.get_current_price(trade.symbol)
        if not current_price:
            return {"success": False, "error": "Impossible de récupérer le prix actuel"}
        closed = self.trade_repo.close_trade(db, trade_id, current_price)
        p = self.repo.get_or_create_portfolio(db, user_id)
        proceeds = current_price * closed.quantity
        self.repo.update_capital(db, user_id, p.capital + proceeds)
        return {"success": True, "exit_price": current_price, "pnl": closed.pnl, "proceeds": proceeds}

    def add_to_position(self, db, user_id: str, trade_id: int, extra_qty: float = None):
        trade = self.trade_repo.get_trade_by_id(db, trade_id)
        if not trade or trade.status != "OPEN" or trade.user_id != user_id:
            return {"success": False, "error": "Position introuvable ou fermée"}
        current_price = self.market.get_current_price(trade.symbol)
        if not current_price:
            return {"success": False, "error": "Prix indisponible"}
        p = self.repo.get_or_create_portfolio(db, user_id)
        qty_to_add = extra_qty if extra_qty and extra_qty > 0 else self.engine.calculate_position_size(p.capital, current_price)
        cost = qty_to_add * current_price
        if cost > p.capital:
            return {"success": False, "error": f"Capital insuffisant (coût: ${cost:.2f})"}
        # Nouvelle position au prix actuel avec mêmes cibles
        self.trade_repo.create_trade(db, user_id, trade.symbol, current_price, qty_to_add, trade.stop_loss, trade.take_profit, "Renforcement manuel de position")
        self.repo.update_capital(db, user_id, p.capital - cost)
        return {"success": True, "added_quantity": qty_to_add, "cost": cost, "at_price": current_price}

    def update_targets(self, db, user_id: str, trade_id: int, sl: float = None, tp: float = None):
        trade = self.trade_repo.get_trade_by_id(db, trade_id)
        if not trade or trade.status != "OPEN" or trade.user_id != user_id:
            return {"success": False, "error": "Position introuvable"}
        updated = self.trade_repo.update_trade_targets(db, trade_id, sl, tp)
        return {"success": True, "stop_loss": updated.stop_loss, "take_profit": updated.take_profit}

    def withdraw(self, db, user_id: str, amount: float):
        p = self.repo.get_or_create_portfolio(db, user_id)
        if amount <= 0:
            return {"success": False, "error": "Montant invalide"}
        if amount > p.capital:
            return {"success": False, "error": f"Solde insuffisant (disponible: ${p.capital:.2f})"}
        self.repo.update_capital(db, user_id, p.capital - amount)
        return {"success": True, "withdrawn": amount, "new_balance": p.capital - amount}

    def deposit(self, db, user_id: str, amount: float):
        """Ajoute des fonds au solde liquide sans toucher aux positions."""
        if amount <= 0:
            return {"success": False, "error": "Montant invalide"}
        p = self.repo.get_or_create_portfolio(db, user_id)
        new_capital = (p.capital if p else 0) + amount
        self.repo.update_capital(db, user_id, new_capital)
        return {"success": True, "deposited": amount, "new_balance": new_capital}
