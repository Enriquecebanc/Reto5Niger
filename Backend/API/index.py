from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional, List

app = FastAPI()

class Receta(BaseModel):
    id: int
    nombre: str
    ingredientes: str
    preparacion: str
    valoracion: Optional[int] = None

recetas_db: List[Receta] = []

@app.get("/")
def index():
    return {"message": "Hello, World!"}

@app.get("/recetas/{id}", response_model=Receta)
def get_receta(id: int):
    for receta in recetas_db:
        if receta.id == id:
            return receta
    raise HTTPException(status_code=404, detail="Receta no encontrada")

@app.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    recetas_db.append(receta)
    return receta

@app.get("/recetas", response_model=List[Receta])
def obtener_recetas():
    return recetas_db