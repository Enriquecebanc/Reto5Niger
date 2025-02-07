import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './inicio.css';
import logoImage from '../../images/Logo.jpg';

const recipes = [
    { id: 1, name: 'Entrantes', description: 'Platos ligeros y apetitosos para comenzar la comida, como ensaladas, sopas o aperitivos.' },
    { id: 2, name: 'Platos Principales', description: 'Recetas sustanciosas y completas que suelen ser el eje central de la comida, como carnes, pescados o guisos.' },
    { id: 3, name: 'Segundo Plato', description: 'Opciones que complementan el plato principal, como pastas, arroces o preparaciones con verduras.' },
    { id: 4, name: 'Postres', description: 'Dulces y delicias para cerrar la comida, como tartas, helados o flanes.' },
];

const Inicio = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredRecipes = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inicio-container">
            <h1>Bienvenido a la página de recetas</h1>
            <img src={logoImage} alt="Logo" className="logo-image" />
            <input
                type="text"
                placeholder="Buscar recetas..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <button className="search-button">Buscar</button>
            <div className="navigation-links">
                <Link to="/ingredientes">
                    <button className="nav-button">Ingredientes</button>
                </Link>
                <Link to="/recetas">
                    <button className="nav-button">Recetas</button>
                </Link>
                <Link to="/opiniones">
                    <button className="nav-button">Opiniones</button>
                </Link>
            </div>
            <div className="recipes-list">
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="recipe-item">
                            <h2>{recipe.name}</h2>
                            <p>{recipe.description}</p>
                            {recipe.name === 'Postres' && (
                                <Link to="/postres">
                                    <button className="view-button">Ver Postres</button>
                                </Link>
                            )}
                            {recipe.name === 'Platos Principales' && (
                                <Link to="/platoPrin">
                                    <button className="view-button">Ver Platos Principales</button>
                                </Link>
                            )}
                            {recipe.name === 'Segundo Plato' && (
                                <Link to="/platoSec">
                                    <button className="view-button">Ver Segundos Platos</button>
                                </Link>
                            )}
                            {recipe.name === 'Entrantes' && (
                                <Link to="/entrantes">
                                    <button className="view-button">Ver Entrantes</button>
                                </Link>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No se encontraron recetas.</p>
                )}
            </div>
        </div>
    );
};

export default Inicio;