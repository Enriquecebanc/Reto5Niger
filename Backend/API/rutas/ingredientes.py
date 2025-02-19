from fastapi import APIRouter, HTTPException
from typing import List
from modelos.ingrediente import Ingrediente
from database import execute_query

router = APIRouter()

@router.get("/ingredientes/{id}", response_model=Ingrediente)
def get_ingrediente(id: str):
    query = "SELECT * FROM ingredientes WHERE id_ingrediente = %s"
    params = (id,)
    result = execute_query(query, params)
    if not result:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return result[0]

@router.post("/ingredientes", response_model=Ingrediente)
def crear_ingrediente(ingrediente: Ingrediente):
    query = """
    INSERT INTO ingredientes (id_ingrediente, nombre_ingrediente, descripcion, imagen)
    VALUES (%s, %s, %s, %s)
    """
    params = (
        ingrediente.id_ingrediente, ingrediente.nombre_ingrediente, ingrediente.descripcion, ingrediente.imagen
    )
    execute_query(query, params)
    return ingrediente

@router.get("/ingredientes", response_model=List[Ingrediente])
def obtener_ingredientes():
    query = "SELECT * FROM ingredientes"
    result = execute_query(query)
    return result

@router.put("/ingredientes/{id}", response_model=Ingrediente)
def actualizar_ingrediente(id: str, ingrediente_actualizado: Ingrediente):
    query = """
    UPDATE ingredientes SET nombre_ingrediente = %s, descripcion = %s, imagen = %s
    WHERE id_ingrediente = %s
    """
    params = (
        ingrediente_actualizado.nombre_ingrediente, ingrediente_actualizado.descripcion, ingrediente_actualizado.imagen, id
    )
    execute_query(query, params)
    return ingrediente_actualizado

@router.delete("/ingredientes/{id}", response_model=Ingrediente)
def eliminar_ingrediente(id: str):
    query = "DELETE FROM ingredientes WHERE id_ingrediente = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Ingrediente eliminado exitosamente"}