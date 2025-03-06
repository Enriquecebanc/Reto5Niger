from pydantic import BaseModel
from typing import Optional, List

# Modelo de Cantidades, utilizado en las consultas e inserciones de su respectiva tabla.

class Cantidades(BaseModel):
    id_receta: int
    id_ingrediente: int
    cantidad_ingrediente: str