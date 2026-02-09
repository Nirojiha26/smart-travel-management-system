import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    { id: 'all', label: 'All Destinations' },
    { id: 'beach', label: 'Beach Escapes' },
    { id: 'mountain', label: 'Mountain Retreats' },
    { id: 'city', label: 'City Breaks' },
    { id: 'adventure', label: 'Adventure Trips' },
    { id: 'cultural', label: 'Cultural Journeys' },
    { id: 'budget', label: 'Budget-Friendly' }
  ]

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      category: 'beach',
      budget: '$80 - $150 / day',
      season: 'Apr - Oct',
      rating: 4.8,
      attractions: ['Uluwatu Temple', 'Sacred Monkey Forest', 'Tegallalang Rice Terrace'],
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2138&auto=format&fit=crop',
      description: 'Tropical paradise with stunning beaches and vibrant culture.'
    },
    {
      id: 2,
      name: 'Swiss Alps, Switzerland',
      category: 'mountain',
      budget: '$200 - $350 / day',
      season: 'Jun - Sep (Hiking), Dec - Mar (Skiing)',
      rating: 4.9,
      attractions: ['Matterhorn', 'Jungfraujoch', 'Lake Geneva'],
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
      description: 'Breathtaking mountain views, world-class skiing, and pristine lakes.'
    },
    {
      id: 3,
      name: 'Tokyo, Japan',
      category: 'city',
      budget: '$150 - $250 / day',
      season: 'Mar - May (Cherry Blossoms), Sep - Nov',
      rating: 4.7,
      attractions: ['Senso-ji Temple', 'Shibuya Crossing', 'Tokyo Tower'],
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1994&auto=format&fit=crop',
      description: 'A dazzling mix of modern technology and traditional culture.'
    },
    {
      id: 4,
      name: 'Maasai Mara, Kenya',
      category: 'adventure',
      budget: '$300 - $500 / day',
      season: 'Jul - Oct (Migration)',
      rating: 4.9,
      attractions: ['Big Five Safari', 'Mara River Crossing', 'Hot Air Balloon Ride'],
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
      description: 'Witness the Great Migration and incredible wildlife in the African savanna.'
    },
    {
      id: 5,
      name: 'Rome, Italy',
      category: 'cultural',
      budget: '$120 - $200 / day',
      season: 'Apr - Jun, Sep - Oct',
      rating: 4.8,
      attractions: ['Colosseum', 'Vatican City', 'Trevi Fountain'],
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop',
      description: 'Walk through history with ancient ruins, art, and world-renowned cuisine.'
    },
    {
      id: 6,
      name: 'Maldives',
      category: 'beach',
      budget: '$300 - $600 / day',
      season: 'Nov - Apr',
      rating: 4.9,
      attractions: ['Overwater Bungalows', 'Coral Reefs', 'Underwater Restaurants'],
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=2065&auto=format&fit=crop',
      description: 'The ultimate luxury escape with crystal clear waters and white sand beaches.'
    },
    {
      id: 7,
      name: 'Kyoto, Japan',
      category: 'cultural',
      budget: '$140 - $220 / day',
      season: 'Mar - May, Oct - Nov',
      rating: 4.8,
      attractions: ['Fushimi Inari Shrine', 'Kinkaku-ji', 'Arashiyama Bamboo Grove'],
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=2070&auto=format&fit=crop',
      description: 'Experience traditional Japan with stunning temples, gardens, and geisha districts.'
    },
    {
      id: 8,
      name: 'New York City, USA',
      category: 'city',
      budget: '$200 - $350 / day',
      season: 'Apr - Jun, Sep - Nov',
      rating: 4.7,
      attractions: ['Central Park', 'Statue of Liberty', 'Times Square'],
      image: 'https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2?q=80&w=2071&auto=format&fit=crop',
       description: 'The city that never sleeps, offering endless entertainment, dining, and culture.'
    }
  ]

  const filteredDestinations = destinations.filter(dest => 
    selectedCategory === 'all' || dest.category === selectedCategory
  ).filter(dest =>
    dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dest.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F8FAFC', paddingBottom: '4rem' }}>
      <Navbar />
      
      {/* Hero / Intro Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
        color: '#fff',
        borderBottomRightRadius: '50px',
        borderBottomLeftRadius: '50px',
        marginBottom: '3rem'
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '-1px' }}>
            Explore the World with Wanderlust
          </h1>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#94A3B8', marginBottom: '2rem' }}>
            The Explore page helps you discover destinations and travel experiences from around the world before you start planning. 
            Browse popular cities, trending locations, and hand-picked travel themes such as beach escapes, cultural journeys, 
            adventure trips, and budget-friendly getaways.
          </p>
          
          {/* Search Bar */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            maxWidth: '600px', 
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '0.5rem',
            borderRadius: '50px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <input
              type="text"
              placeholder="Search destinations, themes, or activities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: '1rem 1.5rem',
                border: 'none',
                background: 'transparent',
                color: '#fff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
            <button
              className="btn-hero"
              style={{ 
                padding: '0.8rem 2rem', 
                background: '#38BDF8', 
                color: '#0F172A',
                border: 'none',
                borderRadius: '50px',
                fontWeight: 'bold'
              }}
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* AI Suggestions / Highlights */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 4rem', padding: '0 2rem' }}>
        <div style={{ 
          background: '#FFFFFF', 
          borderRadius: '24px', 
          padding: '2.5rem',
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.05)',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 400px' }}>
            <h3 style={{ color: '#0F172A', fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem' }}>
              Intelligent Planning Preview
            </h3>
            <p style={{ color: '#64748B', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Wanderlust showcases AI-powered suggestions like trending destinations this season and popular choices among similar travelers. 
              While full personalization is available after signing up, this preview helps you understand how we can recommend trips 
              that fit your interests, time, and budget.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>🚀 Trending: Japan</span>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>🍂 Best Season: Europe</span>
              <span style={{ background: '#F1F5F9', color: '#475569', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>💰 Budget: SE Asia</span>
            </div>
          </div>
          <div style={{ flex: '1 1 300px', background: '#F8FAFC', padding: '2rem', borderRadius: '16px', border: '1px dashed #CBD5E1' }}>
            <p style={{ color: '#94A3B8', fontStyle: 'italic', textAlign: 'center' }}>
              "Sign up to unlock personalized AI itineraries based on your budget and preferences."
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section style={{ maxWidth: '1200px', margin: '0 auto 3rem', padding: '0 2rem', textAlign: 'center' }}>
        <h2 style={{ color: '#0F172A', fontSize: '2rem', fontWeight: '700', marginBottom: '2rem' }}>Browse by Travel Style</h2>
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
              style={{ 
                padding: '0.8rem 1.5rem',
                fontSize: '0.95rem',
                border: selectedCategory === category.id ? '2px solid #0F172A' : '1px solid #E2E8F0',
                background: selectedCategory === category.id ? '#0F172A' : '#FFFFFF',
                color: selectedCategory === category.id ? '#FFFFFF' : '#64748B',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: '600'
              }}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Destinations Grid */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem'
        }}>
          {filteredDestinations.map((destination) => (
            <div key={destination.id} style={{ 
              background: '#fff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)',
              border: '1px solid #F1F5F9',
              transition: 'transform 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ position: 'relative', height: '220px' }}>
                 <img 
                  src={destination.image} 
                  alt={destination.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ 
                  position: 'absolute', 
                  top: '15px', 
                  right: '15px', 
                  background: 'rgba(255, 255, 255, 0.9)', 
                  padding: '5px 10px', 
                  borderRadius: '12px',
                  fontWeight: '700',
                  color: '#0F172A',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⭐ {destination.rating}
                </div>
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', color: '#0F172A', fontWeight: '700' }}>
                    {destination.name}
                  </h3>
                </div>
                
                <p style={{ color: '#64748B', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                  {destination.description}
                </p>

                <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                    <span style={{ fontWeight: '600', color: '#0F172A' }}>💰 Budget:</span> {destination.budget}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                    <span style={{ fontWeight: '600', color: '#0F172A' }}>🍂 Best Season:</span> {destination.season}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.9rem', color: '#475569' }}>
                    <span style={{ fontWeight: '600', color: '#0F172A', minWidth: '85px' }}>Top Sights:</span> 
                    <span>{destination.attractions.join(', ')}</span>
                  </div>
                </div>

                <button style={{
                  marginTop: 'auto',
                  background: '#F1F5F9',
                  color: '#0F172A',
                  padding: '0.8rem',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '700',
                  width: '100%',
                  transition: 'background 0.2s',
                  fontSize: '1rem'
                }}>
                  View Detailed Guide
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredDestinations.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem',
            color: '#64748B'
          }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#0F172A' }}>No destinations found</h3>
            <p>Try adjusting your search terms or selecting a different category.</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default ExplorePage
