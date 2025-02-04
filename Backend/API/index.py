from fastapi import FastAPI as fa

app = fa()

@app.get("/")
def index():
    return "Hola"