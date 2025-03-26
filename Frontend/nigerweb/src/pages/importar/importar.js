import React, { useState, useEffect, useRef } from 'react'; // Importa React, useState y useEffect
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation de react-router-dom
import './importar.css'; // Importa los estilos CSS

// Componente funcional Importar
const Importar = () => {
    // Estado para almacenar el id del usuario
    const [idUsuario, setIdUsuario] = useState(null);
    const fileInputRef = useRef(null); // Referencia al input de archivos

    // Obtener el objeto location de react-router-dom
    const location = useLocation();

    // useEffect para obtener el id del usuario desde la ubicación
    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            setIdUsuario(location.state.id_usuario);
        }
    }, [location]);

    // Función para manejar el evento de importación
    const handleFileChange = (event) => {
        const files = event.target.files;
        // Aquí puedes manejar los archivos seleccionados
        if (files.length > 0) {
            alert(`Archivos seleccionados: ${files.length}`);
        }
    };

    // Renderiza el componente
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Importar Datos</h1>
                <p className="text-center mb-6">Selecciona los archivos XML que deseas importar.</p>
                {/* Botón de importación */}
                <input
                    type="file"
                    ref={fileInputRef}
                    multiple
                    accept=".xml"
                    onChange={handleFileChange}
                    className="block w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                />
                <div className="flex justify-center">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                        Importar Archivos
                    </button>
                </div>
                {/* Enlace para volver a la página de inicio */}
                <Link to="/" state={{ id_usuario: idUsuario }} className="block text-center text-blue-600 mt-4">
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
};

export default Importar; // Exporta el componente
