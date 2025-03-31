import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import { Link, useLocation } from 'react-router-dom'; // Importa Link y useLocation de react-router-dom
import axios from 'axios'; // Importa axios para las peticiones HTTP
import './exportar.css'; // Importa los estilos CSS

// Componente funcional Exportar
const Exportar = () => {
    // Estado para almacenar el id del usuario
    const [idUsuario, setIdUsuario] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [showUsuarios, setShowUsuarios] = useState(false);
    const [showCategorias, setShowCategorias] = useState(false);
    const [showIngredientes, setShowIngredientes] = useState(false);
    const [showEntrantes, setShowEntrantes] = useState(false);
    const [showPlatosPrincipales, setShowPlatosPrincipales] = useState(false);
    const [showPlatosSecundarios, setShowPlatosSecundarios] = useState(false);
    const [showPostres, setShowPostres] = useState(false);
    const [entrantes, setEntrantes] = useState([]);
    const [platosPrincipales, setPlatosPrincipales] = useState([]);
    const [platosSecundarios, setPlatosSecundarios] = useState([]);
    const [postres, setPostres] = useState([]);

    // Obtener el objeto location de react-router-dom
    const location = useLocation();

    // useEffect para obtener el id del usuario desde la ubicación
    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            setIdUsuario(location.state.id_usuario);
        }
    }, [location]);

    // useEffect para obtener los datos desde el servidor
    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosResponse = await axios.get("http://localhost:8000/usuarios", {
                    headers: { Authorization: `Bearer Reto5Niger` },
                });
                setUsuarios(usuariosResponse.data);

                const categoriasResponse = await axios.get("http://localhost:8000/categorias", {
                    headers: { Authorization: `Bearer Reto5Niger` },
                });
                setCategorias(categoriasResponse.data);

                const ingredientesResponse = await axios.get("http://localhost:8000/ingredientes", {
                    headers: { Authorization: `Bearer Reto5Niger` },
                });
                setIngredientes(ingredientesResponse.data);
            } catch (err) {
                console.error("Error al obtener los datos", err);
            }
        };
        fetchData();
    }, []);

    // Función para exportar datos específicos en formato XML
    const handleExport = (data, type) => {
        // Función para convertir un objeto a XML
        const convertToXML = (obj) => {
            let xml = '';
            for (const prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    xml += `<${prop}>`;
                    if (typeof obj[prop] === 'object') {
                        xml += convertToXML(obj[prop]);
                    } else {
                        xml += obj[prop];
                    }
                    xml += `</${prop}>`;
                }
            }
            return xml;
        };

        const xmlData = `<root>${convertToXML(data)}</root>`;
        const blob = new Blob([xmlData], { type: 'application/xml' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${type}.xml`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // Función para obtener recetas de una categoría específica
    const handleFetchRecetas = async (categoriaId, setRecetas) => {
        try {
            const response = await axios.get(`http://localhost:8000/recetas/categoria/${categoriaId}`, {
                headers: { Authorization: `Bearer Reto5Niger` },
            });
            setRecetas(response.data);
        } catch (err) {
            console.error(`Error al obtener las recetas de la categoría ${categoriaId}`, err);
        }
    };

    // Renderiza el componente
    return (
        <div className="exportar-container">
            <h1>Exportar Datos</h1>
            <p>Esta es una página sencilla para exportar datos.</p>

            {/* Sección de Usuarios */}
            <div className="exportar-section">
                <button onClick={() => setShowUsuarios(!showUsuarios)} className="toggle-button">
                    {showUsuarios ? "▼ Ocultar Usuarios" : "► Mostrar Usuarios"}
                </button>
                {showUsuarios && (
                    <div className="exportar-details">
                        <h2>Usuarios</h2>
                        <ul>
                            {usuarios.map((usuario) => (
                                <li key={usuario.id_usuario}>
                                    {usuario.nombre_usuario}
                                    <button 
                                        onClick={() => handleExport(usuario, `usuario_${usuario.id_usuario}`)} 
                                        className="export-button"
                                    >
                                        Descargar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Sección de Categorías */}
            <div className="exportar-section">
                <button onClick={() => setShowCategorias(!showCategorias)} className="toggle-button">
                    {showCategorias ? "▼ Ocultar Categorías" : "► Mostrar Categorías"}
                </button>
                {showCategorias && (
                    <div className="exportar-details">
                        <h2>Categorías</h2>
                        <ul>
                            <li>
                                <button 
                                    onClick={() => { setShowEntrantes(!showEntrantes); handleFetchRecetas(1, setEntrantes); }} 
                                    className="toggle-button"
                                >
                                    {showEntrantes ? "▼ Ocultar Entrantes" : "► Mostrar Entrantes"}
                                </button>
                                {showEntrantes && (
                                    <ul>
                                        {entrantes.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                                <button 
                                                    onClick={() => handleExport(receta, `entrante_${receta.id_receta}`)} 
                                                    className="export-button"
                                                >
                                                    Descargar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button 
                                    onClick={() => { setShowPlatosPrincipales(!showPlatosPrincipales); handleFetchRecetas(2, setPlatosPrincipales); }} 
                                    className="toggle-button"
                                >
                                    {showPlatosPrincipales ? "▼ Ocultar Platos Principales" : "► Mostrar Platos Principales"}
                                </button>
                                {showPlatosPrincipales && (
                                    <ul>
                                        {platosPrincipales.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                                <button 
                                                    onClick={() => handleExport(receta, `plato_principal_${receta.id_receta}`)} 
                                                    className="export-button"
                                                >
                                                    Descargar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button 
                                    onClick={() => { setShowPlatosSecundarios(!showPlatosSecundarios); handleFetchRecetas(3, setPlatosSecundarios); }} 
                                    className="toggle-button"
                                >
                                    {showPlatosSecundarios ? "▼ Ocultar Platos Secundarios" : "► Mostrar Platos Secundarios"}
                                </button>
                                {showPlatosSecundarios && (
                                    <ul>
                                        {platosSecundarios.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                                <button 
                                                    onClick={() => handleExport(receta, `plato_secundario_${receta.id_receta}`)} 
                                                    className="export-button"
                                                >
                                                    Descargar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button 
                                    onClick={() => { setShowPostres(!showPostres); handleFetchRecetas(4, setPostres); }} 
                                    className="toggle-button"
                                >
                                    {showPostres ? "▼ Ocultar Postres" : "► Mostrar Postres"}
                                </button>
                                {showPostres && (
                                    <ul>
                                        {postres.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                                <button 
                                                    onClick={() => handleExport(receta, `postre_${receta.id_receta}`)} 
                                                    className="export-button"
                                                >
                                                    Descargar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Sección de Ingredientes */}
            <div className="exportar-section">
                <button onClick={() => setShowIngredientes(!showIngredientes)} className="toggle-button">
                    {showIngredientes ? "▼ Ocultar Ingredientes" : "► Mostrar Ingredientes"}
                </button>
                {showIngredientes && (
                    <div className="exportar-details">
                        <h2>Ingredientes</h2>
                        <ul>
                            {ingredientes.map((ingrediente) => (
                                <li key={ingrediente.id_ingrediente} className="ingrediente-item">
                                    <span>{ingrediente.nombre_ingrediente}</span>
                                    <button 
                                        onClick={() => handleExport(ingrediente, `ingrediente_${ingrediente.id_ingrediente}`)} 
                                        className="export-button"
                                    >
                                        Descargar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Enlace para volver a la página de inicio */}
            <Link to="/" state={{ id_usuario: idUsuario }}>
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Exportar; // Exporta el componente