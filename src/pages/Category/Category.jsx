import React, { useEffect, useState } from 'react';
import Card from '../../components/Card/Card';
import Lottie from 'react-lottie';
import { useParams } from 'react-router-dom';
import cookingBowl from '../../lottie/bowlanimation.json';
import { searchApi } from '../../apis/searchApi';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

function Category() {
  const { category } = useParams();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: cookingBowl,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const [recipes, setRecipes] = useState([]);
  const [cardLoading, setCardLoading] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await searchApi({ category });
        setRecipes(responseData.feed || []); // Assuming 'feed' contains the array of recipes
        setCardLoading(new Array(responseData.feed?.length || 0).fill(true)); // Initialize loading state for each card
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Reset recipes and cardLoading when category changes
    setRecipes([]);
    setCardLoading([]);
    fetchData();
  }, [category]); // Fetch data when category changes

  // Function to handle card loading completion
  const handleCardLoaded = (index) => {
    setCardLoading((prevState) => {
      const newState = [...prevState];
      newState[index] = false; // Set loading state for specific card to false
      return newState;
    });
  };

  // Show loading animation when recipes are being fetched
  if (recipes.length === 0) {
    return (
      <>
        <Navbar />
        <div>
          {/* <h1 className='just-for-you-heading'>{category} recipes</h1> */}
          <div className='lottie-animation'>
            <Lottie options={defaultOptions} height={200} width={200} />
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Show recipes when data is loaded
  return (
    <>
      <Navbar />
      <div className='cards-component'>
        {/* <h1 className='just-for-you-heading'>{category} recipes</h1> */}
        <div className='cards-container'>
          {recipes.map((recipe, index) => (
            <Card
              key={index}
              recipe={recipe}
              onLoad={() => handleCardLoaded(index)} // Pass onLoad callback to Card component
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Category;
