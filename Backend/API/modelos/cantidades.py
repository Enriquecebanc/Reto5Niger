from pydantic import BaseModel
from typing import Optional, List

class Cantidades(BaseModel):
    id_receta: int
    id_ingrediente: int
    cantidad_ingrediente: str