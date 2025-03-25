from fastapi import APIRouter, HTTPException
from typing import List
from modelos.alergeno import Alergeno
from database import execute_query, execute_query_commit


# Crear un enrutador de FastAPI para manejar las rutas relacionadas con los alérgenos
router = APIRouter()


# Ruta para obtener un alérgeno específico por id_alergeno
@router.get("/alergenos/{id_alergeno}", response_model=Alergeno)
def get_alergeno(id_alergeno: int):
    query = f"SELECT * FROM alergenos WHERE id_alergeno = {id_alergeno}"
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="Alérgeno no encontrado")
    return result[0]


# Ruta para crear un nuevo alérgeno
@router.post("/alergenos", response_model=Alergeno)
def crear_alergeno(alergeno: Alergeno):
    query = f"""
    INSERT INTO alergenos (id_ingrediente, nombre_alergeno, descripcion)
    VALUES ({alergeno.id_ingrediente}, '{alergeno.nombre_alergeno}', '{alergeno.descripcion}')
    """
    execute_query_commit(query)
    return alergeno


# Ruta para obtener todos los alérgenos
@router.get("/alergenos", response_model=List[Alergeno])
def obtener_alergenos():
    query = "SELECT * FROM alergenos"
    result = execute_query(query)
    return result


# Ruta para obtener todos los alérgenos de un ingrediente específico por id_ingrediente
@router.get("/alergenos/ingrediente/{id_ingrediente}", response_model=List[Alergeno])
def obtener_alergenos_por_ingrediente(id_ingrediente: int):
    query = f"""
    SELECT a.* FROM alergenos a
    INNER JOIN ingredientes_alergenos ia ON a.id_alergeno = ia.id_alergeno
    WHERE ia.id_ingrediente = {id_ingrediente}
    """
    result = execute_query(query)
    if not result:
        raise HTTPException(status_code=404, detail="No se encontraron alérgenos para el ingrediente")
    return result


# Ruta para actualizar un alérgeno específico por id_alergeno
@router.put("/alergenos/{id_alergeno}", response_model=Alergeno)
def actualizar_alergeno(id_alergeno: int, alergeno_actualizado: Alergeno):
    query = f"""
    UPDATE alergenos SET
    id_ingrediente = {alergeno_actualizado.id_ingrediente},
    nombre_alergeno = '{alergeno_actualizado.nombre_alergeno}',
    descripcion = '{alergeno_actualizado.descripcion}'
    WHERE id_alergeno = {id_alergeno}
    """
    execute_query_commit(query)
    return alergeno_actualizado


# Ruta para eliminar un alérgeno específico por id_alergeno
@router.delete("/alergenos/{id_alergeno}")
def eliminar_alergeno(id_alergeno: int):
    query = f"DELETE FROM alergenos WHERE id_alergeno = {id_alergeno}"
    execute_query_commit(query)
    return {"message": "Alérgeno eliminado exitosamente"}


# Ruta para asociar un alérgeno a un ingrediente en la tabla ingredientes_alergenos
@router.post("/alergenos/ingrediente/{id_ingrediente}/{id_alergeno}")
def asociar_alergeno_a_ingrediente(id_ingrediente: int, id_alergeno: int):
    query = f"""
    INSERT INTO ingredientes_alergenos (id_ingrediente, id_alergeno)
    VALUES ({id_ingrediente}, {id_alergeno})
    """
    execute_query_commit(query)
    return {"message": "Alérgeno asociado al ingrediente exitosamente"}


# Ruta para eliminar la asociación de un alérgeno con un ingrediente
@router.delete("/alergenos/ingrediente/{id_ingrediente}/{id_alergeno}")
def eliminar_asociacion_alergeno_ingrediente(id_ingrediente: int, id_alergeno: int):
    query = f"""
    DELETE FROM ingredientes_alergenos
    WHERE id_ingrediente = {id_ingrediente} AND id_alergeno = {id_alergeno}
    """
    execute_query_commit(query)
    return {"message": "Asociación entre alérgeno e ingrediente eliminada exitosamente"}