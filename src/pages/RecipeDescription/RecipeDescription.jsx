import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Navbar from '../../components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';
import ReactReadMoreReadLess from 'react-read-more-read-less';
import ReviewBox from '../../components/CommentBox/ReviewBox';
import TextEditor from '../../components/TextEditor/TextEditor';
import Footer from '../../components/Footer/Footer';

import './RecipeDescription.css';
import Nutrients from '../../components/Nutrients/Nutrients';

function RecipeDescription() {
    const [precisedRating, setPrecisedRating] = useState(null);
    const [likesCount, setLikesCount] = useState(null);
    const [ingredientData, setIngredientData] = useState([]);
    const location = useLocation();
    const { recipe } = location.state;
    const details = recipe?.content?.details;

    useEffect(() => {
        if (recipe) {
            let yumsCount = recipe.content.yums.count / 1000;
            let rating = recipe.content.reviews.averageRating;
            if ((rating && yumsCount) != null) {
                setPrecisedRating(rating.toFixed(1));
                setLikesCount(yumsCount.toFixed(1));
            }

            const ingredientList = recipe.content.ingredientLines;
            setIngredientData(ingredientList);
        }
    }, [recipe]);

    const { images, name } = details;
    const imageUrl = images && images[0] ? images[0].hostedLargeUrl : '';
    const sourceName = recipe.display.source.sourceDisplayName;
    const description = recipe.seo.web['meta-tags'].description;
    const noOfServings = details.numberOfServings;
    const totalTime = details.totalTime;
    const nutrients=recipe.content.nutrition['nutritionEstimates'];
    console.log(nutrients);

    return (
        <div className='recipe-description-container'>
            <Navbar />
            <div className="details-section">
                <div className="left-details-section">
                    <h1 className='recipe-name'>{name}</h1>
                    <p className='source-name'>{sourceName}</p>
                    <p className='description-rating'>
                        <Box
                            sx={{
                                '& > legend': { mt: 3 },
                                '.MuiRating-iconEmpty': {
                                    color: '#f2f2f2',
                                },
                                '.MuiRating-iconFilled': {
                                    color: '#e16120',
                                },
                            }}
                        >
                            <Rating
                                name="read-only"
                                value={precisedRating}
                                readOnly
                                precision={0.1}
                            />
                        </Box>
                    </p>
                    <p className="recipe-description">
                        <ReactReadMoreReadLess
                            charLimit={100}
                            readMoreText={"Read more"}
                            readLessText={"Read less"}
                            readMoreStyle={{ color: '#3a9691', fontSize: '18px', fontWeight: '450', cursor: 'pointer' }}
                            readLessStyle={{ color: '#3a9691', fontSize: '18px', fontWeight: '450', cursor: 'pointer' }}
                        >
                            {description}
                        </ReactReadMoreReadLess>
                    </p>
                    <div className="cooking-details">
                        <div className="no-of-ingredients cooking-detail">
                            <p className="value">
                                {ingredientData ? ingredientData.length : 0}
                            </p>
                            <p className="detail-name">
                                Ingredients
                            </p>
                        </div>
                        <div className="no-of-minutes cooking-detail">
                            <p className="value">
                                {totalTime}
                            </p>
                            <p className="detail-name">
                               
                            </p>
                        </div>
                        <div className="no-of-calories cooking-detail">
                            <p className="value">
                                1470
                            </p>
                            <p className="detail-name">
                                Calories
                            </p>
                        </div>
                    </div>
                </div>
                <div className="right-details-section">
                    <img className='recipe-img' src={imageUrl} alt="name" />
                </div>
            </div>
            <div className="ingredient-details-container">
                <div className="ingredient-details-header">
                    <div className='ingredient-details-right-header'>
                        <p className='ingredient-heading simple-heading'>Ingredients</p>
                    </div>
                    <div className='ingredient-details-left-header'>
                        <p className="unit-type">US</p>
                        <p className="unit-type">Metric</p>
                        <p className="no-of-serving">{noOfServings} servings</p>
                    </div>
                </div>
                <div className="ingredient-details">
                    {ingredientData && ingredientData.map((ingredient, index) => (
                        <p key={index} className="ingredient-detail">
                            <span className='quantity'>{ingredient.quantity} {ingredient.unit} </span>
                            <span className='ingredient-name'>{ingredient.ingredient}</span>
                            {/* {ingredient.remainder && <span className='condition'>{ingredient.remainder}</span>} */}
                        </p>
                    ))}
                </div>
            </div>

            <Nutrients />
            <TextEditor />
            <ReviewBox />
            <Footer />
        </div>
    );
}

export default RecipeDescription;
