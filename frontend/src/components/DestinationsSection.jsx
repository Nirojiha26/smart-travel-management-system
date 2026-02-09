import React from 'react';

const DestinationsSection = () => {
  const destinations = [
    { name: 'Tokyo, Japan', count: '15+ Destinations', image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2094&auto=format&fit=crop' },
    { name: 'Paris, France', count: '12+ Destinations', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop' },
    { name: 'Bali, Indonesia', count: '8+ Destinations', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2138&auto=format&fit=crop' },
    { name: 'Rome, Italy', count: '10+ Destinations', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop' },
  ];

  return (
    <section className="destinations-section">
      <div className="wave-top"></div>
      <div className="destinations-container">
        <h2 className="section-title-white">Popular Destinations</h2>
        <div className="destinations-grid">
          {destinations.map((dest, index) => (
            <div key={index} className="destination-card">
              <img src={dest.image} alt={dest.name} className="dest-card-image" />
              <div className="dest-card-content">
                <h3 className="dest-card-title">{dest.name}</h3>
                <p className="dest-card-count">{dest.count}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
