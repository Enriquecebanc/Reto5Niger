from fastapi import APIRouter, HTTPException
from typing import List
from modelos.ingrediente import Ingrediente
from database import execute_query, execute_query_commit

router = APIRouter()

@router.get("/ingredientes/{id}", response_model=Ingrediente)
def get_ingrediente(id: str):
    query = f"SELECT * FROM ingredientes WHERE id_ingrediente = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return result[0]

@router.post("/ingredientes", response_model=Ingrediente)
def crear_ingrediente(ingrediente: Ingrediente):
    query = f"""
    INSERT INTO ingredientes (id_ingrediente, nombre_ingrediente, descripcion, imagen)
    VALUES ({ingrediente.id_ingrediente}, '{ingrediente.nombre_ingrediente}', '{ingrediente.descripcion}', '{ingrediente.imagen}')
    """
    execute_query_commit(query)
    return ingrediente

@router.get("/ingredientes", response_model=List[Ingrediente])
def obtener_ingredientes():
    query = "SELECT * FROM ingredientes"
    result = execute_query(query)
    return result

@router.put("/ingredientes/{id}", response_model=Ingrediente)
def actualizar_ingrediente(id: str, ingrediente_actualizado: Ingrediente):
    query = f"""
    UPDATE ingredientes SET nombre_ingrediente = '{ingrediente_actualizado.nombre_ingrediente}', descripcion = '{ingrediente_actualizado.descripcion}', imagen = '{ingrediente_actualizado.imagen}'
    WHERE id_ingrediente = {id}
    """
    execute_query_commit(query)
    return ingrediente_actualizado

@router.delete("/ingredientes/{id}")
def eliminar_ingrediente(id: str):
    query = f"DELETE FROM ingredientes WHERE id_ingrediente = {id}"
    execute_query_commit(query)
    return {"message": "Ingrediente eliminado exitosamente"}