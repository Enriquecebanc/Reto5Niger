import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir al usuario a diferentes rutas
import axios from 'axios'; // Importa axios para realizar peticiones HTTP
import './login.css'; // Importa el archivo de estilos CSS

// Componente funcional Login
const Login = ({ onLogin }) => {
    // Estados del componente
    const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [errorMessage, setErrorMessage] = useState(''); // Estado para mostrar mensajes de error
    const navigate = useNavigate(); // Hook para la navegación

    // Manejadores de eventos para los cambios en los inputs
    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Actualiza el estado del correo electrónico con el valor del input
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Actualiza el estado de la contraseña con el valor del input
    };

    // Manejador de evento para el envío del formulario
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

            // Busca un usuario que coincida con el correo electrónico y la contraseña
            const usuario = usuarios.find(user => user.correo === email && user.contraseña === password);

            // Si se encuentra un usuario
            if (usuario) {
                onLogin(email, password); // Llama a la función onLogin para indicar que el usuario ha iniciado sesión

                // Obtener la información del usuario
                const userResponse = await axios.get(`http://localhost:8000/usuarios/${usuario.id_usuario}`, {
                    headers: {
                        'Authorization': `Bearer Reto5Niger`,
                    },
                });
                const userInfo = userResponse.data; // Obtiene la información del usuario

                // Navegar a la página de inicio con la foto de perfil y el id de usuario
                navigate('/', { state: { id_usuario: usuario.id_usuario, foto_perfil: userInfo.foto_perfil } });
            } else {
                setErrorMessage('Correo o contraseña incorrectos.'); // Establece un mensaje de error
            }
        } catch (error) {
            console.error('Error al verificar el usuario:', error); // Muestra el error en la consola
            setErrorMessage('Error al verificar el usuario. Por favor, inténtalo de nuevo más tarde.'); // Establece un mensaje de error
        }
    };

    // Manejador de evento para el botón de registro
    const handleRegister = () => {
        navigate('/registro'); // Redirige al usuario a la página de registro
    };

    // Renderiza el componente
    return (
        <div className="login-container">
            <h1>Iniciar Sesión</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico (Gmail):</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="ejemplo@gmail.com"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                {/* Muestra el mensaje de error si existe */}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <button type="submit" className="login-button">Iniciar Sesión</button>
                <button type="button" className="register-button" onClick={handleRegister}>Registrar</button>
                <div className="forgot-password">
                    <a href="/contraseñaOlvidada">¿Has olvidado la contraseña?</a>
                </div>
            </form>
        </div>
    );
};

export default Login; // Exporta el componente