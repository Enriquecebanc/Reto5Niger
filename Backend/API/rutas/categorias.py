# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/rutas/categorias.py
from fastapi import APIRouter, HTTPException
from typing import List
from modelos.categoria import Categoria

router = APIRouter()

categorias_db: List[Categoria] = []

@router.get("/categorias/{id}", response_model=Categoria)
def get_categoria(id: str):
    for categoria in categorias_db:
        if categoria.id_categoria == id:
            return categoria
    raise HTTPException(status_code=404, detail="Categoría no encontrada")

@router.post("/categorias", response_model=Categoria)
def crear_categoria(categoria: Categoria):
    categorias_db.append(categoria)
    return categoria

@router.get("/categorias", response_model=List[Categoria])
def obtener_categorias():
    return categorias_db

@router.put("/categorias/{id}", response_model=Categoria)
def actualizar_categoria(id: str, categoria_actualizada: Categoria):
    for i, categoria in enumerate(categorias_db):
        if categoria.id_categoria == id:
            categorias_db[i] = categoria_actualizada
            return categoria_actualizada
    raise HTTPException(status_code=404, detail="Categoría no encontrada")

@router.delete("/categorias/{id}", response_model=Categoria)
def eliminar_categoria(id: str):
    for i, categoria in enumerate(categorias_db):
        if categoria.id_categoria == id:
            return categorias_db.pop(i)
    raise HTTPException(status_code=404, detail="Categoría no encontrada")