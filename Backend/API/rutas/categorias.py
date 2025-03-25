from fastapi import APIRouter, HTTPException
from typing import List
from modelos.categoria import Categoria
from database import execute_query, execute_query_commit

# Crear un enrutador de FastAPI para manejar las rutas relacionadas con las categorías
router = APIRouter()

# Ruta para obtener una categoría específica por id
@router.get("/categorias/{id}", response_model=Categoria)
def get_categoria(id: str):
    query = f"SELECT * FROM categorias WHERE id_categoria = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Categoría no encontrada")
    return result[0]

# Ruta para crear una nueva categoría
@router.post("/categorias", response_model=Categoria)
def crear_categoria(categoria: Categoria):
    query = f"""
    INSERT INTO categorias (id_categoria, nombre_categoria, descripcion, imagen)
    VALUES ({categoria.id_categoria}, '{categoria.nombre_categoria}', '{categoria.descripcion}', '{categoria.imagen}')
    """
    execute_query_commit(query)
    return categoria

# Ruta para obtener todas las categorías
@router.get("/categorias", response_model=List[Categoria])
def obtener_categorias():
    query = "SELECT * FROM categorias"
    result = execute_query(query)
    return result

# Ruta para actualizar una categoría específica por id
@router.put("/categorias/{id}", response_model=Categoria)
def actualizar_categoria(id: str, categoria_actualizada: Categoria):
    query = f"""
    UPDATE categorias SET nombre_categoria = '{categoria_actualizada.nombre_categoria}', descripcion = '{categoria_actualizada.descripcion}', imagen = '{categoria_actualizada.imagen}'
    WHERE id_categoria = {id}
    """
    execute_query_commit(query)
    return categoria_actualizada

# Ruta para eliminar una categoría específica por id
@router.delete("/categorias/{id}")
def eliminar_categoria(id: str):
    query = f"DELETE FROM categorias WHERE id_categoria = {id}"
    execute_query_commit(query)
    return {"message": "Categoría eliminada exitosamente"} 