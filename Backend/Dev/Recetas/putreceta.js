//esto sirve para actualizar
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const STATIC_TOKEN = process.env.STATIC_TOKEN;

// Función para actualizar una receta por ID
async function actualizarReceta(id_receta) {
    const recetaActualizada = {
        id_receta: id_receta,
        id_usuario: 1, // Ejemplo de ID de usuario
        nombre_receta: "Receta Actualizada",
        descripcion_breve: "Descripción breve actualizada",
        instrucciones: "Instrucciones actualizadas",
        imagen: "imagen_actualizada.jpg",
        id_categoria: 2, // Ejemplo de ID de categoría
        tiempo: 45,
        porciones: 6
    };

    try {
        const response = await axios.put(`http://localhost:8000/recetas/${id_receta}`, recetaActualizada, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Receta actualizada:', response.data);
    } catch (error) {
        console.error('Error al actualizar la receta:', error.response ? error.response.data : error.message);
    }
}

// Llamar a la función para actualizar la receta
const id_receta = 1; // Reemplaza con el ID de la receta que deseas actualizar
actualizarReceta(id_receta);