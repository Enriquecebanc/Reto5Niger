# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/rutas/comentarios.py
from fastapi import APIRouter, HTTPException
from typing import List
from modelos.comentario import Comentario

router = APIRouter()

comentarios_db: List[Comentario] = []

@router.get("/comentarios/{id}", response_model=Comentario)
def get_comentario(id: str):
    for comentario in comentarios_db:
        if comentario.id_comentario == id:
            return comentario
    raise HTTPException(status_code=404, detail="Comentario no encontrado")

@router.post("/comentarios", response_model=Comentario)
def crear_comentario(comentario: Comentario):
    comentarios_db.append(comentario)
    return comentario

@router.get("/comentarios", response_model=List[Comentario])
def obtener_comentarios():
    return comentarios_db