from pydantic import BaseModel
from typing import Optional, List

# Modelo de Usuarios, utilizado en las consultas e inserciones de su respectiva tabla.

class Usuario(BaseModel):
    id_usuario: int
    nombre_usuario: str
    correo: str
    contraseña: str
    foto_perfil: int
    respuesta_pregunta_1: str
    respuesta_pregunta_2: str
    respuesta_pregunta_3: str