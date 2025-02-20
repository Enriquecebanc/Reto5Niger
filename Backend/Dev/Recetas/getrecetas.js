const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para obtener todas las recetas
async function obtenerRecetas() {
    try {
        const response = await axios.get('http://localhost:8000/recetas', {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Recetas obtenidas:', response.data);
    } catch (error) {
        console.error('Error al obtener las recetas:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para obtener las recetas
obtenerRecetas();