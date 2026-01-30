import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import '../styles/Footer.css';

const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    // Rolling Text Animation Setup
    const rollingTexts = footerRef.current.querySelectorAll('.rolling-text');
    rollingTexts.forEach(text => {
      const originalContent = text.textContent;
      text.innerHTML = ''; // Clear text

      // Split into spans
      originalContent.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.classList.add('letter');
        span.style.setProperty('--index', index);
        if (char === ' ') {
          span.style.marginRight = "0.2em";
        }
        text.appendChild(span);
      });
    });
  }, []);

  return (
    <footer className="big-footer section-padding pb-0 position-relative overflow-hidden" ref={footerRef}>
      <div className="container position-relative z-2">
        {/* Huge CTA */}
        <div className="footer-cta-wrapper">
          <div className="footer-full-width">
            <h2 className="footer-cta-text">
              <Link to="/contact" className="cta-link">
                LET'S WORK <br />
                <span className="rolling-text-container">
                  <span className="rolling-text original text-stroke">TOGETHER</span>
                  <span className="rolling-text clone">TOGETHER</span>
                </span>
              </Link>
            </h2>
          </div>
        </div>

        <div className="footer-content-grid">
          {/* Brand & Email */}
          <div className="footer-brand-info">
            <Link to="/" className="brand-name footer-brand-logo" style={{ textDecoration: 'none', display: 'inline-flex', position: 'relative' }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="brand-text-wrapper">
                Shahul.
              </span>
            </Link>
            <p className="brand-location">Based in Kerala, India.</p>
          </div>
          <a href="mailto:hello@shahul.design" className="footer-email-btn magnetic-btn">
            <span>hello@shahul.design</span>
            <i className="ri-arrow-right-up-line"></i>
          </a>
        </div>

        {/* Socials */}
        <div className="footer-social-section">
          <h5 className="connect-heading">Connect</h5>
          <div className="footer-socials">
            <a href="www.linkedin.com/in/shahul-hameed-therambil" className="social-icon-btn"><i className="ri-linkedin-fill"></i></a>
           
            <a href="https://www.instagram.com/shahull__" className="social-icon-btn"><i className="ri-instagram-line"></i></a>
             <a href="#" className="social-icon-btn"><i className="ri-dribbble-line"></i></a>
            <a href="#" className="social-icon-btn"><i className="ri-behance-fill"></i></a>
          </div>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="footer-bottom">
        <p className="footer-copyright">&copy; 2025 Shahul Hameed. All rights reserved.</p>
        <p className="footer-credit">Designed & Coded by shahul</p>
      </div>

      {/* Background Gradient Blur */}
      <div className="footer-glow"></div>
    </footer>
  );
};

export default Footer;
