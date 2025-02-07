# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Receta(BaseModel):
    id_receta: str
    instrucciones: str
    tiempo: int
    porciones: int
    imagen: str
    id_categoria: str
    nombre: str
    descripcion: str