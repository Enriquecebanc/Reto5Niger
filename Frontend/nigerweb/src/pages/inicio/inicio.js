import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './inicio.css';
import logoImage from '../../images/NigerLogo.jpg';
import '../../App.js';
import Tenedor from '../../iconos/Tenedor.png';
import Cuchillo from '../../iconos/Cuchillo.png';

const Inicio = () => {
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
    const [userProfileImage, setUserProfileImage] = useState('');
    const [recipesCategories, setRecipesCategories] = useState([]);

    useEffect(() => {
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

        if (location.state && location.state.foto_perfil) {
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

    return (
        <div className="inicio-container">
            <div className="header-inicio">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <h1>¡Bienvenido a Recetas Niger!</h1>
                <Link to="/subirReceta">
                    <button className="upload-recipe-button">Subir Receta</button>
                </Link>
            </div>
            <div className="perfil">
                <Link to="/perfil">
                    {userProfileImage ? (
                        <img src={userProfileImage} alt="Perfil" className="profile-image" />
                    ) : (
                        <button className="perfil-button">Mi Perfil</button>
                    )}
                </Link>
            </div>
            <div className="salir">
                <Link to="">
                    <button className="salir-button">Cerrar sesión</button>
                </Link>
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