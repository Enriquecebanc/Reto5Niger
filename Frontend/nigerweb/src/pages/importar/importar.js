import React, { useState, useEffect, useRef } from 'react'; 
import { Link, useLocation } from 'react-router-dom';
import './importar.css';
import axios from 'axios';

const Importar = () => {
    const [idUsuario, setIdUsuario] = useState(null);
    const [xmlData, setXmlData] = useState(null);
    const [categoria, setCategoria] = useState("ingredientes");
    const fileInputRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.id_usuario) {
            setIdUsuario(location.state.id_usuario);
        }
    }, [location]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(e.target.result, "application/xml");
            
            const jsonData = Array.from(xml.getElementsByTagName(categoria)).map((item) => ({
                id_ingrediente: parseInt(item.getElementsByTagName("id_ingrediente")[0]?.textContent, 10),
                nombre_ingrediente: item.getElementsByTagName("nombre_ingrediente")[0]?.textContent,
                descripcion: item.getElementsByTagName("descripcion")[0]?.textContent,
                imagen: item.getElementsByTagName("imagen")[0]?.textContent,
                
            }));
            console.log("Items extraídos del XML:", jsonData);

            console.log("Datos XML convertidos a JSON:", jsonData);

            setXmlData(jsonData);
        };
        
        reader.readAsText(file);
    };

    

const handleUpload = async () => {
    if (!xmlData) return alert("No hay datos para subir");
    console.log("JSON:", xmlData);
    try {
        for (const item of xmlData) {
            item.id_ingrediente = parseInt(item.id_ingrediente, 10); // Asegurarse de que sea un número

            const response = await axios.post(
                "http://localhost:8000/ingredientes",
                item,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer Reto5Niger`
                    }
                }
            );

            if (response.status === 200) {
                alert("Datos importados correctamente");
            } else {
                alert("Error en la importación");
            }
        }
    } catch (error) {
        console.error("Error al subir datos:", error);
        alert("Ocurrió un error al intentar importar los datos");
    }
};

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Importar Datos</h1>
                <p className="text-center mb-6">Selecciona los archivos XML que deseas importar.</p>
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    className="block w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                >
                    <option value="ingredientes">Ingredientes</option>
                    <option value="primer_plato">Primer Plato</option>
                    <option value="segundo_plato">Segundo Plato</option>
                    <option value="entrantes">Entrantes</option>
                    <option value="postre">Postre</option>
                </select>
                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".xml"
                    onChange={handleFileChange}
                    className="block w-full p-2 border-2 border-gray-300 rounded-md mb-4"
                />
                <div className="flex justify-center">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleUpload} 
                        disabled={!xmlData}
                    >
                        Importar Archivos
                    </button>
                </div>
                <Link to="/" state={{ id_usuario: idUsuario }} className="block text-center text-blue-600 mt-4">
                    Volver a Inicio
                </Link>
            </div>
        </div>
    );
};

export default Importar;
