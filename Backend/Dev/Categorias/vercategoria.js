const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para obtener una categoría por ID
async function verCategoria(id_categoria) {
    try {
        const response = await axios.get(`http://localhost:8000/categorias/${id_categoria}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Categoría obtenida:', response.data);
    } catch (error) {
        console.error('Error al obtener la categoría:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para obtener la categoría
const id_categoria = 1; // Reemplaza con el ID de la categoría que deseas obtener
verCategoria(id_categoria);