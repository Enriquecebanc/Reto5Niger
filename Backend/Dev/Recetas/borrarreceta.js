const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para eliminar una receta por ID
async function borrarReceta(id_receta) {
    try {
        const response = await axios.delete(`http://localhost:8000/recetas/${id_receta}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Receta eliminada:', response.data);
    } catch (error) {
        console.error('Error al eliminar la receta:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para eliminar la receta
const id_receta = 73575946; // Reemplaza con el ID de la receta que deseas eliminar
borrarReceta(id_receta);