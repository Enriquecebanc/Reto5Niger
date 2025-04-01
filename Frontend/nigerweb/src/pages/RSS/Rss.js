import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Importar useLocation para obtener el idUsuario
import "./Rss.css";

const RSSFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState(null); // Estado para almacenar el idUsuario
  const location = useLocation(); // Obtener la ubicación actual

  useEffect(() => {
    // Obtener el idUsuario desde el estado de la ubicación
    if (location.state && location.state.id_usuario) {
      setIdUsuario(location.state.id_usuario);
    }
  }, [location]);

  useEffect(() => {
    const fetchFeed = async () => {
      setLoading(true);
      try {
        const corsProxy = "https://api.allorigins.win/get?url=";
        const feedUrl = encodeURIComponent(
          "https://susana-od.webnode.es/rss/all.xml"
        );

        const response = await fetch(`${corsProxy}${feedUrl}`);
        const data = await response.json();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        const parsedFeed = Array.from(items).map((item) => ({
          title: item.querySelector("title")?.textContent || "Sin título",
          pubDate:
            item.querySelector("updated")?.textContent || "Fecha desconocida",
          contentSnippet:
            item.querySelector("summary")?.textContent || "Sin descripción",
          link: item.querySelector("link")?.textContent || "#",
        }));

        setFeed(parsedFeed);
      } catch (error) {
        console.error("Error fetching RSS feed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeed();
  }, []);

  return (
    <div className="container">
      <h1 className="header">La Cocina Loca</h1>
      <div className="contenedor-volver-inicio">
        {/* Pasar el idUsuario al estado del Link */}
        <Link to="/" state={{ id_usuario: idUsuario }}>
          <button className="back-to-home-btn">Volver a Inicio</button>
        </Link>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <div className="feed-container">
          {feed.map((item, index) => (
            <div key={index} className="card">
              <div className="card-content">
                <h2 className="card-title">{item.title}</h2>
                <p className="card-date">{item.pubDate}</p>
                <p className="card-snippet">{item.contentSnippet}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <button className="read-more-btn">Leer más</button>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RSSFeed;