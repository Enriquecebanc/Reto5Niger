# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/dependencias.py
from fastapi import HTTPException, Depends
from config import API_KEYS

async def get_api_key(api_key: str):
    if api_key not in API_KEYS:
        raise HTTPException(
            status_code=403,
            detail="No se pudieron validar las credenciales",
        )
    return API_KEYS[api_key]