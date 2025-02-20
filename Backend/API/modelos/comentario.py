from pydantic import BaseModel
from typing import Optional, List

class Comentario(BaseModel):
    id_comentario: int
    id_usuario: int
    id_receta: int
    texto: str
    valoracion: int