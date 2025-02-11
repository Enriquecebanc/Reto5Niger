import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './contraseñaOlvidada.css';

const ContraseñaOlvidada = () => {
  const [email, setEmail] = useState('');
  const [respuesta1, setRespuesta1] = useState('');
  const [respuesta2, setRespuesta2] = useState('');
  const [respuesta3, setRespuesta3] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRespuesta1Change = (event) => {
    setRespuesta1(event.target.value);
  };

  const handleRespuesta2Change = (event) => {
    setRespuesta2(event.target.value);
  };

  const handleRespuesta3Change = (event) => {
    setRespuesta3(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para verificar las respuestas de seguridad
    const respuestasCorrectas = respuesta1 === 'respuesta_correcta1' && respuesta2 === 'respuesta_correcta2' && respuesta3 === 'respuesta_correcta3';
    setIsVerified(respuestasCorrectas);
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes agregar la lógica para actualizar la contraseña
    console.log(`La contraseña ha sido actualizada para ${email}`);
    navigate('/');
  };

  return (
    <div className="contraseña-olvidada-container">
      <h1>Recuperar Contraseña</h1>
      {!isVerified ? (
        <>
          <p>Por favor, ingresa tu correo electrónico y responde las preguntas de seguridad para recuperar tu contraseña.</p>
          <form onSubmit={handleSubmit} className="contraseña-olvidada-form">
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Correo Electrónico"
              required
            />
            <input
              type="text"
              value={respuesta1}
              onChange={handleRespuesta1Change}
              placeholder="¿Qué nombre tiene tu perro?"
              required
            />
            <input
              type="text"
              value={respuesta2}
              onChange={handleRespuesta2Change}
              placeholder="¿Cuál es el nombre de tu padre?"
              required
            />
            <input
              type="text"
              value={respuesta3}
              onChange={handleRespuesta3Change}
              placeholder="¿En qué año naciste?"
              required
            />
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </>
      ) : (
        <>
          <p>Por favor, ingresa tu nueva contraseña.</p>
          <form onSubmit={handlePasswordSubmit} className="contraseña-olvidada-form">
            <input
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              placeholder="Nueva Contraseña"
              required
            />
            <button type="submit" className="submit-button">Actualizar Contraseña</button>
          </form>
        </>
      )}
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default ContraseñaOlvidada;