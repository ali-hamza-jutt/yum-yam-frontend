import './App.css';
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Carousel from '../../components/Carousel/Carousel';
import CardsContainer from '../../components/CardsContainer/CardsContainer';
import photoUrls from '../../data/photosUrls';
import text from '../../data/text';
import Footer from '../../components/Footer/Footer';

function App() {
  
  return (
    <div className="App">
      <Navbar />
      <Carousel photos={photoUrls} textArray={text} />
      <CardsContainer />
      <Footer/>
    </div>
  );
}

export default App;
