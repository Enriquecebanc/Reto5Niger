from fastapi import APIRouter, HTTPException
from typing import List
from modelos.categoria import Categoria
from database import execute_query, execute_query_commit

router = APIRouter()

@router.get("/categorias/{id}", response_model=Categoria)
def get_categoria(id: str):
    query = f"SELECT * FROM categorias WHERE id_categoria = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return result[0]

@router.post("/categorias", response_model=Categoria)
def crear_categoria(categoria: Categoria):
    query = f"""
    INSERT INTO categorias (id_categoria, nombre_categoria, descripcion, imagen)
    VALUES ({categoria.id_categoria}, '{categoria.nombre_categoria}', '{categoria.descripcion}', '{categoria.imagen}')
    """
    execute_query_commit(query)
    return categoria

@router.get("/categorias", response_model=List[Categoria])
def obtener_categorias():
    query = "SELECT * FROM categorias"
    result = execute_query(query)
    return result

@router.put("/categorias/{id}", response_model=Categoria)
def actualizar_categoria(id: str, categoria_actualizada: Categoria):
    query = f"""
    UPDATE categorias SET nombre_categoria = '{categoria_actualizada.nombre_categoria}', descripcion = '{categoria_actualizada.descripcion}', imagen = '{categoria_actualizada.imagen}'
    WHERE id_categoria = {id}
    """
    execute_query_commit(query)
    return categoria_actualizada

@router.delete("/categorias/{id}")
def eliminar_categoria(id: str):
    query = f"DELETE FROM categorias WHERE id_categoria = {id}"
    execute_query_commit(query)
    return {"message": "Categoría eliminada exitosamente"}