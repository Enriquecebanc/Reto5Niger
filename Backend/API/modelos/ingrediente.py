# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Ingrediente(BaseModel):
    id_ingrediente: str
    id_recetas: List[str]
    nombre: str
    descripcion: str
    imagen: str