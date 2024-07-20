import React from 'react';
import './Footer.css'; // Assuming you have a CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>About</h3>
          <p>About Yummly and its mission.</p>
        </div>
        <div className="footer-section">
          <h3>Recipes</h3>
          <ul>
            <li>Breakfast</li>
            <li>Lunch</li>
            <li>Dinner</li>
            <li>Desserts</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Blog</h3>
          <p>Read our latest articles.</p>
        </div>
        <div className="footer-section">
          <h3>Careers</h3>
          <p>Join our team.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Get in touch with us.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
