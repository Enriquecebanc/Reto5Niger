# filepath: /c:/Users/igorl/OneDrive/Desktop/Reto5Niger/Backend/API/modelos/receta.py
from pydantic import BaseModel
from typing import Optional, List

class Categoria(BaseModel):
    id_categoria: str
    nombre: str
    descripcion: str
    imagen: str