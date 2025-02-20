const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para actualizar un ingrediente por ID
async function actualizarIngrediente(id_ingrediente) {
    const ingredienteActualizado = {
        id_ingrediente: id_ingrediente,
        nombre_ingrediente: "Ingrediente Actualizado",
        descripcion: "Descripción actualizada del ingrediente",
        imagen: "imagen_actualizada.jpg" // Ejemplo de nombre de imagen actualizada
    };

    try {
        const response = await axios.put(`http://localhost:8000/ingredientes/${id_ingrediente}`, ingredienteActualizado, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Ingrediente actualizado:', response.data);
    } catch (error) {
        console.error('Error al actualizar el ingrediente:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para actualizar el ingrediente
const id_ingrediente = 1; // Reemplaza con el ID del ingrediente que deseas actualizar
actualizarIngrediente(id_ingrediente);