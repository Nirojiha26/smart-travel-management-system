import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="wave-footer"></div>
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-column">
            <h3 className="footer-logo">Wanderlust</h3>
            <p className="footer-about">Discover the world with AI-powered intelligence. Plan better, explore more.</p>
            <div className="social-links">
              <span className="social-icon">FB</span>
              <span className="social-icon">IG</span>
              <span className="social-icon">TW</span>
            </div>
          </div>
          
          <div className="footer-column">
            <h4 className="footer-heading">Menu</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/explore">Destinations</Link></li>
              <li><Link to="/reviews">Reviews</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/careers">Careers</Link></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <p className="footer-contact">Email: info@wanderlust.com</p>
            <p className="footer-contact">Phone: +1 234 567 890</p>
            <p className="footer-contact">Address: 123 Travel Lane, Explorer City</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Wanderlust. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
