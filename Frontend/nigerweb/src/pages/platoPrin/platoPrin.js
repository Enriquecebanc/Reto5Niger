import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './platoPrin.css';

const PrimerosPlatos = () => {
  const [recipes, setRecipes] = useState([]); // Recetas obtenidas de la API
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [quantities, setQuantities] = useState([]); // Cantidades de los ingredientes
  const [ingredients, setIngredients] = useState({}); // Almacenará ingredientes por ID

  const location = useLocation();

  // Obtener el id_usuario desde la ubicación
  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);

  // Obtener recetas al montar el componente
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/recetas/categoria/2', {
          headers: { 'Authorization': `Bearer Reto5Niger` },
        });

        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al obtener las recetas');
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Obtener cantidades cuando cambie la receta actual
  useEffect(() => {
    if (recipes.length > 0) {
      const currentRecipe = recipes[currentRecipeIndex];
      fetchQuantities(currentRecipe.id_receta);
    }
  }, [currentRecipeIndex, recipes]);

  // Función para obtener cantidades de la API
  const fetchQuantities = async (id_receta) => {
    try {
      const response = await axios.get(`http://localhost:8000/cantidades/${id_receta}`, {
        headers: { 'Authorization': `Bearer Reto5Niger` },
      });

      setQuantities(response.data);

      // Obtener ingredientes basados en los id_ingrediente de las cantidades
      response.data.forEach((cantidad) => {
        fetchIngredient(cantidad.id_ingrediente);
      });

    } catch (err) {
      setQuantities([]);
      console.error('Error al obtener las cantidades:', err);
    }
  };

  // Función para obtener el nombre del ingrediente por su ID
  const fetchIngredient = async (id_ingrediente) => {
    try {
      if (!ingredients[id_ingrediente]) { // Solo buscar si aún no se ha guardado
        const response = await axios.get(`http://localhost:8000/ingredientes/${id_ingrediente}`, {
          headers: { 'Authorization': `Bearer Reto5Niger` },
        });

        setIngredients((prevIngredients) => ({
          ...prevIngredients,
          [id_ingrediente]: response.data.nombre_ingrediente,
        }));
      }
    } catch (err) {
      console.error(`Error al obtener el ingrediente ${id_ingrediente}:`, err);
    }
  };

  // Cambio de recetas
  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  if (loading) return <div>Cargando recetas...</div>;
  if (error) return <div>{error}</div>;

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Aquí encontrarás una variedad de entrantes.</p>
      <p>Usuario ID: {idUsuario}</p>

      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button-entrante">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.nombre_receta}</h2>
          <img src={currentRecipe.imagen} alt={currentRecipe.nombre_receta} className="recipe-image" />
          <p>{currentRecipe.descripcion_breve}</p>

          {/* Sección de instrucciones y tiempo */}
          <div className="instructions">
            <h3>Instrucciones:</h3>
            <p>{currentRecipe.instrucciones || "No hay instrucciones disponibles."}</p>
          </div>

          <div className="time">
            <h3>Tiempo de preparación:</h3>
            <p>{currentRecipe.tiempo || "Tiempo no especificado."}</p>
          </div>

          {/* Sección de ingredientes */}
          <div className="ingredients">
            <h3>Ingredientes:</h3>
            <ul>
              {quantities.length > 0 ? (
                quantities.map((cantidad, index) => (
                  <li key={index}>
                    {ingredients[cantidad.id_ingrediente] || "Cargando..."} - {cantidad.cantidad_ingrediente}
                  </li>
                ))
              ) : (
                <p>No se encontraron ingredientes para esta receta.</p>
              )}
            </ul>
          </div>
        </div>
        <button onClick={handleNext} className="nav-button next-button-entrante">❯</button>
      </div>
      <Link to="/" state={{ id_usuario: idUsuario }}>
        <button className="back-button-entrantes">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default PrimerosPlatos;