from fastapi import FastAPI
from rutas import router

app = FastAPI()

app.include_router(router)

@app.get("/")
def index():
    return {"message": "Bienvenido al sistema!"}
