import React from 'react';
import '../styles/About.css';

const About = () => {
  return (
    <div className="container">
      <header className="page-header">
        <h1>About Me</h1>
        <p>Designing with purpose, building with passion.</p>
      </header>

      <section className="about-grid">
        {/* Left: Personal Bio */}
        <div className="glass-card bio-card">
          <div className="section-title">
            <i className="ri-user-smile-line"></i>
            <h3>Who I Am</h3>
          </div>
          <p className="bio-intro">
            I am a <strong>Frontend Developer</strong> and <strong>UI/UX Designer</strong> passionate about building scalable, component-based web applications.
            I specialize in the <strong>React ecosystem</strong>, crafting clean, responsive, and high-performance interfaces that bridge the gap between design and technology.
          </p>
          <p className="bio-details">
            My background in Computer Applications (BCA) provides a strong technical foundation, allowing me to understand not just the visuals, but the <strong>scalable architecture</strong> under the hood.
            From <strong>Figma prototypes</strong> to production-ready <strong>React code</strong>, I handle the full lifecycle of frontend development.
          </p>
          <div className="contact-meta">
            <div className="meta-item">
              <i className="ri-map-pin-line"></i>
              <span>Malappuram, Kerala</span>
            </div>
            <div className="meta-item">
              <i className="ri-mail-line"></i>
              <span>shahulhamd456@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right: Education */}
        <div className="education-column">
          <div className="section-title padding-left-small">
            <i className="ri-graduation-cap-line"></i>
            <h3>Education</h3>
          </div>

          <div className="education-list">
            <div className="edu-item">
              <div className="edu-year">
                06/2025 – <br />12/2025
              </div>
              <div className="edu-details">
                <h4>Skill Diploma in UI/UX Designing</h4>
                <p className="institution-name">Technodot Academy</p>
                <p className="institution-location">Kozhikode, Kerala</p>
              </div>
            </div>

            <div className="edu-item">
              <div className="edu-year">
                2022 – 2025
              </div>
              <div className="edu-details">
                <h4>Bachelor of Computer Applications (BCA)</h4>
                <p className="institution-name">Calicut University</p>
                <p className="institution-location">Malappuram, Kerala</p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  );
};

export default About;
