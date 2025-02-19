from fastapi import APIRouter, HTTPException
from typing import List
from modelos.categoria import Categoria
from database import execute_query

router = APIRouter()

@router.get("/categorias/{id}", response_model=Categoria)
def get_categoria(id: str):
    query = "SELECT * FROM categorias WHERE id_categoria = %s"
    params = (id,)
    result = execute_query(query, params)
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return result[0]

@router.post("/categorias", response_model=Categoria)
def crear_categoria(categoria: Categoria):
    query = """
    INSERT INTO categorias (id_categoria, nombre, descripcion, imagen)
    VALUES (%s, %s, %s, %s)
    """
    params = (
        categoria.id_categoria, categoria.nombre, categoria.descripcion, categoria.imagen
    )
    execute_query(query, params)
    return categoria

@router.get("/categorias", response_model=List[Categoria])
def obtener_categorias():
    query = "SELECT * FROM categorias"
    result = execute_query(query)
    return result

@router.put("/categorias/{id}", response_model=Categoria)
def actualizar_categoria(id: str, categoria_actualizada: Categoria):
    query = """
    UPDATE categorias SET nombre = %s, descripcion = %s, imagen = %s
    WHERE id_categoria = %s
    """
    params = (
        categoria_actualizada.nombre, categoria_actualizada.descripcion, categoria_actualizada.imagen, id
    )
    execute_query(query, params)
    return categoria_actualizada

@router.delete("/categorias/{id}", response_model=Categoria)
def eliminar_categoria(id: str):
    query = "DELETE FROM categorias WHERE id_categoria = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Categoría eliminada exitosamente"}