# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/rutas/ingredientes.py
from fastapi import APIRouter, HTTPException
from typing import List
from modelos.ingrediente import Ingrediente

router = APIRouter()

ingredientes_db: List[Ingrediente] = []

@router.get("/ingredientes/{id}", response_model=Ingrediente)
def get_ingrediente(id: str):
    for ingrediente in ingredientes_db:
        if ingrediente.id_ingrediente == id:
            return ingrediente
    raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

@router.post("/ingredientes", response_model=Ingrediente)
def crear_ingrediente(ingrediente: Ingrediente):
    ingredientes_db.append(ingrediente)
    return ingrediente

@router.get("/ingredientes", response_model=List[Ingrediente])
def obtener_ingredientes():
    return ingredientes_db