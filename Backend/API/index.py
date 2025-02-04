from fastapi import FastAPI as fa
from pydantic import BaseModel as bm
from typing import Optional as op, List

app = fa()

class Recetas(bm):
    id: str
    nombre: str
    ingredientes: str
    preparacion: str
    valoracion: op[int] = None

recetas_db = []

@app.get("/")
def index():
    return {"message": "Hello, World!"}

@app.get("/recetas/{id}")
def get_receta(id: int):
    if id < len(recetas_db):
        return recetas_db[id]
    return {"error": "Receta no encontrada"}

@app.post("/recetas")
def crear_receta(receta: Recetas):
    recetas_db.append(receta)
    return {"message": f"Receta creada: {receta.nombre}"}

@app.get("/listarecetas", response_model=List[Recetas])
def obtener_recetas():
    return recetas_db