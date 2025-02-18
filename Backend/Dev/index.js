const axios = require('axios');

// Token estático
const STATIC_TOKEN = "Reto5Niger";

// Función para acceder a una ruta protegida
async function accederRutaProtegida() {
    try {
        const response = await axios.get('http://localhost:8000/recetas', {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error al acceder a la ruta protegida:', error);
    }
}

// Llamar a la función para acceder a la ruta protegida
accederRutaProtegida();