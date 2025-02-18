from pydantic import BaseModel
from typing import Optional, List

class Usuario(BaseModel):
    id_usuario: str
    nombre: str
    correo: str
    contraseña: str
    foto_perfil: int
    respuesta_pregunta_1: str
    respuesta_pregunta_2: str
    respuesta_pregunta_3: str