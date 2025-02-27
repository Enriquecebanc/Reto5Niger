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
    const idUsuario = location.state?.id_usuario;

    useEffect(() => {
        if (idUsuario) {
            const fetchUserProfile = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/usuarios/${idUsuario}`, {
                        headers: { 'Authorization': `Bearer Reto5Niger` },
                    });
                    setUserProfileImage(require(`../../images/${response.data.foto_perfil}.png`));
                } catch (error) {
                    console.error('Error al obtener la información del usuario:', error);
                }
            };
            fetchUserProfile();

            const fetchCategories = async () => {
                try {
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

    const categoryRoutes = ['/entrantes', '/platoPrin', '/platoSec', '/postres'];

    return (
        <div className="inicio-container">
            <div className="header-inicio">
                <img src={logoImage} alt="Logo" className="logo-image" />
                <h1>¡Bienvenido a Recetas Niger!</h1>
                {idUsuario && (
                    <Link to="/subirReceta" state={{ id_usuario: idUsuario }}>
                        <button className="upload-recipe-button">Subir Receta</button>
                    </Link>
                )}
            </div>
            <div className="perfil">
                {userProfileImage ? (
                    <img src={userProfileImage} alt="Perfil" className="profile-image" onClick={() => navigate('/perfil', { state: { id_usuario: idUsuario } })} />
                ) : (
                    <button onClick={() => navigate('/perfil', { state: { id_usuario: idUsuario } })} className="perfil-button">Mi Perfil</button>
                )}
            </div>
            <div className="salir">
                <button className="salir-button" onClick={onLogout}>Cerrar sesión</button>
            </div>
            <div>
                <img src={Tenedor} alt="Tenedor" className="iconos icono-tenedor" />
                <img src={Cuchillo} alt="Cuchillo" className="iconos icono-cuchillo" />
            </div>
            <div className="search-container">
                <input type="text" placeholder="Buscar recetas..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search-input" />
                <Link to="/ingredientes">
                    <button className="search-button">Ingredientes</button>
                </Link>
            </div>
            <div className="recipes-list">
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
