# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/models.py
from pydantic import BaseModel
from typing import Optional, List

class Receta(BaseModel):
    id: int
    nombre: str
    ingredientes: str
    preparacion: str
    valoracion: Optional[int] = None