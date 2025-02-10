import React, { useState, useEffect } from 'react'; // Importa useEffect
import { Link } from 'react-router-dom';
import './inicio.css';
import logoImage from '../../images/Logo.jpg';

// Simulación de recetas (esto debería venir de una API o base de datos)
const allRecipes = [
    { id: 1, name: 'Tarta de Queso', description: 'Una deliciosa tarta de queso cremosa.', categoria: 'Postres', path: '/postres' },
    { id: 2, name: 'Brownie', description: 'Un bizcocho de chocolate denso y delicioso.', categoria: 'Postres', path: '/postres' },
    { id: 3, name: 'Flan', description: 'Un postre clásico de huevo y caramelo.', categoria: 'Postres', path: '/postres' },
    { id: 4, name: 'Espaguetis con Tomate', description: 'Un plato clásico de espaguetis con una salsa de tomate casera.', categoria: 'Platos Principales', path: '/platoPrin' },
    { id: 5, name: 'Pollo al Ajillo', description: 'Pollo dorado con ajo y vino blanco.', categoria: 'Segundo Platos', path: '/platoSec' },
    { id: 6, name: 'Ensalada Mixta', description: 'Una refrescante ensalada con lechuga, tomate, cebolla y atún.', categoria: 'Platos Principales', path: '/platoPrin' },
    { id: 7, name: 'Sopa de Verduras', description: 'Una sopa reconfortante con una variedad de verduras frescas.', categoria: 'Platos Principales', path: '/platoPrin' },
    { id: 8, name: 'Arroz con Leche', description: 'Un postre tradicional de arroz cocido en leche con canela.', categoria: 'Postres', path: '/postres' },
    { id: 9, name: 'Helado de chocolate', description: 'Un postre refrescante y delicioso de chocolate.', categoria: 'Postres', path: '/postres' },
    { id: 10, name: 'Crema de Calabaza', description: 'Una crema suave y dulce de calabaza con un toque de nuez moscada.', categoria: 'Platos Principales', path: '/platoPrin' },
    { id: 11, name: 'Revuelto de Setas', description: 'Un revuelto cremoso con setas variadas y huevo.', categoria: 'Platos Principales', path: '/platoPrin' },
    { id: 12, name: 'Steak a la Parrilla', description: 'Jugoso filete de ternera cocinado a la parrilla.', categoria: 'Segundo Platos', path: '/platoSec' },
    { id: 13, name: 'Paella', description: 'Un clásico plato español con arroz y mariscos..', categoria: 'Segundos Plato', path: '/platoSec' },
    { id: 14, name: 'Salmón al Horno', description: 'Salmón jugoso horneado con limón y eneldo.', categoria: 'Segundos Plato', path: '/platoSec' },
    { id: 15, name: 'Lasaña', description: 'Un delicioso plato de pasta con carne y bechamel.', categoria: 'Segundos Plato', path: '/platoSec' },
    { id: 16, name: 'Croquetas', description: 'Deliciosas croquetas crujientes por fuera y cremosas por dentro.', categoria: 'Entrantes', path: '/entrantes' },
    { id: 17, name: 'Gazpacho', description: 'Una sopa fría de tomate, perfecta para los días calurosos.', categoria: 'Entrantes', path: '/entrantes' },
    { id: 18, name: 'Patatas Bravas', description: 'Patatas fritas servidas con una salsa picante.', categoria: 'Entrantes', path: '/entrantes' },
    { id: 1, name: 'Bruschetta', description: 'Tostadas de pan con tomate, ajo y albahaca, un clásico aperitivo italiano.', categoria: 'Entrantes', path: '/entrantes' },
    { id: 1, name: 'Hummus', description: 'Un dip cremoso de garbanzos, perfecto para acompañar con pan pita.', categoria: 'Entrantes', path: '/entrantes' }
    
];

const recipesCategories = [ // Array de categorías (mantenemos esto)
    { id: 1, name: 'Entrantes', description: 'Platos ligeros y apetitosos para comenzar la comida.' },
    { id: 2, name: 'Platos Principales', description: 'Recetas sustanciosas y completas para el eje central de la comida.' },
    { id: 3, name: 'Segundo Plato', description: 'Opciones que complementan el plato principal.' },
    { id: 4, name: 'Postres', description: 'Dulces y delicias para cerrar la comida.' },
    { id: 5, name: 'PanelAdmin', description: 'Enlace al panel de administración.' }
];

const Inicio = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]); // Estado para las recetas filtradas
    const [showCategories, setShowCategories] = useState(true); // Estado para mostrar/ocultar categorías

    useEffect(() => {
        // Filtra las recetas al cargar la página (si hay un término de búsqueda)
        if (searchTerm) {
            handleSearchSubmit();
        }
    }, []); // Se ejecuta solo una vez al montar el componente

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = () => {
        const filtered = allRecipes.filter((recipe) => // Busca en allRecipes
            recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredRecipes(filtered);
        setShowCategories(false); // Oculta las categorías al buscar
    };

    const handleCategoryClick = (categoryName) => {
        // Implementa la lógica para redirigir a la página de la categoría
        // (Esto ya lo tenías, solo lo adaptamos)
        switch (categoryName) {
            case 'Postres':
                return '/postres';
            case 'Platos Principales':
                return '/platoPrin';
            case 'Segundo Plato':
                return '/platoSec';
            case 'Entrantes':
                return '/entrantes';
            case 'PanelAdmin':
                return '/panelAdmin';
            default:
                return '/'; // Página de inicio por defecto
        }
    };

    return (
        <div className="inicio-container">
            <h1>Bienvenido a la página de recetas</h1>
            <img src={logoImage} alt="Logo" className="logo-image" />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="search-input"
                />
                <button onClick={handleSearchSubmit} className="search-button">Buscar</button>
            </div>
            <div className="navigation-links">
                <Link to="/ingredientes">
                <p>Ingredientes</p>
                </Link>
                <Link to="/opiniones">
                <p>Opiniones</p>
                </Link>
            </div>

            {showCategories && (
                <div className="recipes-list">
                    {recipesCategories.map((category) => (
                        <div key={category.id} className="recipe-item">
                            <h2>{category.name}</h2>
                            <p>{category.description}</p>
                            <Link to={handleCategoryClick(category.name)}>
                                <button className="view-button">Ver {category.name}</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {!showCategories && (
                <div className="recipes-list">
                    {filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <div key={recipe.id} className="recipe-item">
                                <h2>{recipe.name}</h2>
                                <p>{recipe.description}</p>
                                <Link to={recipe.path}>
                                    <button className="view-button">Ver receta</button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No se encontraron recetas que coincidan con tu búsqueda.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Inicio;