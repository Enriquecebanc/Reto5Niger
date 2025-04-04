import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import './postres.css'; // Crea un archivo postres.css

const Postres = () => {
  // Definición de estados para manejar datos y estados de la aplicación
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
  const [userProfilePics, setUserProfilePics] = useState({}); 
  const [userNames, setUserNames] = useState({}); // Para almacenar los nombres de usuario

  const location = useLocation();

  // useEffect para obtener el id del usuario desde la ubicación
  useEffect(() => {
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);

  // useEffect para obtener las recetas desde el servidor
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8000/recetas/categoria/4", {
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

  // useEffect para obtener cantidades e ingredientes de la receta actual
  useEffect(() => {
    if (recipes.length > 0) {
      const currentRecipe = recipes[currentRecipeIndex];
      fetchQuantities(currentRecipe.id_receta);
      fetchComments(currentRecipe.id_receta);
    }
  }, [currentRecipeIndex, recipes]);

  // Función para obtener las cantidades de ingredientes de una receta
  const fetchQuantities = async (id_receta) => {
    try {
      const response = await axios.get(`http://localhost:8000/cantidades/${id_receta}`, {
        headers: { Authorization: `Bearer Reto5Niger` },
      });
      setQuantities(response.data);
      response.data.forEach((quantity) => {
        fetchIngredient(quantity.id_ingrediente, quantity.cantidad_ingrediente);
      });
    } catch (err) {
      setQuantities([]);
    }
  };

  // Función para obtener los detalles de un ingrediente
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

  // Función para obtener los comentarios de una receta
  const fetchComments = async (id_receta) => {
    try {
      const response = await axios.get(`http://localhost:8000/comentarios/receta/${id_receta}`, {
        headers: { Authorization: `Bearer Reto5Niger` },
      });
      setComments(response.data);
      fetchUserProfilePics(response.data); 
    } catch (err) {
      setComments([]);
    }
  };

  // Función para obtener las fotos de perfil y nombres de usuario de los comentarios
  const fetchUserProfilePics = async (comments) => {
    try {
      const userPics = {};
      const names = {}; // Para almacenar los nombres de usuario

      for (const comment of comments) {
        const response = await axios.get(`http://localhost:8000/usuarios/${comment.id_usuario}`, {
          headers: { Authorization: `Bearer Reto5Niger` },
        });

        const photoNumber = response.data.foto_perfil;
        userPics[comment.id_usuario] = require(`../../images/${photoNumber}.png`);
        
        // Asignamos el nombre del usuario
        names[comment.id_usuario] = response.data.nombre_usuario;
      }

      setUserProfilePics(userPics);
      setUserNames(names); // Guardamos los nombres de los usuarios
    } catch (err) {
      console.error("Error al obtener las fotos de perfil y nombres de usuario", err);
    }
  };

  // Función para generar un ID de comentario aleatorio
  const generateComentarioId = () => {
    return `${Math.floor(Math.random() * 10000)}`;
  };

  // Función para manejar el envío de un nuevo comentario
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

  // Función para manejar la navegación a la siguiente receta
  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  // Función para manejar la navegación a la receta anterior
  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };
  
  // Función para manejar la valoración de la receta
  const handleRating = (newRating) => {
    setRating(newRating);
    // Aquí puedes añadir el código para guardar el valor en la bbdd
    console.log('Valoración guardada:', newRating);
  };

  // Renderizado condicional basado en el estado de carga y error
  if (loading) return <div className="loading">Cargando recetas...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="postres-container">
      <h1>Postres</h1>
      <p>Usuario ID: {idUsuario}</p>

      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button-entrante">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.nombre_receta}</h2>
          <img src={currentRecipe.imagen} alt={currentRecipe.nombre_receta} className="recipe-image" />
          
          {/* Título para la sección de Descripción */}
          <h3>Descripción:</h3>
          <p>{currentRecipe.descripcion_breve}</p>
          
          {/* Título para la sección de Instrucciones */}
          <h3>Instrucciones:</h3>
          <p>{currentRecipe.instrucciones}</p>
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

          <div className="rating-stars">
            {[...Array(rating)].map((_, starIndex) => (
              <span key={starIndex} className="active" onClick={() => handleRating(starIndex + 1)}>⭐</span>
            ))}
            {[...Array(5 - rating)].map((_, starIndex) => (
              <span key={starIndex + rating} onClick={() => handleRating(rating + starIndex + 1)}>☆</span>
            ))}
          </div>

          <textarea
            className="comentarios-input"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe un comentario..."
          />

          <button onClick={handleNewComment}>Enviar</button>

          {postError && <p className="error-message">{postError}</p>}
          <ul>
            {comments.map((comment, index) => (
              <li key={index} className="comment-item">
                {/* Mostrar la foto de perfil del autor del comentario */}
                {userProfilePics[comment.id_usuario] && (
                  <img src={userProfilePics[comment.id_usuario]} alt="Foto de perfil" />
                )}
                {/* Mostrar el nombre del usuario */}
                <div className="comment-text">
                  <strong style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                    {userNames[comment.id_usuario] || "Nombre no disponible"}
                  </strong>
                  {` - ${comment.texto}`}
                </div>
                {/* Mostrar las estrellas según la valoración */}
                <div className="rating-stars">
                  {[...Array(comment.valoracion)].map((_, starIndex) => (
                    <span key={starIndex} className="active">⭐</span>
                  ))}
                  {[...Array(5 - comment.valoracion)].map((_, starIndex) => (
                    <span key={starIndex + comment.valoracion}>☆</span>
                  ))}
                </div>
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

export default Postres;