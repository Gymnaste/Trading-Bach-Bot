"""
supabase_client.py — Client Supabase pour la version multi-utilisateurs.
Initialisé depuis les variables d'environnement SUPABASE_URL et SUPABASE_KEY.
Usage : from app.providers.supabase_client import supabase_client
"""
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY = os.getenv("SUPABASE_KEY", "")

supabase = None

def get_supabase_client():
    """Retourne le client Supabase, ou None si les credentials ne sont pas configurés."""
    global supabase
    if supabase is not None:
        return supabase
    if not SUPABASE_URL or not SUPABASE_KEY:
        return None
    try:
        from supabase import create_client, Client
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        return supabase
    except Exception as e:
        print(f"[Supabase] Erreur d'initialisation : {e}")
        return None

def is_supabase_enabled() -> bool:
    """Vérifie si Supabase est configuré et disponible."""
    return bool(SUPABASE_URL and SUPABASE_KEY)
