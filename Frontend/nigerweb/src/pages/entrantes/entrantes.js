import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./entrantes.css";

const Entrantes = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [ingredients, setIngredients] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [postError, setPostError] = useState("");

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recetas/categoria/1", {
          headers: { Authorization: `Bearer Reto5Niger` },
        });
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener las recetas");
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  useEffect(() => {
    if (recipes.length > 0) {
      const currentRecipe = recipes[currentRecipeIndex];
      fetchQuantities(currentRecipe.id_receta);
      fetchComments(currentRecipe.id_receta);
    }
  }, [currentRecipeIndex, recipes]);

  const fetchQuantities = async (id_receta) => {
    try {
      const response = await axios.get(`http://localhost:8000/cantidades/${id_receta}`, {
        headers: { Authorization: `Bearer Reto5Niger` },
      });
      setQuantities(response.data);
      // Luego de obtener las cantidades, se obtiene el nombre de los ingredientes
      response.data.forEach((quantity) => {
        fetchIngredient(quantity.id_ingrediente, quantity.cantidad_ingrediente);
      });
    } catch (err) {
      setQuantities([]);
    }
  };

  const fetchIngredient = async (id_ingrediente, cantidad_ingrediente) => {
    try {
      if (!ingredients[id_ingrediente]) {
        const response = await axios.get(`http://localhost:8000/ingredientes/${id_ingrediente}`, {
          headers: { Authorization: `Bearer Reto5Niger` },
        });
        setIngredients((prev) => ({
          ...prev,
          [id_ingrediente]: { nombre: response.data.nombre_ingrediente, cantidad: cantidad_ingrediente },
        }));
      }
    } catch (err) {
      console.error(`Error al obtener el ingrediente ${id_ingrediente}:`, err);
    }
  };

  const fetchComments = async (id_receta) => {
    try {
      const response = await axios.get(`http://localhost:8000/comentarios/receta/${id_receta}`, {
        headers: { Authorization: `Bearer Reto5Niger` },
      });
      setComments(response.data);
    } catch (err) {
      setComments([]);
    }
  };

  const generateComentarioId = () => {
    return `${Math.floor(Math.random() * 10000)}`;
  };

  const handleNewComment = async () => {
    setPostError("");

    if (!newComment.trim()) {
      setPostError("El comentario no puede estar vacío.");
      return;
    }
    if (!idUsuario || !recipes[currentRecipeIndex]?.id_receta) {
      setPostError("Error: Falta el usuario o la receta.");
      return;
    }

    const idComentario = generateComentarioId();
    const validRating = Math.min(5, Math.max(1, rating));

    const comentarioData = {
      id_comentario: idComentario,
      id_usuario: idUsuario,
      id_receta: recipes[currentRecipeIndex]?.id_receta,
      texto: newComment,
      valoracion: validRating,
    };

    try {
      await axios.post(
        "http://localhost:8000/comentarios",
        comentarioData,
        {
          headers: { Authorization: `Bearer Reto5Niger` },
        }
      );
      setNewComment("");
      fetchComments(recipes[currentRecipeIndex].id_receta);
    } catch (err) {
      setPostError("Error al enviar el comentario. Inténtalo de nuevo.");
      console.error("Error al enviar comentario", err);
    }
  };

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  if (loading) return <div className="loading">Cargando recetas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="entrantes-container">
      <h1>Entrantes</h1>
      <p>Usuario ID: {idUsuario}</p>

      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button-entrante">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.nombre_receta}</h2>
          <img src={currentRecipe.imagen} alt={currentRecipe.nombre_receta} className="recipe-image" />
          <p>{currentRecipe.descripcion_breve}</p>
        </div>
        <button onClick={handleNext} className="nav-button next-button-entrante">❯</button>
      </div>

      <div className="recipe-item">
        <div className="ingredients-section">
          <h3>Ingredientes:</h3>
          <ul>
            {quantities.map((quantity, index) => (
              <li key={index}>
                {ingredients[quantity.id_ingrediente] ? (
                  <>
                    {ingredients[quantity.id_ingrediente].nombre} - {quantity.cantidad_ingrediente}
                  </>
                ) : (
                  "Cargando ingredientes..."
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="recipe-item">
        <div className="comments-section">
          <h3>Comentarios ({comments.length})</h3>

          <select value={rating} onChange={(e) => setRating(parseInt(e.target.value, 10))}>
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>{star} Estrellas</option>
            ))}
          </select>

          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
          />

          <button onClick={handleNewComment}>Enviar</button>

          {postError && <p className="error-message">{postError}</p>}

          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                <strong>{comment.usuario}:</strong> {comment.texto} ({comment.valoracion}⭐)
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Link to="/" state={{ id_usuario: idUsuario }}>
        <button className="back-button-entrantes">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Entrantes;
