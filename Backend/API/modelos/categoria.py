from pydantic import BaseModel
from typing import Optional, List

class Categoria(BaseModel):
    id_categoria: str
    nombre: str
    descripcion: str
    imagen: str