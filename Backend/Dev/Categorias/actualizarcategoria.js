const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;
console.log('STATIC_TOKEN:', STATIC_TOKEN); // Verificar que el token se haya cargado correctamente

// Función para actualizar una categoría por ID
async function actualizarCategoria(id_categoria) {
    const categoriaActualizada = {
        id_categoria: id_categoria,
        nombre_categoria: "Categoría Actualizada",
        descripcion: "Descripción actualizada de la categoría",
        imagen: "imagen_actualizada.jpg" // Ejemplo de nombre de imagen actualizada
    };

    try {
        const response = await axios.put(`http://localhost:8000/categorias/${id_categoria}`, categoriaActualizada, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Categoría actualizada:', response.data);
    } catch (error) {
        console.error('Error al actualizar la categoría:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para actualizar la categoría
const id_categoria = 26880738; // Reemplaza con el ID de la categoría que deseas actualizar
actualizarCategoria(id_categoria);