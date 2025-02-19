from fastapi import APIRouter, HTTPException
from typing import List
from modelos.receta import Receta
from database import execute_query

router = APIRouter()

@router.get("/print")
def print_recetas():
    return {"message": "Recetas"}

@router.get("/recetas/{id}", response_model=Receta)
def get_receta(id: int):
    print(id)
    query = f"SELECT * FROM receta WHERE id_receta = {id}"
    #params = (id,)
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return result[0]

@router.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    query = """
    INSERT INTO receta (id_receta, id_usuario, nombre_receta, descripcion_breve, instrucciones, imagen, id_categoria, tiempo, porciones)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    params = (
        receta.id_receta, receta.id_usuario, receta.nombre_receta, receta.descripcion_breve, receta.instrucciones,
        receta.imagen, receta.id_categoria, receta.tiempo, receta.porciones
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
    UPDATE receta SET id_usuario = %s, nombre_receta = %s, descripcion_breve = %s, instrucciones = %s, imagen = %s, id_categoria = %s, tiempo = %s, porciones = %s
    WHERE id_receta = %s
    """
    params = (
        receta_actualizada.id_usuario, receta_actualizada.nombre_receta, receta_actualizada.descripcion_breve, receta_actualizada.instrucciones,
        receta_actualizada.imagen, receta_actualizada.id_categoria, receta_actualizada.tiempo, receta_actualizada.porciones, id
    )
    execute_query(query, params)
    return receta_actualizada

@router.delete("/recetas/{id}", response_model=Receta)
def eliminar_receta(id: str):
    query = "DELETE FROM receta WHERE id_receta = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Receta eliminada exitosamente"}