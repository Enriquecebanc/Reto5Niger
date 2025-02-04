from fastapi import FastAPI as fa
from pydantic import BaseModel as bm
from typing import Optional as op

app = fa()

class Recetas(bm):
    nombre: str
    ingredientes: str
    preparacion: str
    valoracion: op[float]

@app.get("/")
def index():
    return {"message": "Hello, World!"}

@app.get("/recetas/{id}")
def get_receta(id : int):
    return {"data": id}

@app.post("/recetas/")
def crear_receta(receta: Recetas):
    return {"message": f"Receta creada: {receta.nombre}"}

