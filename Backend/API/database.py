import mysql.connector

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="1234",
        database="reto5"
    )

def get_db(query):
    data = None
    try:
        db = get_db_connection()
        db_cursor = db.cursor()
        db_cursor.execute(query)
        data = db_cursor.fetchall()
    
    finally:
        db.close()
        return data