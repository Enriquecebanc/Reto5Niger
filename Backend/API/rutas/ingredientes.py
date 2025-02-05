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

@router.put("/ingredientes/{id}", response_model=Ingrediente)
def actualizar_ingrediente(id: str, ingrediente_actualizado: Ingrediente):
    for i, ingrediente in enumerate(ingredientes_db):
        if ingrediente.id_ingrediente == id:
            ingredientes_db[i] = ingrediente_actualizado
            return ingrediente_actualizado
    raise HTTPException(status_code=404, detail="Ingrediente no encontrado")

@router.delete("/ingredientes/{id}", response_model=Ingrediente)
def eliminar_ingrediente(id: str):
    for i, ingrediente in enumerate(ingredientes_db):
        if ingrediente.id_ingrediente == id:
            return ingredientes_db.pop(i)
    raise HTTPException(status_code=404, detail="Ingrediente no encontrado")