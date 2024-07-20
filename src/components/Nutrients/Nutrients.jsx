import React from 'react';
import './Nutrients.css';

function NutrientCircle({ nutrient, percentage, quantity }) {
  const circleStyle = {
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    backgroundColor: '#ccc',
    overflow: 'hidden',
    position: 'relative'
  };

  const unfilledStyle = {
    position: 'absolute',
    width: '100%',
    height: `${percentage}%`,
    background: '#f5f5f5',
    top: 0,
    left: 0,
    zIndex: 1
  };

  const filledStyle = {
    position: 'absolute',
    width: '100%',
    height: `${100 - percentage}%`,
    background: '#bedad9',
    bottom: 0,
    left: 0,
    zIndex: 1
  };

  const nutrientInfoStyle = {
    position: 'absolute',
    width: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2, // Ensure the nutrient info is above the filled and unfilled divs
    textAlign: 'center',
    fontSize: '14px',
    color: '#000000'
  };

  return (
    <div className="nutrient-circle">
      <div className="circle" style={circleStyle}>
        <div className="unfilled" style={unfilledStyle}></div>
        <div className="filled" style={filledStyle}></div>
        <div className="nutrient-info" style={nutrientInfoStyle}>
            <p className="nutrient-name">
            {nutrient}
            </p>
            <p className="nutrient-percentage">
            {percentage}%
            </p>
           
        </div>
      </div>
      <div className="quantity">{quantity} g</div>
    </div>
  );
}

function Nutrients() {
  return (
    <div className="nutrients-component">
      <p className="simple-heading">Nutrients</p>
      <div className="nutrients-container">
        <NutrientCircle nutrient="Sodium" percentage={90} quantity={50} />
        <NutrientCircle nutrient="Potassium" percentage={10} quantity={30} />
        <NutrientCircle nutrient="Calcium" percentage={40} quantity={20} />
        <NutrientCircle nutrient="Iron" percentage={60} quantity={15} />
        <NutrientCircle nutrient="Magnesium" percentage={75} quantity={25} />
        <NutrientCircle nutrient="Zinc" percentage={30} quantity={10} />
      </div>
    </div>
  );
}

export default Nutrients;
