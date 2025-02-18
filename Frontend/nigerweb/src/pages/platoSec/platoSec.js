import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './platoSec.css';
import steakImage from '../../images/Steak.jpg';
import paellaImage from '../../images/Paella.jpg';
import salmonImage from '../../images/Salmon.jpg';
import lasañaImage from '../../images/Lasaña.jpg';
import polloajoImage from '../../images/Polloajo.jpg';

const recipes = [
  {
    id: 1,
    name: 'Steak a la Parrilla',
    description: (
        <>
            <strong>🕔 30 minutos</strong> | <strong>2 personas</strong> | Jugoso filete de ternera cocinado a la parrilla.
        </>
    ),
    ingredients: [
        '2 filetes de ternera (200g cada uno)',
        '1 cucharadita de sal',
        '1/2 cucharadita de pimienta negra',
        '1 cucharada de aceite de oliva',
        '2 dientes de ajo picados',
        '2 ramitas de romero fresco'
    ],
    instructions: [
        'Sazona el filete con sal, pimienta y ajo picado. (2 mins)',
        'Calienta la parrilla y unta con aceite de oliva. (5 mins)',
        'Cocina el filete durante 3-4 minutos por cada lado. (8 mins)',
        'Deja reposar unos minutos antes de servir con romero. (5 mins)'
    ],
    image: steakImage
},

{
  id: 2,
  name: 'Paella',
  description: (
    <>
      <strong>🕔 50 minutos</strong> | <strong>4 personas</strong> | Un clásico plato español con arroz y mariscos.
    </>
  ),
  ingredients: [
    '300g de arroz',
    '200g de gambas',
    '150g de mejillones',
    '200g de pollo',
    '1 pimiento rojo',
    '1 pizca de azafrán',
    '800ml de caldo de pescado'
  ],
  instructions: [
    'Sofríe el pollo y los pimientos en una paellera. (10 mins)',
    'Añade el arroz y sofríelo unos minutos. (5 mins)',
    'Vierte el caldo de pescado y el azafrán. (2 mins)',
    'Cocina a fuego medio y agrega los mariscos al final. (25 mins)',
    'Deja reposar antes de servir. (8 mins)'
  ],
  image: paellaImage
},
{
  id: 3,
  name: 'Salmón al Horno',
  description: (
    <>
      <strong>🕔 25 minutos</strong> | <strong>2 personas</strong> | Salmón jugoso horneado con limón y eneldo.
    </>
  ),
  ingredients: [
    '2 filetes de salmón (150g cada uno)',
    '1 limón',
    '1 cucharada de eneldo',
    '1 cucharada de aceite de oliva',
    '1/2 cucharadita de sal',
    '1/4 cucharadita de pimienta'
  ],
  instructions: [
    'Precalienta el horno a 180°C. (5 mins)',
    'Coloca el salmón en una bandeja para hornear. (2 mins)',
    'Rocía con aceite de oliva, sal, pimienta y jugo de limón. (3 mins)',
    'Hornea durante 12-15 minutos. (15 mins)',
    'Sirve con eneldo fresco por encima. (5 mins)'
  ],
  image: salmonImage
},
{
  id: 4,
  name: 'Lasaña',
  description: (
    <>
      <strong>🕔 1 hora</strong> | <strong>6 personas</strong> | Un delicioso plato de pasta con carne y bechamel.
    </>
  ),
  ingredients: [
    '12 láminas de lasaña',
    '400g de carne picada',
    '200g de tomate triturado',
    '1 cebolla picada',
    '150g de queso rallado',
    '500ml de bechamel'
  ],
  instructions: [
    'Sofríe la carne con cebolla y tomate. (15 mins)',
    'Cocina la bechamel y reserva. (10 mins)',
    'En una bandeja, alterna capas de pasta, carne y bechamel. (10 mins)',
    'Cubre con queso rallado y hornea a 180°C durante 30 minutos. (30 mins)',
    'Deja reposar antes de servir. (5 mins)'
  ],
  image: lasañaImage
},
{
  id: 5,
  name: 'Pollo al Ajillo',
  description: (
    <>
      <strong>🕔 40 minutos</strong> | <strong>3 personas</strong> | Pollo dorado con ajo y vino blanco.
    </>
  ),
  ingredients: [
    '500g de pollo',
    '4 dientes de ajo',
    '2 cucharadas de aceite de oliva',
    '100ml de vino blanco',
    '1 cucharada de perejil picado',
    '1/2 cucharadita de sal',
    '1/4 cucharadita de pimienta'
  ],
  instructions: [
    'Corta el pollo en trozos y sazona con sal y pimienta. (5 mins)',
    'Sofríe el ajo en aceite de oliva y añade el pollo. (10 mins)',
    'Dora bien el pollo por todos los lados. (10 mins)',
    'Añade el vino blanco y cocina a fuego lento hasta reducir. (10 mins)',
    'Sirve con perejil fresco. (5 mins)'
  ],
  image: polloajoImage
}
];

const Segundos = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="segundos-container">
      <h1>Segundos Platos</h1>
      <p>Aquí encontrarás una variedad de segundos platos.</p>
      <div className="recipe-item">
        <button onClick={handlePrev} className="nav-button prev-button">❮</button>
        <div className="recipe-content">
          <h2>{currentRecipe.name}</h2>
          <img src={currentRecipe.image} alt={currentRecipe.name} className="recipe-image" />
          <p>{currentRecipe.description}</p>
          <h3>Ingredientes:</h3>
          <ul>
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instrucciones:</h3>
          <ol>
            {currentRecipe.instructions.map((instruction, index) => (
              <li key={index}>{instruction}</li>
            ))}
          </ol>
        </div>
        <button onClick={handleNext} className="nav-button next-button">❯</button>
      </div>
      <Link to="/">
        <button className="back-button">Volver a Inicio</button>
      </Link>
    </div>
  );
};

export default Segundos;
