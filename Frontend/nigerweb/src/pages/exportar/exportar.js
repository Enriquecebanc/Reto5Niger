import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './exportar.css';

const Exportar = () => {
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

    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            setIdUsuario(location.state.id_usuario);
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usuariosResponse = await axios.get("http://localhost:8000/usuarios");
                setUsuarios(usuariosResponse.data);

                const categoriasResponse = await axios.get("http://localhost:8000/categorias");
                setCategorias(categoriasResponse.data);

                const ingredientesResponse = await axios.get("http://localhost:8000/ingredientes");
                setIngredientes(ingredientesResponse.data);
            } catch (err) {
                console.error("Error al obtener los datos", err);
            }
        };
        fetchData();
    }, []);

    const handleFetchRecetas = async (categoriaId, setRecetas) => {
        try {
            const response = await axios.get(`http://localhost:8000/recetas/categoria/${categoriaId}`);
            setRecetas(response.data);
        } catch (err) {
            console.error(`Error al obtener las recetas de la categoría ${categoriaId}`, err);
        }
    };

    return (
        <div className="exportar-container">
            <h1>Exportar Datos</h1>
            <p>Selecciona los datos que deseas exportar:</p>

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
                                <button onClick={() => { setShowEntrantes(!showEntrantes); handleFetchRecetas(1, setEntrantes); }} className="toggle-button">
                                    {showEntrantes ? "▼ Ocultar Entrantes" : "► Mostrar Entrantes"}
                                </button>
                                {showEntrantes && (
                                    <ul>
                                        {entrantes.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button onClick={() => { setShowPlatosPrincipales(!showPlatosPrincipales); handleFetchRecetas(2, setPlatosPrincipales); }} className="toggle-button">
                                    {showPlatosPrincipales ? "▼ Ocultar Platos Principales" : "► Mostrar Platos Principales"}
                                </button>
                                {showPlatosPrincipales && (
                                    <ul>
                                        {platosPrincipales.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button onClick={() => { setShowPlatosSecundarios(!showPlatosSecundarios); handleFetchRecetas(3, setPlatosSecundarios); }} className="toggle-button">
                                    {showPlatosSecundarios ? "▼ Ocultar Platos Secundarios" : "► Mostrar Platos Secundarios"}
                                </button>
                                {showPlatosSecundarios && (
                                    <ul>
                                        {platosSecundarios.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button onClick={() => { setShowPostres(!showPostres); handleFetchRecetas(4, setPostres); }} className="toggle-button">
                                    {showPostres ? "▼ Ocultar Postres" : "► Mostrar Postres"}
                                </button>
                                {showPostres && (
                                    <ul>
                                        {postres.map((receta) => (
                                            <li key={receta.id_receta}>
                                                {receta.nombre_receta}
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
                                <li key={ingrediente.id_ingrediente}>
                                    {ingrediente.nombre}
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

export default Exportar;