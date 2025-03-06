from pydantic import BaseModel
from typing import Optional, List

# Modelo de Categorias, utilizado en las consultas e inserciones de su respectiva tabla.

class Categoria(BaseModel):
    id_categoria: int
    nombre_categoria: str
    descripcion: str
    imagen: str