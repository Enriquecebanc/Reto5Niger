# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Receta(BaseModel):
    id_receta: str
    instrucciones: str
    tiempo: int
    personas: int
    cantidad_ingredientes: int
    imagen: str
    id_ingredientes: List[str]
    id_categoria: str
    id_comentarios: str
    nombre: str
    descripcion: str