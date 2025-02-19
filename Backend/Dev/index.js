const axios = require('axios');
const dotenv = require('dotenv');

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

// Token estático
const STATIC_TOKEN = process.env.STATIC_TOKEN;

// Función para generar un ID único de 8 dígitos
const generateId = () => {
    return Math.random().toString(36).substr(2, 8);
};

// Función para crear una nueva receta
async function crearReceta() {
    const nuevaReceta = {
        id_receta: generateId(),
        nombre: "Receta de Prueba",
        instrucciones: "Instrucciones de prueba",
        tiempo: 30,
        porciones: 4,
        imagen: "imagen.jpg",
        id_categoria: "cat123",
        descripcion: "Descripción de prueba"
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

// Función para obtener una receta por ID
async function obtenerReceta(id_receta) {
    try {
        const response = await axios.get(`http://localhost:8000/recetas/${id_receta}`, {
            headers: {
                'Authorization': `Bearer ${STATIC_TOKEN}`,
            },
        });

        console.log('Receta obtenida:', response.data);
    } catch (error) {
        console.error('Error al obtener la receta:', error.response ? error.response.data : error.message);
    }
}

// Función principal para crear y obtener una receta
async function main() {
    const id_receta = await crearReceta();
    if (id_receta) {
        await obtenerReceta(id_receta);
    }
}

// Llamar a la función principal
main();