import React from 'react';
import '../styles/Skills.css';

const Skills = () => {
  return (
    <div className="container">

      <header className="page-header">
        <h1>My Expertise</h1>
        <p>Tools and technologies I use to bring ideas to life.</p>
      </header>

      <section className="skills-grid">

        {/* Design Tools */}
        <div className="glass-card skill-category-card">
          <div className="category-header">
            <div className="category-icon"><i className="ri-pen-nib-line"></i></div>
            <h3>Design Tools</h3>
          </div>
          <div className="skill-list">
            <div className="skill-item"><span className="skill-tag">Figma</span></div>
            <div className="skill-item"><span className="skill-tag">Adobe XD</span></div>
            <div className="skill-item"><span className="skill-tag">Photoshop</span></div>
            <div className="skill-item"><span className="skill-tag">Illustrator</span></div>
          </div>
        </div>

        {/* UI Skills */}
        <div className="glass-card skill-category-card">
          <div className="category-header">
            <div className="category-icon"><i className="ri-layout-masonry-line"></i></div>
            <h3>UI Skills</h3>
          </div>
          <div className="skill-list">
            <div className="skill-item"><span className="skill-tag">Wireframing</span></div>
            <div className="skill-item"><span className="skill-tag">Prototyping</span></div>
            <div className="skill-item"><span className="skill-tag">Responsive Layouts</span></div>
            <div className="skill-item"><span className="skill-tag">Color Theory</span></div>
          </div>
        </div>

        {/* UX Skills */}
        <div className="glass-card skill-category-card">
          <div className="category-header">
            <div className="category-icon"><i className="ri-user-search-line"></i></div>
            <h3>UX Skills</h3>
          </div>
          <div className="skill-list">
            <div className="skill-item"><span className="skill-tag">User Research</span></div>
            <div className="skill-item"><span className="skill-tag">User Personas</span></div>
            <div className="skill-item"><span className="skill-tag">Journey Mapping</span></div>
            <div className="skill-item"><span className="skill-tag">Usability Testing</span></div>
          </div>
        </div>

        {/* Development */}
        <div className="glass-card skill-category-card">
          <div className="category-header">
            <div className="category-icon"><i className="ri-code-box-line"></i></div>
            <h3>Frontend</h3>
          </div>
          <div className="skill-list">
            <div className="skill-item"><span className="skill-tag">HTML5</span></div>
            <div className="skill-item"><span className="skill-tag">CSS3</span></div>
            <div className="skill-item"><span className="skill-tag">React.js</span></div>
            <div className="skill-item"><span className="skill-tag">Responsive Design</span></div>
          </div>
        </div>

      </section>

    </div>
  );
};

export default Skills;
