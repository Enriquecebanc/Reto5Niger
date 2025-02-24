import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './contraseñaOlvidada.css';

const ContraseñaOlvidada = () => {
  const [email, setEmail] = useState('');
  const [respuesta1, setRespuesta1] = useState('');
  const [respuesta2, setRespuesta2] = useState('');
  const [respuesta3, setRespuesta3] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [userId, setUserId] = useState(null);
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:8000/usuarios', {
        headers: {
          'Authorization': `Bearer Reto5Niger`,
        },
      });
      const usuarios = response.data;

      const usuario = usuarios.find(user => 
        user.correo === email && 
        user.respuesta_pregunta_1 === respuesta1 && 
        user.respuesta_pregunta_2 === respuesta2 && 
        user.respuesta_pregunta_3 === respuesta3
      );

      if (usuario) {
        setUserId(usuario.id_usuario);
        setIsVerified(true);
      } else {
        setErrorMessage('Las respuestas de seguridad no coinciden.');
      }
    } catch (error) {
      console.error('Error al verificar las respuestas de seguridad:', error);
      setErrorMessage('Error al verificar las respuestas de seguridad. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const handlePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      // Obtener el id_usuario antes de actualizar la contraseña
      const response = await axios.get(`http://localhost:8000/usuarios/${userId}`, {
        headers: {
          'Authorization': `Bearer Reto5Niger`,
        },
      });
      const usuario = response.data;

      if (usuario) {
        await axios.put(`http://localhost:8000/usuarios/${usuario.id_usuario}`, {
          id_usuario: usuario.id_usuario,
          nombre_usuario: usuario.nombre_usuario,
          correo: usuario.correo,
          contraseña: newPassword,
          foto_perfil: usuario.foto_perfil,
          respuesta_pregunta_1: usuario.respuesta_pregunta_1,
          respuesta_pregunta_2: usuario.respuesta_pregunta_2,
          respuesta_pregunta_3: usuario.respuesta_pregunta_3,
        }, {
          headers: {
            'Authorization': `Bearer Reto5Niger`,
          },
        });
        console.log(`La contraseña ha sido actualizada para el usuario con ID ${usuario.id_usuario}`);
        navigate('/');
      } else {
        setErrorMessage('Usuario no encontrado.');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setErrorMessage('Error al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.');
    }
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
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