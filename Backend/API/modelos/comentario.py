# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Comentario(BaseModel):
    id_comentario: str
    id_usuario: str
    id_receta: str
    texto: str
    fecha: int
    valoracion: int