from fastapi import APIRouter, HTTPException
from typing import List
from modelos.usuario import Usuario
from database import execute_query, execute_query_commit

# Crear un enrutador de FastAPI para manejar las rutas relacionadas con los usuarios
router = APIRouter()

# Ruta para obtener un usuario específico por id
@router.get("/usuarios/{id}", response_model=Usuario)
def get_usuario(id: str):
    query = f"SELECT * FROM usuario WHERE id_usuario = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return result[0]

# Ruta para crear un nuevo usuario
@router.post("/usuarios", response_model=Usuario)
def crear_usuario(usuario: Usuario):
    query = f"""
    INSERT INTO usuario (id_usuario, nombre_usuario, correo, contraseña, foto_perfil, respuesta_pregunta_1, respuesta_pregunta_2, respuesta_pregunta_3)
    VALUES ({usuario.id_usuario}, '{usuario.nombre_usuario}', '{usuario.correo}', '{usuario.contraseña}', '{usuario.foto_perfil}', '{usuario.respuesta_pregunta_1}', '{usuario.respuesta_pregunta_2}', '{usuario.respuesta_pregunta_3}')
    """
    execute_query_commit(query)
    return usuario

# Ruta para obtener todos los usuarios
@router.get("/usuarios", response_model=List[Usuario])
def obtener_usuarios():
    query = "SELECT * FROM usuario"
    result = execute_query(query)
    return result

# Ruta para actualizar un usuario específico por id
@router.put("/usuarios/{id}", response_model=Usuario)
def actualizar_usuario(id: str, usuario_actualizado: Usuario):
    query = f"""
    UPDATE usuario SET nombre_usuario = '{usuario_actualizado.nombre_usuario}', correo = '{usuario_actualizado.correo}', contraseña = '{usuario_actualizado.contraseña}', foto_perfil = '{usuario_actualizado.foto_perfil}', respuesta_pregunta_1 = '{usuario_actualizado.respuesta_pregunta_1}', respuesta_pregunta_2 = '{usuario_actualizado.respuesta_pregunta_2}', respuesta_pregunta_3 = '{usuario_actualizado.respuesta_pregunta_3}'
    WHERE id_usuario = {id}
    """
    execute_query_commit(query)
    return usuario_actualizado

# Ruta para eliminar un usuario específico por id
@router.delete("/usuarios/{id}")
def eliminar_usuario(id: str):
    query = f"DELETE FROM usuario WHERE id_usuario = {id}"
    execute_query_commit(query)
    return {"message": "Usuario eliminado exitosamente"}