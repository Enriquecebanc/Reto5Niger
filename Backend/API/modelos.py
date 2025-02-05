from pydantic import BaseModel
from typing import Optional

class Recetas(BaseModel):
    id: str
    nombre: str
    ingredientes: str
    preparacion: str
    valoracion: Optional[int] = None