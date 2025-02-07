# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Ingrediente(BaseModel):
    id_ingrediente: str
    nombre_ingrediente: str
    descripcion: str
    imagen: str