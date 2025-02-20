const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;

// Función para generar un ID único de 8 dígitos
const generateId = () => {
    return Math.floor(Math.random() * 100000000);
};

// Función para crear una nueva receta
async function crearReceta() {
    const nuevaReceta = {
        id_receta: generateId(),
        id_usuario: 1, // Ejemplo de ID de usuario
        nombre_receta: "Receta de Prueba",
        descripcion_breve: "Descripción breve de prueba",
        instrucciones: "Instrucciones de prueba",
        imagen: "imagen.jpg",
        id_categoria: 1, // Ejemplo de ID de categoría
        tiempo: 30,
        porciones: 4
    };

    try {
        const response = await axios.post('http://localhost:8000/recetas', nuevaReceta, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Receta creada:', response.data);
        return response.data.id_receta;
    } catch (error) {
        console.error('Error al crear la receta:', error.response ? error.response.data : error.message);
    }
}

// Función principal para crear y obtener una receta
async function main() {
    await crearReceta();
}

// Llamar a la función principal
main();