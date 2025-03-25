from pydantic import BaseModel
from typing import Optional


# Modelo de Alergeno, usado en las consultas e inserciones.
class Alergeno(BaseModel):
    id_alergeno: int
    id_ingrediente: int
    nombre_alergeno: str
    descripcion: Optional[str]
