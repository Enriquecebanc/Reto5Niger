# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/rutas/usuarios.py
from fastapi import APIRouter, HTTPException
from typing import List
from modelos.usuario import Usuario

router = APIRouter()

usuarios_db: List[Usuario] = []

@router.get("/usuarios/{id}", response_model=Usuario)
def get_usuario(id: str):
    for usuario in usuarios_db:
        if usuario.id_usuario == id:
            return usuario
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

@router.post("/usuarios", response_model=Usuario)
def crear_usuario(usuario: Usuario):
    usuarios_db.append(usuario)
    return usuario

@router.get("/usuarios", response_model=List[Usuario])
def obtener_usuarios():
    return usuarios_db

@router.put("/usuarios/{id}", response_model=Usuario)
def actualizar_usuario(id: str, usuario_actualizado: Usuario):
    for i, usuario in enumerate(usuarios_db):
        if usuario.id_usuario == id:
            usuarios_db[i] = usuario_actualizado
            return usuario_actualizado
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

@router.delete("/usuarios/{id}", response_model=Usuario)
def eliminar_usuario(id: str):
    for i, usuario in enumerate(usuarios_db):
        if usuario.id_usuario == id:
            return usuarios_db.pop(i)
    raise HTTPException(status_code=404, detail="Usuario no encontrado")