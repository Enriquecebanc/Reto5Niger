# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/main.py
from fastapi import FastAPI
from rutas.recetas import router as recetas_router

app = FastAPI()

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}