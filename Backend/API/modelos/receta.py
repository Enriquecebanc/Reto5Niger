# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Receta(BaseModel):
    id: str
    nombre: str
    ingredientes: List[str]
    instrucciones: str
    tiempo_prep: int
    dificultad: int
    imagen: str