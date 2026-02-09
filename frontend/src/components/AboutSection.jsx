import React from 'react';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-content">
          <h2 className="section-title-navy">About Us</h2>
          <p className="about-description">
            Wanderlust is your ultimate companion for exploring the world. Our AI-driven platform 
            analyzes your preferences, budget, and travel history to curate personalized itineraries 
            that make every trip unforgettable. We believe in making travel planning seamless, 
            intelligent, and accessible to everyone.
          </p>
          <p className="about-description">
            Whether you're looking for hidden gems in Japan or popular landmarks in Paris, 
            we provide the insights you need to travel smarter, not harder.
          </p>
        </div>
        <div className="about-image-container">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop" 
            alt="Person planning a trip" 
            className="about-image"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
