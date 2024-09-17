import React from 'react';
import './heroSection.css';

const HeroSection: React.FC = () => {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="text-container">
          <h1 className="hero-title">Here you can insert the title</h1>
          
          <p className="hero-subtitle">
          Here you can insert the subtitle
          </p>
          <ul className="hero-features">
            <li>
              <strong>fun fact 1</strong> - fun fact 1 discription.
            </li>
            <li>
              <strong>fun fact 2</strong> - fun fact 12 discription
            </li>
            <li>
              <strong>fun fact 3</strong> - fun fact 3 discription
            </li>
          </ul>
          <div className="button-group">
            <button className="cta-button primary">ANSÖK TILL SKM HÄR!</button>
            <button className="cta-button secondary">LÄS MER</button>
          </div>
        </div>
        
        <div className="image-container">
          <img
            src="/img.jpeg"
            alt="Group of people having fun"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
