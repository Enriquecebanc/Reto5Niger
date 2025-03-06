from fastapi import APIRouter, HTTPException
from typing import List
from modelos.comentario import Comentario
from database import execute_query, execute_query_commit

# Crear un enrutador de FastAPI para manejar las rutas relacionadas con los comentarios
router = APIRouter()

# Ruta para obtener un comentario específico por id
@router.get("/comentarios/{id}", response_model=Comentario)
def get_comentario(id: str):
    query = f"SELECT * FROM comentario WHERE id_comentario = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Comentario no encontrado")
    return result[0]

# Ruta para obtener todos los comentarios de una receta específica por id_receta
@router.get("/comentarios/receta/{id_receta}", response_model=List[Comentario])
def obtener_comentarios_por_receta(id_receta: str):
    query = f"SELECT * FROM comentario WHERE id_receta = {id_receta}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="No hay comentarios para esta receta")
    return result

# Ruta para crear un nuevo comentario
@router.post("/comentarios", response_model=Comentario)
def crear_comentario(comentario: Comentario):
    # Verificar que el id_usuario y el id_receta existen en las tablas correspondientes
    usuario_query = f"SELECT * FROM usuario WHERE id_usuario = {comentario.id_usuario}"
    receta_query = f"SELECT * FROM receta WHERE id_receta = {comentario.id_receta}"
    usuario_result = execute_query(usuario_query)
    receta_result = execute_query(receta_query)
    if not usuario_result:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")
    if not receta_result:
        raise HTTPException(status_code=400, detail="Receta no encontrada")

    query = f"""
    INSERT INTO comentario (id_comentario, id_usuario, id_receta, texto, valoracion)
    VALUES ({comentario.id_comentario}, {comentario.id_usuario}, {comentario.id_receta}, '{comentario.texto}', {comentario.valoracion})
    """
    execute_query_commit(query)
    return comentario

# Ruta para obtener todos los comentarios
@router.get("/comentarios", response_model=List[Comentario])
def obtener_comentarios():
    query = "SELECT * FROM comentario"
    result = execute_query(query)
    return result

# Ruta para actualizar un comentario específico por id
@router.put("/comentarios/{id}", response_model=Comentario)
def actualizar_comentario(id: str, comentario_actualizado: Comentario):
    # Verificar que el id_usuario y el id_receta existen en las tablas correspondientes
    usuario_query = f"SELECT * FROM usuario WHERE id_usuario = {comentario_actualizado.id_usuario}"
    receta_query = f"SELECT * FROM receta WHERE id_receta = {comentario_actualizado.id_receta}"
    usuario_result = execute_query(usuario_query)
    receta_result = execute_query(receta_query)
    if not usuario_result:
        raise HTTPException(status_code=400, detail="Usuario no encontrado")
    if not receta_result:
        raise HTTPException(status_code=400, detail="Receta no encontrada")

    query = f"""
    UPDATE comentario SET id_usuario = {comentario_actualizado.id_usuario}, id_receta = {comentario_actualizado.id_receta}, texto = '{comentario_actualizado.texto}', valoracion = {comentario_actualizado.valoracion}
    WHERE id_comentario = {id}
    """
    execute_query_commit(query)
    return comentario_actualizado

# Ruta para eliminar un comentario específico por id
@router.delete("/comentarios/{id}")
def eliminar_comentario(id: str):
    query = f"DELETE FROM comentario WHERE id_comentario = {id}"
    execute_query_commit(query)
    return {"message": "Comentario eliminado exitosamente"}