const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log(STATIC_TOKEN)
// Función para obtener una receta por ID
async function obtenerReceta() {
    try {
        const response = await axios.get(`http://localhost:8000/recetas/1`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Receta obtenida:', response.data);
    } catch (error) {
        console.error('Error al obtener la receta:', error.response ? error.response.data : error.message);
    }
}
obtenerReceta();