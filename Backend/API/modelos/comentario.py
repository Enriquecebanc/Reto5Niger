from pydantic import BaseModel
from typing import Optional, List

class Comentario(BaseModel):
    id_comentario: str
    id_usuario: str
    id_receta: str
    texto: str
    fecha: int
    valoracion: int