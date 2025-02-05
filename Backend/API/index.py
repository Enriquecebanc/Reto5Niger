# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/main.py
from fastapi import FastAPI
from rutas import (
    recetas_router,
    categorias_router,
    comentarios_router,
    ingredientes_router,
    usuarios_router,
)

app = FastAPI()

app.include_router(recetas_router)
app.include_router(categorias_router)
app.include_router(comentarios_router)
app.include_router(ingredientes_router)
app.include_router(usuarios_router)

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}