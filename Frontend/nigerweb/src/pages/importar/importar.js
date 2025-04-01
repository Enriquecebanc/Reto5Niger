import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './importar.css';

const Importar = () => {
    const [idUsuario, setIdUsuario] = useState(null);
    const [xmlData, setXmlData] = useState(null);
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
            
            const items = Array.from(xml.getElementsByTagName("item")).map((item) => ({
                id: item.getElementsByTagName("id")[0]?.textContent,
                nombre: item.getElementsByTagName("nombre")[0]?.textContent,
            }));

            setXmlData(items);
        };
        
        reader.readAsText(file);
    };

    const handleUpload = async () => {
        if (!xmlData) return alert("No hay datos para subir");

        try {
            const response = await fetch("http://localhost:5000/api/importar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(xmlData),
            });

            if (response.ok) {
                alert("Datos importados correctamente");
            } else {
                alert("Error en la importación");
            }
        } catch (error) {
            console.error("Error al subir datos:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center mb-4">Importar Datos</h1>
                <p className="text-center mb-6">Selecciona los archivos XML que deseas importar.</p>
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
