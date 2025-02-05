# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/rutas/recetas.py
from fastapi import APIRouter, HTTPException
from typing import List
from modelos.receta import Receta

router = APIRouter()

recetas_db: List[Receta] = []

@router.get("/recetas/{id}", response_model=Receta)
def get_receta(id: str):
    for receta in recetas_db:
        if receta.id == id:
            return receta
    raise HTTPException(status_code=404, detail="Receta no encontrada")

@router.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    recetas_db.append(receta)
    return receta

@router.get("/recetas", response_model=List[Receta])
def obtener_recetas():
    return recetas_db