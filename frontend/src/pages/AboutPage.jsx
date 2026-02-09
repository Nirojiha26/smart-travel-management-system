import React from 'react'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'

const AboutPage = () => {
  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      description: 'Travel enthusiast with 15+ years of experience in tourism industry'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      description: 'AI expert passionate about revolutionizing travel planning'
    },
    {
      name: 'Emma Davis',
      role: 'Head of Design',
      description: 'Creating beautiful and intuitive user experiences'
    },
    {
      name: 'Alex Rodriguez',
      role: 'Travel Expert',
      description: 'Visited 50+ countries and sharing insider tips'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Founded', description: 'Started with a vision to make travel planning smarter' },
    { year: '2021', title: 'AI Integration', description: 'Launched first AI-powered recommendations' },
    { year: '2022', title: '100K Users', description: 'Reached milestone of 100,000 happy travelers' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded to 50+ countries worldwide' },
    { year: '2024', title: 'Mobile Launch', description: 'Released mobile apps for iOS and Android' }
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ padding: '3rem 1rem 0', marginBottom: '0' }}>
        <h1 className="hero-title" style={{ color: '#EE6C4D', marginBottom: '0.5rem' }}>About Wanderlust</h1>
        <p className="hero-subtitle" style={{ marginBottom: '0', color: '#334155' }}>
          We're on a mission to make travel planning effortless and personalized
        </p>
      </section>

      {/* Mission Section */}
      <section style={{ marginBottom: '2rem' }}>
        <div style={{ 
          background: '#fff',
          padding: '3rem',
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ 
            fontSize: '2rem', 
            color: '#293241', 
            marginBottom: '2rem' 
          }}>
            Our Mission & Vision
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div>
              <h3 style={{ color: '#EE6C4D', marginBottom: '1rem' }}>
                Our Mission
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                To revolutionize travel planning by leveraging artificial intelligence and 
                user preferences to create personalized, unforgettable travel experiences 
                for everyone.
              </p>
            </div>
            <div>
              <h3 style={{ color: '#EE6C4D', marginBottom: '1rem' }}>
                Our Vision
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                To become world's most trusted travel companion, making every journey 
                seamless, enjoyable, and perfectly tailored to individual dreams and aspirations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="features-section">
        <h2 className="section-title">Meet Our Team</h2>
        <div className="features-grid">
          {team.map((member, index) => (
            <div key={index} className="feature-card">
              <h3 className="feature-title">{member.name}</h3>
              <p style={{ 
                color: '#EE6C4D', 
                fontWeight: '600',
                marginBottom: '1rem' 
              }}>
                {member.role}
              </p>
              <p className="feature-description">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 className="section-title">Our Journey</h2>
        <div style={{ 
          background: '#fff',
          padding: '2rem',
          borderRadius: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          {milestones.map((milestone, index) => (
            <div key={index} style={{ 
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              padding: '1rem',
              borderRadius: '10px',
              background: index % 2 === 0 ? '#f8f9fa' : '#fff'
            }}>
              <div style={{ 
                background: '#EE6C4D',
                color: '#fff',
                padding: '1rem',
                borderRadius: '10px',
                fontWeight: 'bold',
                minWidth: '80px',
                textAlign: 'center',
                marginRight: '2rem'
              }}>
                {milestone.year}
              </div>
              <div>
                <h4 style={{ 
                  color: '#293241', 
                  marginBottom: '0.5rem' 
                }}>
                  {milestone.title}
                </h4>
                <p style={{ color: '#666', margin: 0 }}>
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">50+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">100K+</div>
          <div className="stat-label">Happy Travelers</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">4.8</div>
          <div className="stat-label">Average Rating</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">15+</div>
          <div className="stat-label">Awards Won</div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
