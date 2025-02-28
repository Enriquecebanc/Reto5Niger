import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado
import { Link, useNavigate } from 'react-router-dom'; // Importa Link para la navegación y useNavigate para redirigir
import axios from 'axios'; // Importa axios para realizar peticiones HTTP
import './contraseñaOlvidada.css'; // Importa el archivo de estilos CSS

// Componente funcional ContraseñaOlvidada
const ContraseñaOlvidada = () => {
  // Estados del componente
  const [email, setEmail] = useState(''); // Estado para el correo electrónico
  const [respuesta1, setRespuesta1] = useState(''); // Estado para la respuesta a la pregunta 1
  const [respuesta2, setRespuesta2] = useState(''); // Estado para la respuesta a la pregunta 2
  const [respuesta3, setRespuesta3] = useState(''); // Estado para la respuesta a la pregunta 3
  const [isVerified, setIsVerified] = useState(false); // Estado para verificar si las respuestas son correctas
  const [newPassword, setNewPassword] = useState(''); // Estado para la nueva contraseña
  const [errorMessage, setErrorMessage] = useState(''); // Estado para los mensajes de error
  const [userId, setUserId] = useState(null); // Estado para el ID del usuario
  const navigate = useNavigate(); // Hook para la navegación

  // Manejadores de eventos para los cambios en los inputs
  const handleEmailChange = (event) => {
    setEmail(event.target.value); // Actualiza el estado del correo electrónico
  };

  const handleRespuesta1Change = (event) => {
    setRespuesta1(event.target.value); // Actualiza el estado de la respuesta 1
  };

  const handleRespuesta2Change = (event) => {
    setRespuesta2(event.target.value); // Actualiza el estado de la respuesta 2
  };

  const handleRespuesta3Change = (event) => {
    setRespuesta3(event.target.value); // Actualiza el estado de la respuesta 3
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value); // Actualiza el estado de la nueva contraseña
  };

  // Manejador de evento para el envío del formulario de verificación de respuestas
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario
    try {
      // Realiza una petición GET a la API para obtener la lista de usuarios
      const response = await axios.get('http://localhost:8000/usuarios', {
        headers: {
          'Authorization': `Bearer Reto5Niger`, // Envía el token de autorización en la cabecera
        },
      });
      const usuarios = response.data; // Obtiene los datos de la respuesta

      // Busca un usuario que coincida con el correo electrónico y las respuestas de seguridad
      const usuario = usuarios.find(user => 
        user.correo === email && 
        user.respuesta_pregunta_1 === respuesta1 && 
        user.respuesta_pregunta_2 === respuesta2 && 
        user.respuesta_pregunta_3 === respuesta3
      );

      // Si se encuentra un usuario
      if (usuario) {
        setUserId(usuario.id_usuario); // Establece el ID del usuario en el estado
        setIsVerified(true); // Establece el estado de verificación a verdadero
      } else {
        setErrorMessage('Las respuestas de seguridad no coinciden.'); // Establece un mensaje de error
      }
    } catch (error) {
      console.error('Error al verificar las respuestas de seguridad:', error); // Muestra el error en la consola
      setErrorMessage('Error al verificar las respuestas de seguridad. Por favor, inténtalo de nuevo más tarde.'); // Establece un mensaje de error
    }
  };

  // Manejador de evento para el envío del formulario de cambio de contraseña
  const handlePasswordSubmit = async (event) => {
    event.preventDefault(); // Evita la recarga de la página al enviar el formulario
    try {
      // Obtiene el id_usuario antes de actualizar la contraseña
      const response = await axios.get(`http://localhost:8000/usuarios/${userId}`, {
        headers: {
          'Authorization': `Bearer Reto5Niger`,
        },
      });
      const usuario = response.data;

      // Si se encuentra el usuario
      if (usuario) {
        // Realiza una petición PUT a la API para actualizar la contraseña del usuario
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
        console.log(`La contraseña ha sido actualizada para el usuario con ID ${usuario.id_usuario}`); // Muestra un mensaje en la consola
        navigate('/'); // Redirige al usuario a la página de inicio
      } else {
        setErrorMessage('Usuario no encontrado.'); // Establece un mensaje de error
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error); // Muestra el error en la consola
      setErrorMessage('Error al actualizar la contraseña. Por favor, inténtalo de nuevo más tarde.'); // Establece un mensaje de error
    }
  };

  // Renderiza el componente
  return (
    <div className="contraseña-olvidada-container">
      <h1>Recuperar Contraseña</h1>
      {/* Si no se ha verificado, muestra el formulario de verificación */}
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
            {/* Muestra el mensaje de error si existe */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </>
      ) : (
        // Si se ha verificado, muestra el formulario de cambio de contraseña
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
            {/* Muestra el mensaje de error si existe */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <button type="submit" className="submit-button">Actualizar Contraseña</button>
          </form>
        </>
      )}
      {/* Enlace para volver a la página de inicio */}
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default ContraseñaOlvidada; // Exporta el componente