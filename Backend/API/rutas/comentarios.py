from fastapi import APIRouter, HTTPException
from typing import List
from modelos.comentario import Comentario
from database import execute_query

router = APIRouter()

@router.get("/comentarios/{id}", response_model=Comentario)
def get_comentario(id: str):
    query = "SELECT * FROM comentarios WHERE id_comentario = %s"
    params = (id,)
    result = execute_query(query, params)
    if not result:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")
    return result[0]

@router.post("/comentarios", response_model=Comentario)
def crear_comentario(comentario: Comentario):
    query = """
    INSERT INTO comentarios (id_comentario, id_usuario, id_receta, texto, fecha, valoracion)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    params = (
        comentario.id_comentario, comentario.id_usuario, comentario.id_receta, comentario.texto,
        comentario.fecha, comentario.valoracion
    )
    execute_query(query, params)
    return comentario

@router.get("/comentarios", response_model=List[Comentario])
def obtener_comentarios():
    query = "SELECT * FROM comentarios"
    result = execute_query(query)
    return result

@router.put("/comentarios/{id}", response_model=Comentario)
def actualizar_comentario(id: str, comentario_actualizado: Comentario):
    query = """
    UPDATE comentarios SET id_usuario = %s, id_receta = %s, texto = %s, fecha = %s, valoracion = %s
    WHERE id_comentario = %s
    """
    params = (
        comentario_actualizado.id_usuario, comentario_actualizado.id_receta, comentario_actualizado.texto,
        comentario_actualizado.fecha, comentario_actualizado.valoracion, id
    )
    execute_query(query, params)
    return comentario_actualizado

@router.delete("/comentarios/{id}", response_model=Comentario)
def eliminar_comentario(id: str):
    query = "DELETE FROM comentarios WHERE id_comentario = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Comentario eliminado exitosamente"}