import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'beach', label: 'Beach' },
    { id: 'mountain', label: 'Mountain' },
    { id: 'city', label: 'City' },
    { id: 'adventure', label: 'Adventure' },
    { id: 'cultural', label: 'Cultural' }
  ]

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      category: 'beach',
      price: '$1,200',
      rating: 4.8,
      description: 'Tropical paradise with stunning beaches'
    },
    {
      id: 2,
      name: 'Swiss Alps',
      category: 'mountain',
      price: '$2,500',
      rating: 4.9,
      description: 'Breathtaking mountain views and skiing'
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      category: 'city',
      price: '$1,800',
      rating: 4.7,
      description: 'Modern city with rich cultural heritage'
    },
    {
      id: 4,
      name: 'Safari Kenya',
      category: 'adventure',
      price: '$3,200',
      rating: 4.9,
      description: 'Wildlife adventure in African savanna'
    },
    {
      id: 5,
      name: 'Rome, Italy',
      category: 'cultural',
      price: '$1,500',
      rating: 4.8,
      description: 'Historical treasures and amazing food'
    },
    {
      id: 6,
      name: 'Maldives',
      category: 'beach',
      price: '$2,800',
      rating: 4.9,
      description: 'Luxury overwater bungalows'
    }
  ]

  const filteredDestinations = destinations.filter(dest => 
    selectedCategory === 'all' || dest.category === selectedCategory
  ).filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <Navbar />
      
      {/* Search Section */}
      <section style={{ marginBottom: '3rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #EE6C4D, #F7931E)',
          padding: '3rem',
          borderRadius: '20px',
          textAlign: 'center',
          color: '#fff',
          width: '100%'
        }}>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Explore Destinations</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Discover your next adventure from around world
          </p>
          
          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            maxWidth: '600px', 
            margin: '0 auto 2rem',
            flexWrap: 'wrap'
          }}>
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                border: 'none',
                borderRadius: '50px',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            />
            <button
              className="btn-hero btn-primary"
              style={{ padding: '1rem 2rem' }}
            >
              Search
            </button>
          </div>

          {/* Categories */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`btn-hero ${selectedCategory === category.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ 
                  padding: '0.8rem 1.5rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Grid */}
      <section style={{ padding: '0 2rem 3rem', backgroundColor: '#fff' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} style={{ 
              background: '#fff',
              padding: '2rem',
              borderRadius: '15px',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }}>
              <h3 style={{
                fontSize: '1.4rem',
                color: '#293241',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                {destination.name}
              </h3>
              <p style={{ color: '#666', marginBottom: '1rem' }}>
                {destination.description}
              </p>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1rem'
              }}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: 'bold', 
                  color: '#EE6C4D' 
                }}>
                  {destination.price}
                </span>
                <span style={{ color: '#F7931E' }}>
                  Rating: {destination.rating}
                </span>
              </div>
              <button style={{
                background: '#EE6C4D',
                color: '#fff',
                padding: '0.8rem 1.5rem',
                border: 'none',
                borderRadius: '25px',
                cursor: 'pointer',
                fontWeight: '600',
                width: '100%'
              }}>
                View Details
              </button>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666'
          }}>
            <h3>No destinations found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default ExplorePage
