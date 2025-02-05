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