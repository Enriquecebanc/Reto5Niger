const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para eliminar un ingrediente por ID
async function borrarIngrediente(id_ingrediente) {
    try {
        const response = await axios.delete(`http://localhost:8000/ingredientes/${id_ingrediente}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Ingrediente eliminado:', response.data);
    } catch (error) {
        console.error('Error al eliminar el ingrediente:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para eliminar el ingrediente
const id_ingrediente = 1; // Reemplaza con el ID del ingrediente que deseas eliminar
borrarIngrediente(id_ingrediente);