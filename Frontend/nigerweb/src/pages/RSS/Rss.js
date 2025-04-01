import React, { useEffect, useState } from "react";
import "./Rss.css";

const RSSFeed = () => {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

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
          title: item.querySelector("title")?.textContent || "Sin tÃ­tulo",
          pubDate:
            item.querySelector("updated")?.textContent || "Fecha desconocida",
          contentSnippet:
            item.querySelector("summary")?.textContent || "Sin descripciÃ³n",
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
                  <button className="read-more-btn">Leer mÃ¡s</button>
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