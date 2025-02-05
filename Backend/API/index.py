# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/main.py
from fastapi import FastAPI, Depends, HTTPException
from rutas.recetas import router as recetas_router
from dependencias import get_api_key

app = FastAPI()

@app.get("/key/{api_key}")
async def validar_key(api_key: str, key: str = Depends(get_api_key)):
    return {"message": "API Key válida"}

app.include_router(recetas_router, prefix="/key/{api_key}", dependencies=[Depends(get_api_key)])

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}