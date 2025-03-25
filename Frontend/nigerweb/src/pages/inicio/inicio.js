import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './inicio.css';
import logoImage from '../../images/NigerLogo.jpg';
import '../../App.js';
import Tenedor from '../../iconos/Tenedor.png';
import Cuchillo from '../../iconos/Cuchillo.png';

// Componente Inicio que representa la página de inicio con varias funcionalidades.
const Inicio = ({ user, onLogout }) => {
    const location = useLocation(); // Hook para obtener la ubicación actual.
    const navigate = useNavigate(); // Hook para la navegación programática.
    const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda.
    const [userProfileImage, setUserProfileImage] = useState(''); // Estado para la imagen de perfil del usuario.
    const [recipesCategories, setRecipesCategories] = useState([]); // Estado para las categorías de recetas.
    const idUsuario = location.state?.id_usuario; // Obtención del id de usuario desde el estado de navegación.

    // useEffect para cargar la información del usuario y las categorías al montar el componente o cambiar el idUsuario.
    useEffect(() => {
        if (idUsuario) {
            const fetchUserProfile = async () => {
                try {
                    // Petición para obtener información del usuario.
                    const response = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`, {
                        headers: { 'Authorization': `Bearer Reto5Niger` },
                    });
                    // Asignación de la imagen de perfil al estado.
                    setUserProfileImage(require(`../../images/${response.data.foto_perfil}.png`));
                } catch (error) {
                    console.error('Error al obtener la información del usuario:', error);
                }
            };
            fetchUserProfile();

            const fetchCategories = async () => {
                try {
                    // Petición para obtener las categorías de recetas.
                    const response = await axios.get('http://localhost:8000/categorias', {
                        headers: { 'Authorization': `Bearer Reto5Niger` },
                    });
                    setRecipesCategories(response.data);
                } catch (error) {
                    console.error('Error al obtener las categorías:', error);
                }
            };
            fetchCategories();
        }
    }, [idUsuario]);

    // Rutas para las diferentes categorías de recetas.
    const categoryRoutes = ['/entrantes', '/platoPrin', '/platoSec', '/postres'];

    const handleExport = () => {
        navigate('/exportar', { state: { id_usuario: idUsuario } });
    };

    const handleImport = () => {
        navigate('/importar', { state: { id_usuario: idUsuario } });
    };


    return (
        <div className="inicio-container">
            <div className="header-inicio">
                {/* Logo y mensaje de bienvenida */}
                <img src={logoImage} alt="Logo" className="logo-image" />
                <h1>¡Bienvenido a Recetas Niger!</h1>
                {idUsuario && (
                    <Link to="/subirReceta" state={{ id_usuario: idUsuario }}>
                        <button className="upload-recipe-button">Subir Receta</button>
                    </Link>
                )}
                {/* Botones de exportar e importar */}
            <div className="import-export-container">
                <button className="import-button" onClick={handleImport}>Importar Datos</button>
                <button className="export-button" onClick={handleExport}>Exportar Datos</button>
            </div>
            </div>
            <div className="perfil">
                {/* Imagen de perfil o botón para navegar al perfil */}
                {userProfileImage ? (
                    <img src={userProfileImage} alt="Perfil" className="profile-image" onClick={() => navigate('/perfil', { state: { id_usuario: idUsuario } })} />
                ) : (
                    <button onClick={() => navigate('/perfil', { state: { id_usuario: idUsuario } })} className="perfil-button">Mi Perfil</button>
                )}
            </div>
            <div className="salir">
                {/* Botón para cerrar sesión */}
                <button className="salir-button" onClick={onLogout}>Cerrar sesión</button>
            </div>
            <div>
                {/* Iconos decorativos */}
                <img src={Tenedor} alt="Tenedor" className="iconos icono-tenedor" />
                <img src={Cuchillo} alt="Cuchillo" className="iconos icono-cuchillo" />
            </div>
            <div className="search-container">
                {/* Barra de búsqueda e ir a la página de ingredientes */}
                <input type="text" placeholder="Buscar recetas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                <Link to="/ingredientes" state={{ id_usuario: idUsuario }}>
                    <button className="search-button">Ingredientes</button>
                </Link>
            </div>
            
            <div className="recipes-list">
                {/* Listado de categorías con botones para ver recetas */}
                {recipesCategories.map((category, index) => (
                    <div key={category.id} className="recipe-item">
                        <h2>{category.nombre_categoria}</h2>
                        <p>{category.descripcion}</p>
                        <Link to={categoryRoutes[index] || '/'} state={{ id_usuario: idUsuario }}>
                            <button className="view-button">Ver {category.nombre_categoria}</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inicio;