import os
from fastapi import Header, HTTPException, Depends
from jose import jwt, JWTError

# Supabase JWT settings (JWT secret is required to verify tokens, but for now we'll decode without verification if secret is unknown/not local)
# Actually, Supabase uses a public key (JWT secret) found in the dashboard.
# For now, we will extract the 'sub' field which is the user_id.

def get_current_user_id(authorization: str = Header(None)) -> str:
    if not authorization:
        # For development purposes, if no header is provided and DEBUG is true, return a mock user
        if os.getenv("DEBUG", "false").lower() == "true":
            return "mock_user_id"
        raise HTTPException(status_code=401, detail="Missing Authorization header")
    
    try:
        scheme, token = authorization.split()
        if scheme.lower() != 'bearer':
            raise HTTPException(status_code=401, detail="Invalid authentication scheme")
        
        # Decode the token without verification to get user_id (sub)
        # In a production environment, you MUST verify the signature using the Supabase JWT Secret.
        payload = jwt.get_unverified_claims(token)
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token: missing sub claim")
        return user_id
    except (ValueError, JWTError):
        raise HTTPException(status_code=401, detail="Invalid token format")
