import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './entrantes.css';

const Entrantes = () => {
  const [recipes, setRecipes] = useState([]); // Aquí almacenamos las recetas obtenidas de la API
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de datos
  const [error, setError] = useState(null); // Para manejar posibles errores
  const [idUsuario, setIdUsuario] = useState(null); // Estado para almacenar el id_usuario

  const location = useLocation(); // Para acceder a la ubicación y los datos pasados a través del state

  // Obtener el id_usuario del estado de la ubicación
  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario); // Asignamos el id_usuario del estado
    }
  }, [location]); // Este efecto se ejecuta cuando la ubicación cambia

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/recetas/categoria/1', {
          headers: {
            'Authorization': `Bearer Reto5Niger`, // Si necesitas autorización, asegúrate de que el token sea válido
          },
        });

        setRecipes(response.data);  // Guardamos las recetas obtenidas en el estado
        setLoading(false); // Cambiamos el estado de carga a falso una vez obtenemos las recetas
      } catch (err) {
        setError('Error al obtener las recetas');
        setLoading(false); // También cambiamos el estado de carga si hay un error
      }
    };

    fetchRecipes();
  }, []); // Este efecto se ejecuta una vez cuando el componente se monta

  // Función para manejar el cambio de receta (ir a la siguiente o anterior)
  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  // Si las recetas aún están cargando, mostramos un mensaje de carga
  if (loading) {
    return <div>Cargando recetas...</div>;
  }

  // Si ocurre un error al obtener las recetas, mostramos el error
  if (error) {
    return <div>{error}</div>;
  }

  // Si las recetas están disponibles, mostramos la receta actual
  const currentRecipe = recipes[currentRecipeIndex];
  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Aquí encontrarás una variedad de entrantes.</p>
      <p>Usuario ID: {idUsuario}</p> {/* Aquí puedes mostrar el id_usuario si lo deseas */}

      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button-entrante">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.nombre_receta}</h2>
          <img src={currentRecipe.imagen} alt={currentRecipe.nombre_receta} className="recipe-image" />
          <p>{currentRecipe.descripcion_breve}</p>

          {/* Mostrar los ingredientes de la receta */}
          <div className="ingredients">
            <h3>Ingredientes:</h3>
            <ul>
              {currentRecipe.ingredientes && currentRecipe.ingredientes.length > 0 ? (
                currentRecipe.ingredientes.map((ingrediente, index) => (
                  <li key={index}>{ingrediente.nombre_ingrediente}</li>
                ))
              ) : (
                <p>No se encontraron ingredientes para esta receta.</p>
              )}
            </ul>
          </div>

          {/* Mostrar las cantidades de la receta */}
          <div className="quantities">
            <h3>Cantidades:</h3>
            <ul>
              {currentRecipe.cantidades && currentRecipe.cantidades.length > 0 ? (
                currentRecipe.cantidades.map((cantidad, index) => (
                  <li key={index}>{cantidad.cantidad} {cantidad.unidad}</li>
                ))
              ) : (
                <p>No se encontraron cantidades para esta receta.</p>
              )}
            </ul>
          </div>
        </div>
        <button onClick={handleNext} className="nav-button next-button-entrante">❯</button>
      </div>
      <Link to="/" state={{ id_usuario: location.state.id_usuario }}>
        <button className="back-button-entrantes">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Entrantes;
