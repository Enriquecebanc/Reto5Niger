from fastapi import FastAPI, Depends
from auth import get_current_user
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

@app.get("/protected-route")
def protected_route(current_user: str = Depends(get_current_user)):
    return {"message": f"Hola, {current_user}. Esta es una ruta protegida."}