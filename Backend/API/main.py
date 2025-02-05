# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/main.py
from fastapi import FastAPI
from rutas import recetas_router

app = FastAPI()

app.include_router(recetas_router)

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}