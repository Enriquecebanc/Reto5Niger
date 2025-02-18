import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './postres.css'; // Crea un archivo postres.css
import tartaQuesoImage from '../../images/TartaQueso.jpg';
import brownieImage from '../../images/Brownie.jpg';
import flanImage from '../../images/Flan.jpg';
import arrozConLecheImage from '../../images/ArrozConLeche.jpg';
import heladoImage from '../../images/Helado.jpg';

const recipes = [
  {
    id: 1,
    name: 'Tarta de Queso',
    description: (
      <>
        <strong>🕔 1 hora 30 minutos</strong> | <strong>6 personas</strong> | Una deliciosa tarta de queso cremosa y suave.
      </>
    ),
    ingredients: [
      '200g de galletas',
      '100g de mantequilla',
      '500g de queso crema',
      '3 huevos',
      '150g de azúcar',
      '200ml de nata'
    ],
    instructions: [
      'Tritura las galletas y mézclalas con mantequilla derretida para hacer la base. (10 mins)',
      'Bate el queso crema con el azúcar hasta que quede suave. (5 mins)',
      'Añade los huevos y la nata y mezcla bien. (5 mins)',
      'Vierte la mezcla sobre la base de galletas. (5 mins)',
      'Hornea a 160°C durante 50 minutos. (50 mins)',
      'Deja enfriar antes de servir. (15 mins)'
    ],
    image: tartaQuesoImage
  },
  {
    id: 2,
    name: 'Brownie',
    description: (
      <>
        <strong>🕔 50 minutos</strong> | <strong>8 personas</strong> | Un bizcocho de chocolate denso y delicioso.
      </>
    ),
    ingredients: [
      '200g de chocolate negro',
      '150g de mantequilla',
      '200g de azúcar',
      '3 huevos',
      '100g de harina',
      '50g de nueces (opcional)'
    ],
    instructions: [
      'Derrite el chocolate con la mantequilla. (5 mins)',
      'Bate los huevos con el azúcar hasta que estén espumosos. (5 mins)',
      'Añade la mezcla de chocolate y la harina. (5 mins)',
      'Incorpora las nueces si lo deseas. (3 mins)',
      'Hornea a 180°C durante 30 minutos. (30 mins)',
      'Deja enfriar antes de servir. (5 mins)'
    ],
    image: brownieImage
  },
  {
    id: 3,
    name: 'Flan',
    description: (
      <>
        <strong>🕔 1 hora</strong> | <strong>4 personas</strong> | Un postre clásico de huevo y caramelo.
      </>
    ),
    ingredients: [
      '4 huevos',
      '500ml de leche',
      '100g de azúcar',
      '1 cucharadita de vainilla'
    ],
    instructions: [
      'Prepara un caramelo con azúcar y agua. (10 mins)',
      'Bate los huevos con la leche, el azúcar y la vainilla. (5 mins)',
      'Vierte la mezcla sobre el caramelo en un molde. (5 mins)',
      'Cocina al baño maría en el horno a 160°C. (40 minutos)',
      'Refrigera antes de desmoldar y servir. (10 mins)'
    ],
    image: flanImage
  },
  {
    id: 4,
    name: 'Arroz con Leche',
    description: (
      <>
        <strong>🕔 45 minutos</strong> | <strong>4 personas</strong> | Un postre tradicional de arroz cocido en leche con azúcar y canela.
      </>
    ),
    ingredients: [
      '100g de arroz',
      '1 litro de leche',
      '100g de azúcar',
      '1 rama de canela',
      'Cáscara de 1 limón'
    ],
    instructions: [
      'Lava el arroz. (5 mins)',
      'Hierve la leche con la canela y la piel de limón. (5 mins)',
      'Añade el arroz y el azúcar. (2 mins)',
      'Cocina a fuego lento hasta que el arroz esté tierno y la leche haya espesado. (30 mins)',
      'Espolvorea canela por encima antes de servir. (3 mins)'
    ],
    image: arrozConLecheImage
  },
  {
    id: 5,
    name: 'Helado de Chocolate',
    description: (
      <>
        <strong>🕔 4 horas</strong> | <strong>4 personas</strong> | Un postre refrescante y delicioso.
      </>
    ),
    ingredients: [
      '250ml de nata',
      '250ml de leche',
      '100g de azúcar',
      '150g de chocolate negro',
      '50g de trozos de chocolate (opcional)'
    ],
    instructions: [
      'Mezcla la nata, la leche y el azúcar en un cazo. (5 mins)',
      'Derrite el chocolate e incorpóralo a la mezcla. (5 mins)',
      'Si quieres, añade trozos de chocolate o frutos secos. (2 mins)',
      'Congela la mezcla en una heladera o en el congelador, removiendo cada cierto tiempo. (3 horas)',
      'Sirve frío. (**5 mins**)'
    ],
    image: heladoImage
  }
];

const Postres = () => {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <div className="postres-container">
      <h1>Postres</h1>
      <p>Aquí encontrarás una variedad de postres deliciosos.</p>
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

export default Postres;