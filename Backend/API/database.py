import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST"),
        user=os.getenv("DB_USER"),
        password=os.getenv("DB_PASSWORD"),
        database=os.getenv("DB_NAME")
    )

def execute_query(query, params=None):
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)
    try:
        print(query)
        cursor.execute(query, params)
        # connection.commit()
        print("Consulta ejecutada exitosamente")
        return cursor.fetchall()
    except Error as e:
        print(f"Error al ejecutar la consulta: {e}")
        return None
    finally:
        #cursor.close()
        connection.close()
        print("Conexión a la base de datos MySQL cerrada")