from fastapi import APIRouter, HTTPException
from typing import List, Optional
from modelos.ingrediente import Ingrediente
from database import execute_query, execute_query_commit

# Crear un enrutador de FastAPI para manejar las rutas relacionadas con los ingredientes
router = APIRouter()

# Ruta para obtener un ingrediente específico por id
@router.get("/ingredientes/{id}", response_model=Ingrediente)
def get_ingrediente(id: str):
    query = f"SELECT * FROM ingredientes WHERE id_ingrediente = {id}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Ingrediente no encontrado")
    return result[0]

# Ruta para obtener un ingrediente específico por nombre
@router.get("/ingredientes/nombre/{nombre}", response_model=Optional[Ingrediente])
def get_ingrediente_nombre(nombre: str):
    query = f"SELECT * FROM ingredientes WHERE nombre_ingrediente = '{nombre}'"
    result = execute_query(query)
    if not result:
        return None
    return result[0]

# Ruta para crear un nuevo ingrediente
@router.post("/ingredientes", response_model=Ingrediente)
def crear_ingrediente(ingrediente: Ingrediente):
    query = f"""
    INSERT INTO ingredientes (id_ingrediente, nombre_ingrediente, descripcion, imagen)
    VALUES ({ingrediente.id_ingrediente}, '{ingrediente.nombre_ingrediente}', '{ingrediente.descripcion}', '{ingrediente.imagen}')
    """
    execute_query_commit(query)
    return ingrediente

# Ruta para obtener todos los ingredientes
@router.get("/ingredientes", response_model=List[Ingrediente])
def obtener_ingredientes():
    query = "SELECT * FROM ingredientes"
    result = execute_query(query)
    return result

# Ruta para actualizar un ingrediente específico por id
@router.put("/ingredientes/{id}", response_model=Ingrediente)
def actualizar_ingrediente(id: str, ingrediente_actualizado: Ingrediente):
    query = f"""
    UPDATE ingredientes SET nombre_ingrediente = '{ingrediente_actualizado.nombre_ingrediente}', descripcion = '{ingrediente_actualizado.descripcion}', imagen = '{ingrediente_actualizado.imagen}'
    WHERE id_ingrediente = {id}
    """
    execute_query_commit(query)
    return ingrediente_actualizado

# Ruta para eliminar un ingrediente específico por id
@router.delete("/ingredientes/{id}")
def eliminar_ingrediente(id: str):
    query = f"DELETE FROM ingredientes WHERE id_ingrediente = {id}"
    execute_query_commit(query)
    return {"message": "Ingrediente eliminado exitosamente"}