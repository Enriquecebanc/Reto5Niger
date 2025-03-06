from pydantic import BaseModel
from typing import Optional, List

# Modelo de Recetas, utilizado en las consultas e inserciones de su respectiva tabla.

class Receta(BaseModel):
    id_receta: int
    id_usuario: int
    nombre_receta: str
    descripcion_breve: str
    instrucciones: str
    imagen: str
    id_categoria: int
    tiempo: int
    porciones: int