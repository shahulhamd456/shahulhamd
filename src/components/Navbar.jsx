import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef(null);

  useEffect(() => {
    // Logo Animation on Mount
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current.children, {
        y: -50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.5 // Wait for page load slightly
      });
    }, logoRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="brand-logo" ref={logoRef} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="brand-text-wrapper">
            <span className="brand-text">Shahul</span><span className="brand-dot">.</span>
          </span>
        </Link>

        {/* Semantic Name: nav-menu */}
        {/* State Class: .mobile-active */}
        <ul className={`nav-menu ${isMobileMenuOpen ? 'mobile-active' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${isActive('/')}`} style={isActive('/') ? { color: 'var(--primary-accent)' } : {}} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="/skills" className={`nav-link ${isActive('/skills')}`} onClick={() => setIsMobileMenuOpen(false)}>
              Skills
            </Link>
          </li>
          <li>
            <Link to="/contact" className={`nav-link ${isActive('/contact')}`} onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li className="mobile-only-btn">
            <a href="mailto:shahulhamd456@gmail.com" className="btn btn-primary w-100" onClick={() => setIsMobileMenuOpen(false)}>Let's Talk</a>
          </li>
        </ul>

        <div className="navbar-actions">
          <a href="mailto:shahulhamd456@gmail.com" className="btn btn-primary nav-cta-btn magnetic-btn">
            Let's Talk
          </a>
          <div className="menu-toggle" onClick={toggleMenu}>
            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
