from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from dotenv import load_dotenv
import os

# Cargar las variables de entorno desde el archivo .env
load_dotenv()

# Token estático
STATIC_TOKEN = os.getenv("STATIC_TOKEN")

# Esquema de seguridad
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Función para obtener el usuario actual
def get_current_user(token: str = Depends(oauth2_scheme)):
    if token != STATIC_TOKEN:
        print("Usuario no autenticado")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return "static_user"