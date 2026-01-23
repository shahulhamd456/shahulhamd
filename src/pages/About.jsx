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
            I work with Figma, design systems, and modern UI trends to create smooth and meaningful user
            journeys. I’m constantly learning and refining my design skills to build products that feel simple,
            modern, and easy to use.
          </p>
          <p className="bio-details">
            My background in computer applications (BCA) gives me a unique advantage: I understand not just how
            a product should look, but how it works under the hood. This bridge between design and development
            is where I thrive.
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
