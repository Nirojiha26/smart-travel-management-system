import React from 'react'
import Navbar from '../components/Navbar'
import AboutSection from '../components/AboutSection'
import DestinationsSection from '../components/DestinationsSection'
import NewsletterSection from '../components/NewsletterSection'
import Footer from '../components/Footer'
import '../styles/HomePage.css'

const HomePage = () => {
  return (
    <div className="homepage-container">
      <Navbar />
      
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Plan Smarter<br />
              Trips with AI<br />
              Assistance
            </h1>
            <p className="hero-description">
              Wanderlust helps you plan trips based on your budget, interests, and time, 
              using intelligent recommendations — before you even sign up.
            </p>
            <button className="cta-button" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
              Let's Explore
            </button>
          </div>
          
          <div className="hero-image-container">
            <img 
              src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop" 
              alt="Travelers exploring a Japanese temple" 
              className="hero-image"
            />
          </div>
        </div>
      </section>

      <AboutSection />
      <DestinationsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}

export default HomePage
