from fastapi import APIRouter, HTTPException
from typing import List
from modelos.usuario import Usuario
from database import execute_query

router = APIRouter()

@router.get("/usuarios/{id}", response_model=Usuario)
def get_usuario(id: str):
    query = "SELECT * FROM usuarios WHERE id_usuario = %s"
    params = (id,)
    result = execute_query(query, params)
    if not result:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return result[0]

@router.post("/usuarios", response_model=Usuario)
def crear_usuario(usuario: Usuario):
    query = """
    INSERT INTO usuarios (id_usuario, nombre, correo, contraseña, foto_perfil, respuesta_pregunta_1, respuesta_pregunta_2, respuesta_pregunta_3)
    VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """
    params = (
        usuario.id_usuario, usuario.nombre, usuario.correo, usuario.contraseña, usuario.foto_perfil,
        usuario.respuesta_pregunta_1, usuario.respuesta_pregunta_2, usuario.respuesta_pregunta_3
    )
    execute_query(query, params)
    return usuario

@router.get("/usuarios", response_model=List[Usuario])
def obtener_usuarios():
    query = "SELECT * FROM usuarios"
    result = execute_query(query)
    return result

@router.put("/usuarios/{id}", response_model=Usuario)
def actualizar_usuario(id: str, usuario_actualizado: Usuario):
    query = """
    UPDATE usuarios SET nombre = %s, correo = %s, contraseña = %s, foto_perfil = %s, respuesta_pregunta_1 = %s, respuesta_pregunta_2 = %s, respuesta_pregunta_3 = %s
    WHERE id_usuario = %s
    """
    params = (
        usuario_actualizado.nombre, usuario_actualizado.correo, usuario_actualizado.contraseña, usuario_actualizado.foto_perfil,
        usuario_actualizado.respuesta_pregunta_1, usuario_actualizado.respuesta_pregunta_2, usuario_actualizado.respuesta_pregunta_3, id
    )
    execute_query(query, params)
    return usuario_actualizado

@router.delete("/usuarios/{id}", response_model=Usuario)
def eliminar_usuario(id: str):
    query = "DELETE FROM usuarios WHERE id_usuario = %s"
    params = (id,)
    execute_query(query, params)
    return {"message": "Usuario eliminado exitosamente"}