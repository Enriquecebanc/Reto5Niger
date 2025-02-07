from pydantic import BaseModel
from typing import Optional, List

class Usuario(BaseModel):
    id_usuario: str
    nombre: str
    correo: str
    contraseña: str
    foto_perfil: str