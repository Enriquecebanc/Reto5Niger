from pydantic import BaseModel
from typing import Optional, List

# Modelo de Comentarios, utilizado en las consultas e inserciones de su respectiva tabla.

class Comentario(BaseModel):
    id_comentario: int
    id_usuario: int
    id_receta: int
    texto: str
    valoracion: int