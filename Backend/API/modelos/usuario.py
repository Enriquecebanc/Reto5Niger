from pydantic import BaseModel
from typing import Optional, List

class Usuario(BaseModel):
    id_usuario: str
    nombre: str
    correo: str
    contrasena: str
    foto_perfil: Optional[str] = None
    recetas_favoritas: Optional[List[str]] = None