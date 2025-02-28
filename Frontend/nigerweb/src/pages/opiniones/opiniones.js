import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado
import { Link } from 'react-router-dom'; // Importa Link para crear enlaces a otras rutas
import './opiniones.css'; // Importa el archivo de estilos CSS

// Datos iniciales de las opiniones (podrían venir de una API)
const opinionesIniciales = [
    { usuario: 'Juan', comentario: 'La tarta de queso es increíble. Muy recomendable!' },
    { usuario: 'María', comentario: 'El flan es simplemente delicioso.' },
    { usuario: 'Carlos', comentario: 'Me encantaron los espaguetis con tomate.' },
    { usuario: 'Ana', comentario: 'El pollo al ajillo estaba perfecto.' }
];

// Componente funcional Opiniones
const Opiniones = () => {
    // Estados del componente
    const [opiniones, setOpiniones] = useState(opinionesIniciales); // Estado para almacenar las opiniones, inicializado con las opinionesIniciales
    const [usuario, setUsuario] = useState(''); // Estado para almacenar el nombre del usuario que va a dejar una opinión
    const [comentario, setComentario] = useState(''); // Estado para almacenar el comentario del usuario

    // Manejador de evento para el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página al enviar el formulario
        const nuevaOpinion = { usuario, comentario }; // Crea un nuevo objeto de opinión con el usuario y el comentario
        setOpiniones([nuevaOpinion, ...opiniones]); // Agrega la nueva opinión al principio del array de opiniones
        setUsuario(''); // Limpia el campo de usuario
        setComentario(''); // Limpia el campo de comentario
    };

    // Renderiza el componente
    return (
        <div className="opiniones-container">
            <h1>Opiniones</h1>
            <div className="opiniones-section">
                <h2>Opiniones de Usuarios</h2>
                {/* Mapea el array de opiniones para mostrar cada opinión */}
                {opiniones.map((opinion, index) => (
                    <div key={index} className="opinion">
                        <h3>{opinion.usuario}</h3>
                        <p>{opinion.comentario}</p>
                    </div>
                ))}
            </div>
            <div className="opinar-section">
                <h2>Deja tu Opinión</h2>
                {/* Formulario para que el usuario deje su opinión */}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)} // Actualiza el estado del usuario al cambiar el input
                        required // El campo es obligatorio
                        className="input-field" // Aplica una clase CSS
                    />
                    <textarea
                        placeholder="Tu opinión"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)} // Actualiza el estado del comentario al cambiar el textarea
                        required // El campo es obligatorio
                        className="input-field" // Aplica una clase CSS
                    ></textarea>
                    <button type="submit" className="submit-button">Enviar Opinión</button>
                </form>
            </div>
            {/* Enlace para volver a la página de inicio */}
            <Link to="/">
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Opiniones; // Exporta el componente