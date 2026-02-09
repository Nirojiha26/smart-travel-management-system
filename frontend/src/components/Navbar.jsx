import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/#about', label: 'About' },
    { path: '/explore', label: 'Explore' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      background: '#fff',
      padding: '1.5rem 0', /* Removed horizontal padding from nav */
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid #f1f5f9'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1400px', /* Centered container */
        margin: '0 auto',
        padding: '0 4rem', /* Responsive gutter */
        width: '100%'
      }}>
        {/* Logo */}
        <Link to="/" style={{
          color: '#0F172A',
          fontSize: '1.75rem',
          fontWeight: '800',
          textDecoration: 'none',
          letterSpacing: '-0.5px'
        }}>
          Smart Travel
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: isActive(item.path) ? '#EF6C33' : '#334155',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1rem'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={{
              background: '#EF6C33',
              color: '#fff',
              padding: '0.8rem 2.5rem',
              borderRadius: '50px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(239, 108, 51, 0.2)'
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
            color: '#333',
            fontSize: '1.5rem',
            cursor: 'pointer',
            display: 'none'
          }}
        >
          Menu
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{ background: '#fff', padding: '1rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: isActive(item.path) ? '#EE6C4D' : '#333',
                display: 'block',
                padding: '0.5rem 0',
                textDecoration: 'none'
              }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/login"
            style={{
              color: '#EE6C4D',
              display: 'block',
              padding: '0.5rem 0',
              textDecoration: 'none',
              fontWeight: 'bold'
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
