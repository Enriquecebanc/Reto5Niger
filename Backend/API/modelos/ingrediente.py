from pydantic import BaseModel
from typing import Optional, List

class Ingrediente(BaseModel):
    id_ingrediente: int
    nombre_ingrediente: str
    descripcion: str
    imagen: str