# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/main.py
from fastapi import FastAPI
from fastapi.openapi.utils import get_openapi
from fastapi.staticfiles import StaticFiles
from rutas import (
    recetas_router,
    categorias_router,
    comentarios_router,
    ingredientes_router,
    usuarios_router
)

app = FastAPI(
    title="Mi Aplicación de Recetas",
    description="Esta es una API para gestionar recetas, categorías, comentarios, ingredientes y usuarios.",
)

app.include_router(recetas_router)
app.include_router(categorias_router)
app.include_router(comentarios_router)
app.include_router(ingredientes_router)
app.include_router(usuarios_router)


@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}