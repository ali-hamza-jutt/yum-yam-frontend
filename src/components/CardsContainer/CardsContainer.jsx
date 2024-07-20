import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './CardsContainer.css';
import Lottie from 'react-lottie';
import { recipeApi } from '../../apis/recipeApi';  // Ensure this import is correct
import cookingBowl from '../../lottie/bowlanimation.json';

function CardsContainer() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingBowl,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const [recipes, setRecipes] = useState([]);
  const [cardLoading, setCardLoading] = useState([]); // Array to track loading state of each card

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await recipeApi();
        setRecipes(responseData.feed); // Assuming 'feed' contains the array of recipes
        setCardLoading(new Array(responseData.feed.length).fill(true)); // Initialize loading state for each card
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Function to handle card loading completion
  const handleCardLoaded = (index) => {
    setCardLoading(prevState => {
      const newState = [...prevState];
      newState[index] = false; // Set loading state for specific card to false
      return newState;
    });
  };

  if (recipes.length === 0) {
    return (
      <div>
        <h1 className='just-for-you-heading'>Just for you</h1>
        <div className='lottie-animation'>
          <Lottie 
            options={defaultOptions}
            height={200}
            width={200}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="cards-component">
      <h1 className='just-for-you-heading'>Just for you</h1>
      <div className="cards-container">
        {recipes.map((recipe, index) => (
          <Card
            key={index}
            recipe={recipe}
            onLoad={() => handleCardLoaded(index)} // Pass onLoad callback to Card component
          />
        ))}
      </div>
    </div>
  );
}

export default CardsContainer;
