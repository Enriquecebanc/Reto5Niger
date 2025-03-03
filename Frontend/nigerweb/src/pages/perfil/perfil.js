import React, { useState, useEffect } from 'react'; // Importa React, useState y useEffect
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importa componentes de react-router-dom
import axios from 'axios'; // Importa axios para las peticiones HTTP
import './perfil.css'; // Importa los estilos CSS

// Componente funcional Perfil
const Perfil = ({ onLogout }) => {
    // Obtiene la ubicación actual y la función de navegación
    const location = useLocation();
    const navigate = useNavigate();

    // Estado para almacenar la información del usuario
    const [user, setUser] = useState({
        id_usuario: '',
        nombre_usuario: '',
        correo: '',
        contraseña: '',
        foto_perfil: '',
        respuesta_pregunta_1: '',
        respuesta_pregunta_2: '',
        respuesta_pregunta_3: ''
    });

    // Estado para controlar qué campos están en modo de edición
    const [isEditing, setIsEditing] = useState({
        nombre_usuario: false,
        respuesta_pregunta_1: false,
        respuesta_pregunta_2: false,
        respuesta_pregunta_3: false
    });

    // Estado para controlar la visibilidad del popup de selección de imagen
    const [showImagePopup, setShowImagePopup] = useState(false);
    // Estado para almacenar la lista de imágenes disponibles
    const [availableImages, setAvailableImages] = useState([]);
    // Estado para almacenar la imagen seleccionada en el popup
    const [selectedImage, setSelectedImage] = useState(null);

    // useEffect para cargar la información del usuario y las imágenes disponibles al montar el componente
    useEffect(() => {
        // Función asíncrona para obtener la información del usuario
        const fetchUserProfile = async () => {
            try {
                // Realiza una petición GET a la API para obtener la información del usuario
                const response = await axios.get(`http://localhost:8000/usuarios/${location.state.id_usuario}`, {
                    headers: {
                        'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
                    },
                });
                setUser(response.data); // Actualiza el estado del usuario con la información obtenida
            } catch (error) {
                console.error('Error al obtener la información del usuario:', error);
            }
        };

        fetchUserProfile(); // Llama a la función para obtener la información del usuario

        // Carga las imágenes disponibles desde la carpeta 'images'
        const images = Array.from({ length: 17 }, (_, i) => require(`../../images/${i + 1}.png`));
        setAvailableImages(images); // Actualiza el estado con las imágenes disponibles
    }, [location.state.id_usuario]); // El efecto se ejecuta cuando cambia el id_usuario

    // Función para activar el modo de edición de un campo específico
    const handleEditClick = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: true // Activa el modo de edición para el campo especificado
        }));
    };

    // Función asíncrona para guardar los cambios realizados en un campo específico
    const handleSaveClick = async (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: false // Desactiva el modo de edición para el campo especificado
        }));

        // Guarda los cambios en la base de datos
        try {
            // Realiza una petición PUT a la API para actualizar la información del usuario
            await axios.put(`http://localhost:8000/usuarios/${location.state.id_usuario}`, user, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
                },
            });
        } catch (error) {
            console.error('Error al guardar los cambios del usuario:', error);
        }
    };

    // Función para actualizar el estado del usuario al cambiar un campo de entrada
    const handleChange = (e) => {
        const { name, value } = e.target; // Obtiene el nombre y el valor del campo de entrada
        setUser(prevState => ({
            ...prevState,
            [name]: value // Actualiza el estado del usuario con el nuevo valor
        }));
    };

    // Función para manejar el cambio de imagen seleccionada en el popup
    const handleImageChange = (index) => {
        setSelectedImage(index + 1); // Actualiza el estado con el índice de la imagen seleccionada
    };

    // Función asíncrona para guardar la imagen de perfil seleccionada
    const handleSaveImage = async () => {
        if (selectedImage !== null) { // Verifica que se haya seleccionado una imagen
            try {
                // Crea un nuevo objeto de usuario con la imagen de perfil actualizada
                const updatedUser = { ...user, foto_perfil: selectedImage };
                // Realiza una petición PUT a la API para actualizar la información del usuario
                await axios.put(`http://localhost:8000/usuarios/${location.state.id_usuario}`, updatedUser, {
                    headers: {
                        'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
                    },
                });
                setUser(updatedUser); // Actualiza el estado del usuario con la nueva imagen de perfil
                setShowImagePopup(false); // Cierra el popup de selección de imagen
            } catch (error) {
                console.error('Error al subir la imagen de perfil:', error);
            }
        }
    };

    // Función asíncrona para eliminar el usuario
    const handleDeleteUser = async () => {
        try {
            // Realiza una petición DELETE a la API para eliminar el usuario
            await axios.delete(`http://localhost:8000/usuarios/${location.state.id_usuario}`, {
                headers: {
                    'Authorization': `Bearer Reto5Niger`, // Incluye el token de autorización en la cabecera
                },
            });
            onLogout(); // Llama a la función de logout para limpiar la sesión
            navigate('/'); // Redirige al usuario a la página de inicio
        } catch (error) {
            console.error('Error al borrar el usuario:', error);
        }
    };

    // Renderiza el componente
    return (
        <div className="perfil-container">
            <div className="perfil-header">
                {/* Muestra la imagen de perfil del usuario */}
                {user.foto_perfil && (
                    <img src={require(`../../images/${user.foto_perfil}.png`)} alt="Profile" className="perfil-picture" onClick={() => setShowImagePopup(true)} />
                )}
                {/* Popup para seleccionar una nueva imagen de perfil */}
                {showImagePopup && (
                    <div className="image-popup">
                        <div className="image-popup-content">
                            {/* Muestra la lista de imágenes disponibles */}
                            {availableImages.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Perfil ${index + 1}`}
                                    className={`popup-image ${selectedImage === index + 1 ? 'selected' : 'unselected'}`}
                                    onClick={() => handleImageChange(index)}
                                />
                            ))}
                            {/* Botones para guardar la imagen seleccionada o cerrar el popup */}
                            <button onClick={handleSaveImage}>Guardar</button>
                            <button onClick={() => setShowImagePopup(false)}>Cerrar</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="perfil-details">
                {/* Muestra la información del usuario y permite editarla */}
                <p><strong>Correo:</strong> {user.correo}</p>
                <p><strong>Nombre:</strong>
                    {/* Si está en modo de edición, muestra un campo de entrada y un botón para guardar */}
                    {isEditing.nombre_usuario ? 
                        <><input type="text" name="nombre_usuario" value={user.nombre_usuario} onChange={handleChange} /><button onClick={() => handleSaveClick('nombre_usuario')}>Guardar</button></> : 
                        <>{user.nombre_usuario} {/* Si no está en modo de edición, muestra el valor y un botón para editar */}
                         <button onClick={() => handleEditClick('nombre_usuario')}>Editar</button></>}
                </p>
                <p><strong>¿Qué nombre tiene tu perro?:</strong>
                    {/* Si está en modo de edición, muestra un campo de entrada y un botón para guardar */}
                    {isEditing.respuesta_pregunta_1 ? 
                        <><input type="text" name="respuesta_pregunta_1" value={user.respuesta_pregunta_1} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_1')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_1} {/* Si no está en modo de edición, muestra el valor y un botón para editar */}
                        <button onClick={() => handleEditClick('respuesta_pregunta_1')}>Editar</button></>}
                </p>
                <p><strong>¿Cuál es el nombre de tu padre?:</strong>
                    {/* Si está en modo de edición, muestra un campo de entrada y un botón para guardar */}
                    {isEditing.respuesta_pregunta_2 ? 
                        <><input type="text" name="respuesta_pregunta_2" value={user.respuesta_pregunta_2} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_2')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_2} {/* Si no está en modo de edición, muestra el valor y un botón para editar */}
                         <button onClick={() => handleEditClick('respuesta_pregunta_2')}>Editar</button></>}
                </p>
                <p><strong>¿En qué año naciste?:</strong>
                    {/* Si está en modo de edición, muestra un campo de entrada y un botón para guardar */}
                    {isEditing.respuesta_pregunta_3 ? 
                        <><input type="text" name="respuesta_pregunta_3" value={user.respuesta_pregunta_3} onChange={handleChange} /><button onClick={() => handleSaveClick('respuesta_pregunta_3')}>Guardar</button></> : 
                        <>{user.respuesta_pregunta_3} {/* Si no está en modo de edición, muestra el valor y un botón para editar */}
                         <button onClick={() => handleEditClick('respuesta_pregunta_3')}>Editar</button></>}
                </p>
            </div>
            {/* Enlace para volver a la página de inicio */}
            <Link to="/" state={{ id_usuario: user.id_usuario }}>
                <button className="back-button">Volver a Inicio</button>
            </Link>
            {/* Botón para eliminar el usuario */}
            <button className="delete-button" onClick={handleDeleteUser}>Borrar Usuario</button>
        </div>
    );
};

export default Perfil; // Exporta el componente