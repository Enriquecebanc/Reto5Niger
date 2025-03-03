import React, { useState } from 'react'; // Importa React y el hook useState
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirigir al usuario
import ReCAPTCHA from 'react-google-recaptcha'; // Importa el componente ReCAPTCHA de react-google-recaptcha
import axios from 'axios'; // Importa axios para realizar peticiones HTTP
import './registro.css'; // Importa los estilos CSS

// Componente funcional Registro
const Registro = () => {
    // Estados del componente
    const [nombre, setNombre] = useState(''); // Estado para almacenar el nombre
    const [email, setEmail] = useState(''); // Estado para almacenar el correo electrónico
    const [password, setPassword] = useState(''); // Estado para almacenar la contraseña
    const [fotoPerfil, setFotoPerfil] = useState(''); // Estado para almacenar la foto de perfil
    const [respuesta1, setRespuesta1] = useState(''); // Estado para almacenar la respuesta a la pregunta 1
    const [respuesta2, setRespuesta2] = useState(''); // Estado para almacenar la respuesta a la pregunta 2
    const [respuesta3, setRespuesta3] = useState(''); // Estado para almacenar la respuesta a la pregunta 3
    const [captchaValue, setCaptchaValue] = useState(null); // Estado para almacenar el valor del reCAPTCHA
    const navigate = useNavigate(); // Hook para la navegación

    // Manejadores de eventos para los cambios en los inputs
    const handleNombreChange = (event) => {
        setNombre(event.target.value); // Actualiza el estado del nombre con el valor del input
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value); // Actualiza el estado del correo electrónico con el valor del input
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value); // Actualiza el estado de la contraseña con el valor del input
    };

    const handleFotoPerfilChange = (index) => {
        setFotoPerfil(index + 1); // Actualiza el estado de la foto de perfil con el índice de la imagen seleccionada
    };

    const handleRespuesta1Change = (event) => {
        setRespuesta1(event.target.value); // Actualiza el estado de la respuesta 1 con el valor del input
    };

    const handleRespuesta2Change = (event) => {
        setRespuesta2(event.target.value); // Actualiza el estado de la respuesta 2 con el valor del input
    };

    const handleRespuesta3Change = (event) => {
        setRespuesta3(event.target.value); // Actualiza el estado de la respuesta 3 con el valor del input
    };

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value); // Actualiza el estado del valor del reCAPTCHA con el valor proporcionado
    };

    // Función para generar un ID único de 8 dígitos
    const generateId = () => {
        return Math.floor(Math.random() * 100000000); // Genera un número aleatorio de 8 dígitos
    };

    // Manejador de evento para el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita la recarga de la página al enviar el formulario
        if (!captchaValue) { // Si el reCAPTCHA no ha sido verificado
            alert('Por favor, verifica que no eres un robot.'); // Muestra una alerta
            return; // Detiene la ejecución de la función
        }

        // Crea un objeto con la información del nuevo usuario
        const nuevoUsuario = {
            id_usuario: generateId(), // Genera un ID aleatorio de 8 dígitos
            nombre_usuario: nombre, // Asigna el nombre
            correo: email, // Asigna el correo electrónico
            contraseña: password, // Asigna la contraseña
            foto_perfil: parseInt(fotoPerfil), // Asegúrate de que foto_perfil sea un número entero
          respuesta_pregunta_1: respuesta1, // Asigna la respuesta a la pregunta 1
            respuesta_pregunta_2: respuesta2, // Asigna la respuesta a la pregunta 2
            respuesta_pregunta_3: respuesta3 // Asigna la respuesta a la pregunta 3
        };

        // Agregar console.log para verificar los datos
        console.log('Nuevo Usuario:', nuevoUsuario);

        try {
            // Realiza una petición POST a la API para registrar el usuario
            const response = await axios.post('http://localhost:8000/usuarios', nuevoUsuario, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
                },
            });

            console.log('Usuario registrado:', response.data); // Muestra la información del usuario registrado en la consola
            navigate('/'); // Redirige al usuario a la página de inicio
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message); // Muestra el error en la consola
        }
    };

    // Genera un array con las imágenes de perfil disponibles
    const imagenes = Array.from({ length: 17 }, (_, i) => require(`../../images/${i + 1}.png`));

    // Renderiza el componente
    return (
        <div className="registro-container">
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit} className="registro-form">
                {/* Campos del formulario */}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                        placeholder="Nombre"
                        required // El campo es obligatorio
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="ejemplo@gmail.com"
                        required // El campo es obligatorio
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
                        required // El campo es obligatorio
                    />
                </div>
                <div className="form-group">
                    <label>Elige una Foto de Perfil:</label>
                    <div className="registro-image-selection">
                        {/* Muestra la lista de imágenes de perfil */}
                        {imagenes.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Perfil ${index + 1}`}
                                className={`registro-profile-image ${fotoPerfil === index + 1 ? 'selected' : ''}`} // Aplica la clase "selected" si la imagen está seleccionada
                                onClick={() => handleFotoPerfilChange(index)} // Llama a la función al hacer clic en la imagen
                            />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="respuesta1">¿Qué nombre tiene tu perro?</label>
                    <input
                        type="text"
                        id="respuesta1"
                        value={respuesta1}
                        onChange={handleRespuesta1Change}
                        placeholder="Respuesta"
                        required // El campo es obligatorio
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respuesta2">¿Cuál es el nombre de tu padre?</label>
                    <input
                        type="text"
                        id="respuesta2"
                        value={respuesta2}
                        onChange={handleRespuesta2Change}
                        placeholder="Respuesta"
                        required // El campo es obligatorio
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="respuesta3">¿En qué año naciste?</label>
                    <input
                        type="text"
                        id="respuesta3"
                        value={respuesta3}
                        onChange={handleRespuesta3Change}
                        placeholder="Respuesta"
                        required // El campo es obligatorio
                    />
                </div>
                {/* Componente ReCAPTCHA */}
                <div className="form-group">
                    <ReCAPTCHA
                        sitekey="6Ld3qNIqAAAAAPxKh6xwjGu5eTBOLTweubWkbqLA" // Reemplaza con tu nueva clave de sitio de reCAPTCHA
                        onChange={handleCaptchaChange} // Llama a la función al cambiar el valor del reCAPTCHA
                    />
                </div>
                {/* Botón para registrar */}
                <button type="submit" className="registro-button">Registrar</button>
            </form>
        </div>
    );
};

export default Registro; // Exporta el componente