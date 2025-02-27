import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './inicio.css';
import logoImage from '../../images/NigerLogo.jpg';
import '../../App.js';
import Tenedor from '../../iconos/Tenedor.png';
import Cuchillo from '../../iconos/Cuchillo.png';

const Inicio = ({ user, onLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [userProfileImage, setUserProfileImage] = useState('');
    const [recipesCategories, setRecipesCategories] = useState([]);

    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            // Obtener la información del usuario
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/usuarios/${location.state.id_usuario}`, {
                        headers: {
                            'Authorization': `Bearer Reto5Niger`,
                        },
                    });
                    const usuario = response.data;
                    const profileImage = require(`../../images/${usuario.foto_perfil}.png`); // Importar la imagen
                    setUserProfileImage(profileImage);
                } catch (error) {
                    console.error('Error al obtener la información del usuario:', error);
                }
            };

            if (location.state.foto_perfil) {
                const profileImage = require(`../../images/${location.state.foto_perfil}.png`); // Importar la imagen
                setUserProfileImage(profileImage);
            } else {
                fetchUserProfile();
            }

            // Obtener las categorías de recetas
            const fetchCategories = async () => {
                try {
                    const response = await axios.get('http://localhost:8000/categorias', {
                        headers: {
                            'Authorization': `Bearer Reto5Niger`,
                        },
                    });
                    setRecipesCategories(response.data);
                } catch (error) {
                    console.error('Error al obtener las categorías:', error);
                }
            };

            fetchCategories();
        } else {
            console.error('No se encontró id_usuario en el estado de la ubicación.');
        }
    }, [location.state]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryClick = (categoryName) => {
        switch (categoryName) {
            case 'Postres':
                return '/postres';
            case 'Primer Plato':
                return '/platoPrin';
            case 'Segundo Plato':
                return '/platoSec';
            case 'Entrantes':
                return '/entrantes';
            case 'PanelAdmin':
                return '/panelAdmin';
            default:
                return '/';
        }
    };

    const handleProfileClick = () => {
        if (location.state && location.state.id_usuario) {
            navigate('/perfil', { state: { id_usuario: location.state.id_usuario } });
        } else {
            console.error('No se encontró id_usuario en el estado de la ubicación.');
        }
    };

    const handleLogout = () => {
        onLogout();
        navigate('/');
    };

    return (
        <div className="inicio-container">
            <div className="header-inicio">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <h1>¡Bienvenido a Recetas Niger!</h1>
                {location.state && location.state.id_usuario ? (
                    <Link to="/subirReceta" state={{ id_usuario: location.state.id_usuario }}>
                        <button className="upload-recipe-button">Subir Receta</button>
                    </Link>
                ) : (
                    <button className="upload-recipe-button" disabled>Subir Receta</button>
                )}
            </div>
            <div className="perfil"> 
                {userProfileImage ? (
                    <img src={userProfileImage} alt="Perfil" className="profile-image" onClick={handleProfileClick} />
                ) : (
                    <button onClick={handleProfileClick} className="perfil-button">Mi Perfil</button>
                )}
            </div>
            <div className="salir">
                <button className="salir-button" onClick={handleLogout}>Cerrar sesión</button>
            </div>
            <div>
                <img src={Tenedor} alt="Tenedor" className="iconos icono-tenedor" />
                <img src={Cuchillo} alt="Cuchillo" className="iconos icono-cuchillo" />
            </div>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <Link to="/ingredientes">
                    <button className="search-button">Ingredientes</button>
                </Link>
            </div>

            <div className="recipes-list">
                {recipesCategories.map((category) => (
                    <div key={category.id} className="recipe-item">
                        <h2>{category.nombre_categoria}</h2>
                        <p>{category.descripcion}</p>
                        <Link to={handleCategoryClick(category.nombre_categoria)}>
                            <button className="view-button">Ver {category.nombre_categoria}</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Inicio;