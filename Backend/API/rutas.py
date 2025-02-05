from fastapi import APIRouter
from modelos import Recetas
from database import recetas_db
from typing import List

router = APIRouter()

@router.get("/recetas/{id}")
def get_receta(id: int):
    if id < len(recetas_db):
        return recetas_db[id]
    return {"error": "Receta no encontrada"}

@router.post("/recetas")
def crear_receta(receta: Recetas):
    recetas_db.append(receta)
    return {"message": f"Receta creada: {receta.nombre}"}

@router.get("/listarecetas", response_model=List[Recetas])
def obtener_recetas():
    return recetas_db
