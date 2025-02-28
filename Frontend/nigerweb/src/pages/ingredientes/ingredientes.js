import React from 'react';
import { Link } from 'react-router-dom';
import './ingredientes.css';

// Array que contiene las categorías de ingredientes y sus respectivos elementos con platos asociados.
const ingredientes = [
  { categoria: 'Lácteos y derivados', items: [
      { nombre: 'Queso crema', platos: ['Tarta de queso'] },
      { nombre: 'Leche', platos: ['Flan', 'Arroz con leche', 'Bechamel'] },
      { nombre: 'Nata', platos: ['Sopa de verduras', 'Crema de calabaza'] },
      { nombre: 'Mantequilla', platos: ['Brownie', 'Tarta de queso'] },
      { nombre: 'Bechamel', platos: ['Lasaña'] }
  ]},
  { categoria: 'Huevos y derivados', items: [
      { nombre: 'Huevos', platos: ['Tarta de queso', 'Flan', 'Revuelto de setas'] },
      { nombre: 'Pan rallado', platos: ['Croquetas'] }
  ]},
  { categoria: 'Endulzantes y especias', items: [
      { nombre: 'Azúcar', platos: ['Flan', 'Arroz con leche', 'Brownie', 'Tarta de queso'] },
      { nombre: 'Canela', platos: ['Arroz con leche'] },
      { nombre: 'Vainilla', platos: ['Flan', 'Helado de chocolate'] },
      { nombre: 'Pimentón', platos: ['Patatas bravas'] },
      { nombre: 'Pimienta', platos: ['Steak a la parrilla', 'Salmon al horno', 'Pollo al ajillo'] },
      { nombre: 'Nuez moscada', platos: ['Bechamel'] },
      { nombre: 'Azafrán', platos: ['Paella'] },
      { nombre: 'Sal', platos: ['Casi todos los platos'] }
  ]},
  { categoria: 'Cereales y harinas', items: [
      { nombre: 'Harina', platos: ['Croquetas', 'Lasaña'] },
      { nombre: 'Pan', platos: ['Bruschetta'] },
      { nombre: 'Galletas', platos: ['Tarta de queso'] },
      { nombre: 'Arroz', platos: ['Paella', 'Arroz con leche'] },
      { nombre: 'Espaguetis', platos: ['Espaguetis con tomate'] },
      { nombre: 'Láminas de lasaña', platos: ['Lasaña'] }
  ]},
  { categoria: 'Frutas y verduras', items: [
      { nombre: 'Tomate', platos: ['Gazpacho', 'Bruschetta', 'Espaguetis con tomate'] },
      { nombre: 'Pepino', platos: ['Gazpacho', 'Ensalada mixta'] },
      { nombre: 'Pimiento', platos: ['Gazpacho', 'Ensalada mixta', 'Paella'] },
      { nombre: 'Cebolla', platos: ['Gazpacho', 'Paella', 'Sopa de verduras'] },
      { nombre: 'Ajo', platos: ['Pollo al ajillo', 'Bruschetta', 'Hummus'] },
      { nombre: 'Piel de limón', platos: ['Arroz con leche'] },
      { nombre: 'Albahaca', platos: ['Bruschetta', 'Espaguetis con tomate'] },
      { nombre: 'Lechuga', platos: ['Ensalada mixta'] },
      { nombre: 'Zanahoria', platos: ['Sopa de verduras'] },
      { nombre: 'Calabacín', platos: ['Sopa de verduras'] },
      { nombre: 'Patata', platos: ['Patatas bravas'] },
      { nombre: 'Puerro', platos: ['Sopa de verduras'] },
      { nombre: 'Calabaza', platos: ['Crema de calabaza'] },
      { nombre: 'Romero', platos: ['Pollo al ajillo'] },
      { nombre: 'Perejil', platos: ['Pollo al ajillo'] },
      { nombre: 'Limón', platos: ['Salmon al horno'] }
  ]},
  { categoria: 'Legumbres y frutos secos', items: [
      { nombre: 'Garbanzos', platos: ['Hummus'] },
      { nombre: 'Nueces', platos: ['Brownie'] },
      { nombre: 'Tahini', platos: ['Hummus'] }
  ]},
  { categoria: 'Carnes y pescados', items: [
      { nombre: 'Jamón', platos: ['Croquetas'] },
      { nombre: 'Pollo', platos: ['Pollo al ajillo'] },
      { nombre: 'Filete de ternera', platos: ['Steak a la parrilla'] },
      { nombre: 'Carne picada', platos: ['Lasaña'] },
      { nombre: 'Gambas', platos: ['Paella'] },
      { nombre: 'Mejillones', platos: ['Paella'] },
      { nombre: 'Salmón', platos: ['Salmón al horno'] },
      { nombre: 'Atún', platos: ['Ensalada mixta'] }
  ]},
  { categoria: 'Líquidos y aceites', items: [
      { nombre: 'Aceite de oliva', platos: ['Gazpacho', 'Bruschetta', 'Patatas bravas', 'Sopa de verduras', 'Pollo al ajillo'] },
      { nombre: 'Vinagre', platos: ['Gazpacho', 'Ensalada mixta'] },
      { nombre: 'Caldo de verduras', platos: ['Sopa de verduras', 'Crema de calabaza'] },
      { nombre: 'Caldo de pescado', platos: ['Paella'] },
      { nombre: 'Vino blanco', platos: ['Paella'] }
  ]},
  { categoria: 'Chocolate y derivados', items: [
      { nombre: 'Chocolate', platos: ['Brownie', 'Helado de chocolate'] },
      { nombre: 'Trozos de chocolate', platos: ['Brownie'] }
  ]}
];

// Componente que renderiza la lista de ingredientes y sus platos asociados.
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
              <li key={idx}><strong>{item.nombre}</strong> ({item.platos.join(', ')})</li>
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
