import React from 'react';
import { Link } from 'react-router-dom';
import './ingredientes.css';

const ingredientes = [
  { categoria: 'Lácteos y derivados', items: ['Queso crema', 'Leche', 'Nata', 'Mantequilla', 'Bechamel'] },
  { categoria: 'Huevos y derivados', items: ['Huevos', 'Pan rallado'] },
  { categoria: 'Endulzantes y especias', items: ['Azúcar', 'Canela', 'Vainilla', 'Pimentón', 'Pimienta', 'Nuez moscada', 'Azafrán', 'Sal'] },
  { categoria: 'Cereales y harinas', items: ['Harina', 'Pan', 'Galletas', 'Arroz', 'Espaguetis', 'Láminas de lasaña'] },
  { categoria: 'Frutas y verduras', items: ['Tomate', 'Pepino', 'Pimiento', 'Cebolla', 'Ajo', 'Piel de limón', 'Albahaca', 'Lechuga', 'Zanahoria', 'Calabacín', 'Patata', 'Puerro', 'Calabaza', 'Romero', 'Perejil', 'Limón'] },
  { categoria: 'Legumbres y frutos secos', items: ['Garbanzos', 'Nueces', 'Tahini'] },
  { categoria: 'Carnes y pescados', items: ['Jamón', 'Pollo', 'Filete de ternera', 'Carne picada', 'Gambas', 'Mejillones', 'Salmón', 'Atún'] },
  { categoria: 'Líquidos y aceites', items: ['Aceite de oliva', 'Vinagre', 'Caldo de verduras', 'Caldo de pescado', 'Vino blanco'] },
  { categoria: 'Chocolate y derivados', items: ['Chocolate', 'Trozos de chocolate'] }
];

const Ingredientes = () => {
  return (
    <div className="ingredientes-container">
      <h1>Ingredientes</h1>
      <p>Aquí encontrarás los diferentes ingredientes que se usan para las recetas </p>
      {ingredientes.map((categoria, index) => (
        <div key={index} className="categoria">
          <h2>{categoria.categoria}</h2>
          <ul>
            {categoria.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Ingredientes;