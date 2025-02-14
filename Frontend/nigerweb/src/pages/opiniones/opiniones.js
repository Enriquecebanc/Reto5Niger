import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './opiniones.css';

const opinionesIniciales = [
    { usuario: 'Juan', comentario: 'La tarta de queso es increíble. Muy recomendable!' },
    { usuario: 'María', comentario: 'El flan es simplemente delicioso.' },
    { usuario: 'Carlos', comentario: 'Me encantaron los espaguetis con tomate.' },
    { usuario: 'Ana', comentario: 'El pollo al ajillo estaba perfecto.' }
];

const Opiniones = () => {
    const [opiniones, setOpiniones] = useState(opinionesIniciales);
    const [usuario, setUsuario] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevaOpinion = { usuario, comentario };
        setOpiniones([nuevaOpinion, ...opiniones]);
        setUsuario('');
        setComentario('');
    };

    return (
        <div className="opiniones-container">
            <h1>Opiniones</h1>
            <div className="opiniones-section">
                <h2>Opiniones de Usuarios</h2>
                {opiniones.map((opinion, index) => (
                    <div key={index} className="opinion">
                        <h3>{opinion.usuario}</h3>
                        <p>{opinion.comentario}</p>
                    </div>
                ))}
            </div>
            <div className="opinar-section">
                <h2>Deja tu Opinión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                        className="input-field"
                    />
                    <textarea
                        placeholder="Tu opinión"
                        value={comentario}
                        onChange={(e) => setComentario(e.target.value)}
                        required
                        className="input-field"
                    ></textarea>
                    <button type="submit" className="submit-button">Enviar Opinión</button>
                </form>
            </div>
            <Link to="/">
                <button className="back-button">Volver a Inicio</button>
            </Link>
        </div>
    );
};

export default Opiniones;
