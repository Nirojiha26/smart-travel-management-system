import React from 'react';

const NewsletterSection = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <h2 className="newsletter-title">Stay Updated with SmartTravel</h2>
        <p className="newsletter-subtitle">Get the latest travel tips, AI recommendations, and exclusive offers delivered to your inbox.</p>
        <div className="newsletter-form">
          <input type="email" placeholder="Enter your email address" className="newsletter-input" />
          <button className="newsletter-button">Join Now</button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
