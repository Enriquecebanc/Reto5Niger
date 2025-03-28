import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./alergenos.css";


const Alergenos = () => {
  const location = useLocation();
  const idUsuario = location.state?.id_usuario; // Obtener el id del usuario desde el estado de navegación
  const [allergens, setAllergens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // useEffect para obtener los alérgenos desde el servidor
  useEffect(() => {
    const fetchAllergens = async () => {
      try {
        const response = await axios.get("http://localhost:8000/alergenos", {
          headers: { Authorization: `Bearer Reto5Niger` },
        });
        setAllergens(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los alérgenos");
        setLoading(false);
      }
    };
    fetchAllergens();
  }, []);


  // Renderizado condicional basado en el estado de carga y error
  if (loading) return <div className="loading">Cargando alérgenos...</div>;
  if (error) return <div className="error-message">{error}</div>;


  return (
    <div className="alergenos-container">
      <h1>Lista de Alérgenos</h1>
      <ul className="alergenos-list">
        {allergens.map((alergeno) => (
          <li key={alergeno.id_alergeno} className="alergeno-item">
            <h3>{alergeno.nombre_alergeno}</h3>
            <p>{alergeno.descripcion || "Sin descripción"}</p>
          </li>
        ))}
      </ul>
      <Link to="/" state={{ id_usuario: idUsuario }}>
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};


export default Alergenos;