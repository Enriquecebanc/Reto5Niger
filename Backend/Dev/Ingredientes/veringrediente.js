const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para obtener un ingrediente por ID
async function verIngrediente(id_ingrediente) {
    try {
        const response = await axios.get(`http://localhost:8000/ingredientes/${id_ingrediente}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Ingrediente obtenido:', response.data);
    } catch (error) {
        console.error('Error al obtener el ingrediente:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para obtener el ingrediente
const id_ingrediente = 1; // Reemplaza con el ID del ingrediente que deseas obtener
verIngrediente(id_ingrediente);