import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="reto5"
    )

def get_db():
    db = get_db_connection()
    try:
        yield db
    finally:
        db.close()