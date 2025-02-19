from fastapi import APIRouter, HTTPException
from typing import List
from modelos.receta import Receta
from database import execute_query

router = APIRouter()

@router.get("/recetas/{id}", response_model=Receta)
def get_receta(id: str):
    query = "SELECT * FROM receta WHERE id_receta = %s"
    params = (id,)
    result = execute_query(query, params)
    if not result:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return result[0]

@router.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    query = """
    INSERT INTO receta (id_receta, nombre, instrucciones, tiempo, porciones, imagen, id_categoria, descripcion)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    params = (
        receta.id_receta, receta.nombre, receta.instrucciones, receta.tiempo, receta.porciones,
        receta.imagen, receta.id_categoria, receta.descripcion
    )
    execute_query(query, params)
    return receta

@router.get("/recetas", response_model=List[Receta])
def obtener_recetas():
    query = "SELECT * FROM receta"
    result = execute_query(query)
    return result

@router.put("/recetas/{id}", response_model=Receta)
def actualizar_receta(id: str, receta_actualizada: Receta):
    query = """
    UPDATE receta SET nombre = %s, instrucciones = %s, tiempo = %s, porciones = %s, imagen = %s, id_categoria = %s, descripcion = %s
    WHERE id_receta = %s
    """
    params = (
        receta_actualizada.nombre, receta_actualizada.instrucciones, receta_actualizada.tiempo, receta_actualizada.porciones,
        receta_actualizada.imagen, receta_actualizada.id_categoria, receta_actualizada.descripcion, id
    )
    execute_query(query, params)
    return receta_actualizada

@router.delete("/recetas/{id}", response_model=Receta)
def eliminar_receta(id: str):
    query = "DELETE FROM receta WHERE id_receta = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Receta eliminada exitosamente"}