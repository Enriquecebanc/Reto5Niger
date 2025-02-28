from fastapi import APIRouter, HTTPException
from typing import List
from modelos.cantidades import Cantidades
from database import execute_query, execute_query_commit

router = APIRouter()

@router.get("/cantidades/{id_receta}/{id_ingrediente}", response_model=Cantidades)
def get_cantidad(id_receta: int, id_ingrediente: int):
    query = f"SELECT * FROM cantidades WHERE id_receta = {id_receta} AND id_ingrediente = {id_ingrediente}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Cantidad no encontrada")
    return result[0]

@router.post("/cantidades", response_model=Cantidades)
def crear_cantidad(cantidad: Cantidades):
    query = f"""
    INSERT INTO cantidades (id_receta, id_ingrediente, cantidad_ingrediente)
    VALUES ({cantidad.id_receta}, {cantidad.id_ingrediente}, '{cantidad.cantidad_ingrediente}')
    """
    execute_query_commit(query)
    return cantidad

@router.get("/cantidades", response_model=List[Cantidades])
def obtener_cantidades():
    query = "SELECT * FROM cantidades"
    result = execute_query(query)
    return result

@router.get("/cantidades/{id_receta}", response_model=List[Cantidades])
def obtener_cantidades_por_receta(id_receta: int):
    query = f"SELECT * FROM cantidades WHERE id_receta = {id_receta}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="No se encontraron cantidades para la receta")
    return result

@router.put("/cantidades/{id_receta}/{id_ingrediente}", response_model=Cantidades)
def actualizar_cantidad(id_receta: int, id_ingrediente: int, cantidad_actualizada: Cantidades):
    query = f"""
    UPDATE cantidades SET cantidad_ingrediente = '{cantidad_actualizada.cantidad_ingrediente}'
    WHERE id_receta = {id_receta} AND id_ingrediente = {id_ingrediente}
    """
    execute_query_commit(query)
    return cantidad_actualizada

@router.delete("/cantidades/{id_receta}/{id_ingrediente}")
def eliminar_cantidad(id_receta: int, id_ingrediente: int):
    query = f"DELETE FROM cantidades WHERE id_receta = {id_receta} AND id_ingrediente = {id_ingrediente}"
    execute_query_commit(query)
    return {"message": "Cantidad eliminada exitosamente"}