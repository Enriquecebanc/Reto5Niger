from pydantic import BaseModel
from typing import Optional, List

# Modelo de Ingredientes, utilizado en las consultas e inserciones de su respectiva tabla.

class Ingrediente(BaseModel):
    id_ingrediente: int
    nombre_ingrediente: str
    descripcion: str
    imagen: str