import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/explore', label: 'Explore' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: 'rgba(255, 255, 255, 0.95)', // Increased opacity for better contrast
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(15, 23, 42, 0.1)', // Darker border
      boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.1)' // Stronger shadow
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '0 4rem',
        width: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none'
        }}>
          <div style={{
            width: '42px',
            height: '42px',
            background: 'linear-gradient(135deg, #0F172A 0%, #334155 100%)',
            borderRadius: '50%', // Circle for the globe feel
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)'
          }}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2"/>
              <path d="M2 12H22" stroke="white" strokeWidth="2"/>
              <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="white" strokeWidth="2"/>
               {/* Small plane overlay */}
              <path d="M20 4L18 8L20 4Z" fill="white"/> 
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              color: '#0F172A',
              fontSize: '1.5rem',
              fontWeight: '800',
              letterSpacing: '-0.5px',
              fontFamily: "'Inter', sans-serif",
              lineHeight: '1'
            }}>
              Wanderlust
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? '#0F172A' : '#64748B',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.95rem',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.color = '#0F172A'}
              onMouseLeave={(e) => e.target.style.color = isActive(item.path) ? '#0F172A' : '#64748B'}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={{
              background: '#0F172A',
              color: '#fff',
              padding: '0.75rem 2rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)'
              e.target.style.boxShadow = '0 6px 16px rgba(15, 23, 42, 0.25)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 12px rgba(15, 23, 42, 0.15)'
            }}
          >
            Sign In
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: '#0F172A',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none' // Hidden by default, shown via CSS media query if needed
          }}
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ 
          background: '#fff', 
          padding: '1rem',
          borderTop: '1px solid #f1f5f9',
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: isActive(item.path) ? '#0F172A' : '#64748B',
                display: 'block',
                padding: '0.75rem 0',
                textDecoration: 'none',
                fontWeight: '500'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={{
              color: '#0F172A',
              display: 'block',
              padding: '0.75rem 0',
              textDecoration: 'none',
              fontWeight: '700'
            }}
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  )
}

export default Navbar
