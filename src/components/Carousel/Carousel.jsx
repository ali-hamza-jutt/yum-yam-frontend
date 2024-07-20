import React, { useState, useEffect, useRef } from 'react';
import './Carousel.css';

const Carousel = ({ photos, textArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const carouselRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % photos.length
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      handleNext();
    } else if (direction === 'right') {
      handlePrev();
    }
  };

  // To display photos in a circular manner
  const visiblePhotos = [];
  const numOfVisiblePhotos = isMobile ? 3 : 9;
  for (let i = 0; i < numOfVisiblePhotos; i++) {
    visiblePhotos.push(photos[(currentIndex + i) % photos.length]);
  }

  // To display corresponding text from textArray
  const visibleTexts = [];
  for (let i = 0; i < numOfVisiblePhotos; i++) {
    visibleTexts.push(textArray[(currentIndex + i) % photos.length]);
  }

  const handleTouchStart = (e) => {
    carouselRef.current.touchStartX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchStartX = carouselRef.current.touchStartX;
    const direction = touchStartX - touchEndX > 0 ? 'left' : 'right';

    handleSwipe(direction);
  };

  return (
    <div className="carousel-container">
      <h4>Personalize your Experience</h4>
      <h1>Tell us your favourite cuisines</h1>
      <div
        className="carousel"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {!isMobile && (
          <button className="arrow left-arrow" onClick={handlePrev}>❮</button>
        )}
        <div className="photo-container">
          <div
            className="photo-list"
            style={{
              transform: `translateX(0%)`,
              transition: 'transform 0.5s ease-in-out' // Smooth transition

            }}
          >
            {visiblePhotos.map((photo, index) => (
              <div key={index} className="photo">
                <img src={photo} alt={`Slide ${index}`} />
                <div className="text-overlay">{visibleTexts[index]}</div>
              </div>
            ))}
          </div>
        </div>
        {!isMobile && (
          <button className="arrow right-arrow" onClick={handleNext}>❯</button>
        )}
      </div>
      <button className="find-cuisine">Find Your Ideal Cuisines</button>
    </div>
  );
};

export default Carousel;
