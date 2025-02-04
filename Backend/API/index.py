
from fastapi import FastAPI
from .rutas import recetas, usuarios

app = FastAPI()

app.include_router(recetas.router)

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}