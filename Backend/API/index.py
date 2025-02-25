from fastapi import FastAPI, Depends
from auth import get_current_user
from fastapi.middleware.cors import CORSMiddleware
from rutas import (
    recetas_router,
    categorias_router,
    comentarios_router,
    ingredientes_router,
    usuarios_router,
    cantidades_router,
)

app = FastAPI(
    title="Mi Aplicación de Recetas",
    description="Esta es una API para gestionar recetas, categorías, comentarios, ingredientes y usuarios.",
)

origins = [
    "http://localhost",
    "http://localhost:3000",  # Agrega el puerto de tu frontend si es diferente
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(recetas_router, dependencies=[Depends(get_current_user)])
app.include_router(categorias_router, dependencies=[Depends(get_current_user)])
app.include_router(comentarios_router, dependencies=[Depends(get_current_user)])
app.include_router(ingredientes_router, dependencies=[Depends(get_current_user)])
app.include_router(usuarios_router, dependencies=[Depends(get_current_user)])
app.include_router(cantidades_router, dependencies=[Depends(get_current_user)])

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}