import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import './registro.css';

const Registro = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [captchaValue, setCaptchaValue] = useState(null);
    const navigate = useNavigate();

    const handleNombreChange = (event) => {
        setNombre(event.target.value);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleFotoPerfilChange = (src) => {
        setFotoPerfil(src);
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

    const handleCaptchaChange = (value) => {
        setCaptchaValue(value);
    };

    // Función para generar un ID único de 8 dígitos
    const generateId = () => {
        return Math.floor(Math.random() * 100000000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!captchaValue) {
            alert('Por favor, verifica que no eres un robot.');
            return;
        }

        const nuevoUsuario = {
            id_usuario: generateId(), // Generar un ID aleatorio de 8 dígitos
            nombre_usuario: nombre,
            correo: email,
            contraseña: password,
            foto_perfil: parseInt(fotoPerfil), // Asegúrate de que foto_perfil sea un número entero
            respuesta_pregunta_1: respuesta1,
            respuesta_pregunta_2: respuesta2,
            respuesta_pregunta_3: respuesta3
        };

        // Agregar console.log para verificar los datos
        console.log('Nuevo Usuario:', nuevoUsuario);

        try {
            const response = await axios.post('http://localhost:8000/usuarios', nuevoUsuario, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`,
                },
            });

            console.log('Usuario registrado:', response.data);
            navigate('/');
        } catch (error) {
            console.error('Error al registrar el usuario:', error.response ? error.response.data : error.message);
        }
    };

    const imagenes = Array.from({ length: 17 }, (_, i) => require(`../../images/${i + 1}.png`));

    return (
        <div className="registro-container">
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit} className="registro-form">
                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={handleNombreChange}
                        placeholder="Nombre"
                        required
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
                <div className="form-group">
                    <label>Elige una Foto de Perfil:</label>
                    <div className="image-selection">
                        {imagenes.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                alt={`Perfil ${index + 1}`}
                                className={`profile-image ${fotoPerfil === src ? 'selected' : ''}`}
                                onClick={() => handleFotoPerfilChange(index + 1)} // Asegúrate de que foto_perfil sea un número entero
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
                        required
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
                        required
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
                        required
                    />
                </div>
                <div className="form-group">
                    <ReCAPTCHA
                        sitekey="6Ld3qNIqAAAAAPxKh6xwjGu5eTBOLTweubWkbqLA" // Reemplaza con tu nueva clave de sitio de reCAPTCHA
                        onChange={handleCaptchaChange}
                    />
                </div>
                <button type="submit" className="registro-button">Registrar</button>
            </form>
        </div>
    );
};

export default Registro;