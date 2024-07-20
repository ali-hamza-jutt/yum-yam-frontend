import React, { useState, useEffect } from 'react';
import './Card.css';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useNavigate } from 'react-router-dom';

function Card({ recipe }) {
  const [precisedRating, setPrecisedRating] = useState(null);
  const [likesCount, setLikesCount] = useState(null);
  const navigate = useNavigate(); // useNavigate hook from react-router-dom

  useEffect(() => {
    if (recipe) {
      let yumsCount = recipe.content.yums.count / 1000;
      let rating = recipe.content.reviews.averageRating;
      if ((rating && yumsCount) != null) {
        setPrecisedRating(rating.toFixed(1));
        setLikesCount(yumsCount.toFixed(1));
      }
    }
  }, [recipe]);

  const details = recipe?.content?.details;
  const id=details.recipeId
  //console.log(details.recipeId)

  const handleCardClick = () => {
    // navigate(`/recipeDescription`);
    navigate(`/recipeDescription/${id}`, { state: { recipe } }); // Pass the recipe data as state

  };

 
  const { images, name } = details;
  const imageUrl = images && images[0] ? images[0].hostedLargeUrl : '';
  const sourceName = recipe.display.source.sourceDisplayName;
  const ingredientList = recipe.content.ingredientLines;
 

  return (
    <div className="card-container" onClick={handleCardClick}>
      <div className="card-img">
        <img src={imageUrl} alt={name} />
        <div className="image-layer">
          {ingredientList && (
            <p className="layer-text-container">
              {ingredientList.map((ingredient, index) => (
                <span className='layer-text' key={ingredient.id}>
                  {ingredient.ingredient}
                  {index !== ingredientList.length - 1 ? ', ' : ''}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
      <div className="card-details">
        <div className="card-details-left">
          <p className='card-recipe-name'>{name}</p>
          <p className='card-recipe-poster'>{sourceName}</p>
          <p className="card-rating">
            <Box
              sx={{
                '& > legend': { mt: 3 },
                '.MuiRating-iconEmpty': {
                  color: '#f2f2f2',
                },
                '.MuiRating-iconFilled': {
                  color: '##e16120',
                },
              }}
            >
              <Rating
                name="read-only"
                value={parseFloat(precisedRating)}
                readOnly
                precision={0.1}
              />
            </Box>
          </p>
        </div>
        <div className="card-details-right">
          <p className='card-added-recipe-number'>{likesCount} k</p>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
