"""
chat_router.py — Chatbot interactif ET actionnable du Trading Bach Bot.
Le bot peut non seulement répondre en langage naturel, mais aussi exécuter des actions
sur le portefeuille (vendre, modifier TP/SL, changer profil de risque, etc.)
"""
import os
from fastapi import APIRouter, Depends, Body
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.openai_service import OpenAIService
from app.services.portfolio_service import PortfolioService
from app.core.auth_deps import get_current_user_id

router = APIRouter(prefix="/chat", tags=["Chat"])
openai_service = OpenAIService()
portfolio_service = PortfolioService()

@router.post("")
def chat_with_bot(message: str = Body(..., embed=True), db: Session = Depends(get_db), user_id: str = Depends(get_current_user_id)):
    """
    Communique avec Trading Bach Bot via OpenAI.
    Supporte le chat simple ET les actions sur le portefeuille.
    """
    summary = portfolio_service.get_portfolio_summary(db, user_id)
    open_positions = summary['positions_ouvertes']

    # Contexte enrichi pour l'IA
    positions_str = ", ".join([
        f"{p['symbol']} (id:{p['id']}, TP:{p.get('take_profit', 'N/A')}$, SL:{p.get('stop_loss', 'N/A')}$)"
        for p in open_positions
    ])
    risk_profile = os.getenv("RISK_PROFILE", "moderate")
    context = (
        f"Capital liquide: {summary['capital']}$, Valeur totale: {summary['valeur_totale']}$. "
        f"Positions ouvertes: {positions_str if positions_str else 'Aucune'}. "
        f"Profil de risque actuel: {risk_profile}."
    )

    # Appel à l'IA avec détection d'intentions
    result = openai_service.get_actionable_response(message, context)
    response_text = result.get("response", "Je n'ai pas pu générer de réponse.")
    intent = result.get("intent")
    params = result.get("params", {})

    action_result = None

    # Dispatch des actions selon l'intention détectée
    if intent == "sell":
        symbol = params.get("symbol", "").upper()
        trade_id = params.get("trade_id")

        if trade_id:
            action_result = portfolio_service.close_position(db, user_id, trade_id)
        elif symbol:
            # Chercher la position ouverte pour ce symbole
            trade = next((p for p in open_positions if p['symbol'] == symbol), None)
            if trade:
                action_result = portfolio_service.close_position(db, user_id, trade['id'])
            else:
                action_result = {"success": False, "error": f"Aucune position ouverte pour {symbol}"}

    elif intent == "update_targets":
        symbol = params.get("symbol", "").upper()
        sl = params.get("stop_loss")
        tp = params.get("take_profit")
        trade = next((p for p in open_positions if p['symbol'] == symbol), None)
        if trade:
            action_result = portfolio_service.update_targets(db, user_id, trade['id'], sl=sl, tp=tp)
        else:
            action_result = {"success": False, "error": f"Aucune position ouverte pour {symbol}"}

    elif intent == "set_risk_profile":
        profile = params.get("profile", "moderate")
        valid_profiles = ["aggressive", "moderate", "conservative"]
        if profile in valid_profiles:
            # Mise à jour de la variable d'environnement en runtime
            os.environ["RISK_PROFILE"] = profile
            action_result = {"success": True, "new_profile": profile}
            response_text += f"\n\n✅ Profil de risque mis à jour : **{profile}**"
        else:
            action_result = {"success": False, "error": f"Profil invalide: {profile}"}

    elif intent == "withdraw":
        amount = params.get("amount", 0)
        action_result = portfolio_service.withdraw(db, user_id, amount)

    elif intent == "reset":
        # Note: reset_account is not yet implemented in service, but we should pass user_id if it was
        action_result = {"success": False, "error": "Reset not implemented for multi-user yet"}

    return {
        "response": response_text,
        "intent": intent,
        "action_result": action_result
    }
