from fastapi import APIRouter, HTTPException
from typing import List
from modelos.receta import Receta
from database import execute_query
from database import execute_query_commit

router = APIRouter()

@router.get("/print")
def print_recetas():
    return {"message": "Recetas"}

@router.get("/recetas/{id}", response_model=Receta)
def get_receta(id: int):
    print(id)
    query = f"SELECT * FROM receta WHERE id_receta = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Receta no encontrada")
    return result[0]

@router.post("/recetas", response_model=Receta)
def crear_receta(receta: Receta):
    query = f"""
    INSERT INTO receta (id_receta, id_usuario, nombre_receta, descripcion_breve, instrucciones, imagen, id_categoria, tiempo, porciones)
    VALUES ({receta.id_receta}, {receta.id_usuario}, '{receta.nombre_receta}', '{receta.descripcion_breve}', '{receta.instrucciones}', '{receta.imagen}', {receta.id_categoria}, {receta.tiempo}, {receta.porciones})
    """
    execute_query_commit(query)
    return receta

@router.get("/recetas", response_model=List[Receta])
def obtener_recetas():
    query = "SELECT * FROM receta"
    result = execute_query(query)
    return result

@router.put("/recetas/{id}", response_model=Receta)
def actualizar_receta(id: str, receta_actualizada: Receta):
    query = f"""
    UPDATE receta SET id_usuario = {receta_actualizada.id_usuario}, nombre_receta = '{receta_actualizada.nombre_receta}', descripcion_breve = '{receta_actualizada.descripcion_breve}', instrucciones = '{receta_actualizada.instrucciones}', imagen = '{receta_actualizada.imagen}', id_categoria = {receta_actualizada.id_categoria}, tiempo = {receta_actualizada.tiempo}, porciones = {receta_actualizada.porciones}
    WHERE id_receta = {id}
    """
    execute_query_commit(query)
    return receta_actualizada

@router.delete("/recetas/{id}")
def eliminar_receta(id: int):
    query = f"DELETE FROM receta WHERE id_receta = {id}"
    execute_query_commit(query)
    return {"message": "Receta eliminada exitosamente"}

@router.get("/recetas/categoria/{categoria}", response_model=List[Receta])
def obtener_recetas_por_categoria(categoria: int):
    # Obtener las recetas por categoría
    query = f"SELECT * FROM receta WHERE id_categoria = {categoria}"
    result = execute_query(query)
    
    if not result:
        raise HTTPException(status_code=404, detail="No se encontraron recetas para esta categoría")
    
    recetas = []

    for receta in result:
        id_receta = receta["id_receta"]
        
        # Obtener las cantidades de cada receta
        query_cantidades = f"SELECT cantidad, unidad FROM cantidades WHERE id_receta = {id_receta}"
        cantidades_result = execute_query(query_cantidades)
        
        # Obtener los ingredientes de cada receta
        #query_ingredientes = f"SELECT nombre_ingrediente FROM ingredientes WHERE id_receta = {id_receta}"
        #ingredientes_result = execute_query(query_ingredientes)
        
        # Añadir las cantidades y los ingredientes a la receta
        receta["cantidad_ingredientes"] = cantidades_result  # Añadir cantidades
        #receta["ingredientes"] = ingredientes_result  # Añadir ingredientes
        
        # Añadir la receta con sus cantidades e ingredientes a la lista final
        recetas.append(receta)
    
    return recetas  # Devolver la lista de recetas con las cantidades e ingredientes asociados