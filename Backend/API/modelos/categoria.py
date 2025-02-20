from pydantic import BaseModel
from typing import Optional, List

class Categoria(BaseModel):
    id_categoria: int
    nombre_categoria: str
    descripcion: str
    imagen: str