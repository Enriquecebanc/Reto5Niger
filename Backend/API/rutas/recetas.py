from fastapi import APIRouter, HTTPException
from typing import List
from modelos.receta import Receta
from database import get_db

router = APIRouter()

recetas_db: List[Receta] = []

@router.get("/recetas/{id}", response_model=Receta)
def get_receta(id: str):
    for receta in recetas_db:
        if receta.id_receta == id:
            return receta
    raise HTTPException(status_code=404, detail="Receta no encontrada")

@router.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    data = get_db(f"INSERT INTO recetas (nombre, descripcion, id_categoria) VALUES ('{receta.nombre}', '{receta.descripcion}', {receta.id_categoria})")
    recetas_db.append(receta)
    return receta

@router.get("/recetas", response_model=List[Receta])
def obtener_recetas():
    return recetas_db

@router.put("/recetas/{id}", response_model=Receta)
def actualizar_receta(id: str, receta_actualizada: Receta):
    for i, receta in enumerate(recetas_db):
        if receta.id_receta == id:
            recetas_db[i] = receta_actualizada
            return receta_actualizada
    raise HTTPException(status_code=404, detail="Receta no encontrada")

@router.delete("/recetas/{id}", response_model=Receta)
def eliminar_receta(id: str):
    for i, receta in enumerate(recetas_db):
        if receta.id_receta == id:
            return recetas_db.pop(i)
    raise HTTPException(status_code=404, detail="Receta no encontrada")