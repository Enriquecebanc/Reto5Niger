import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation de react-router-dom
import './importar.css'; // Importa los estilos CSS

// Componente funcional Importar
const Importar = () => {
    // Estado para almacenar el id del usuario
    const [idUsuario, setIdUsuario] = useState(null);

    // Obtener el objeto location de react-router-dom
    const location = useLocation();

    // useEffect para obtener el id del usuario desde la ubicación
    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            setIdUsuario(location.state.id_usuario);
        }
    }, [location]);

    // Renderiza el componente
    return (
        <div className="importar-container">
            <h1>Importar Datos</h1>
            <p>Esta es una página sencilla para importar datos.</p>
            {/* Enlace para volver a la página de inicio */}
            <Link to="/" state={{ id_usuario: idUsuario }}>
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Importar; // Exporta el componente