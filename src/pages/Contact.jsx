import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Contact.css';

const Contact = () => {
  const formRef = useRef(null);
  const statusRef = useRef(null);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch("https://formsubmit.co/ajax/shahulhamd456@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.status === 200) {
        setStatus('success');
        formRef.current.reset();

        // Animate success message
        gsap.fromTo(statusRef.current,
          { height: 0, opacity: 0, marginTop: 0 },
          { height: "auto", opacity: 1, marginTop: "1.5rem", duration: 0.5, ease: "power2.out" }
        );

        setTimeout(() => {
          gsap.to(statusRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => setStatus(null)
          });
        }, 3000);

      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">

      <header className="page-header">
        <h1>Get in Touch</h1>
        <p>Have a project in mind? Let's build something together.</p>
      </header>

      <section className="contact-container">

        {/* Left: Info */}
        <div className="glass-card info-card">
          <div className="info-group">
            <h4><i className="ri-mail-send-line"></i> Email Me</h4>
            <a href="shahulhamd456@gmail.com"><p>shahulhamd456@gmail.com</p></a>
          </div>

          <div className="info-group">
            <h4><i className="ri-phone-line"></i> Call Me</h4>
            <a href="+91 9744566541"><p>+91 9744566541</p></a>
          </div>

          <div className="info-group">
            <h4><i className="ri-map-pin-2-line"></i> Location</h4>
            <a href="https://share.google/WVgDbDrz6HZLC0vOX"><p>Malappuram, Kerala</p></a>
          </div>

          <div className="social-links">
            <a href="www.linkedin.com/in/shahul-hameed-therambil" className="social-btn"><i className="ri-linkedin-fill"></i></a>
            <a href="https://www.instagram.com/shahull__" className="social-btn"><i className="ri-instagram-line"></i></a>
           
            <a href="#" className="social-btn"><i className="ri-facebook-fill"></i></a>
            <a href="https://wa.me/919744566541" className="social-btn"><i className="ri-whatsapp-line"></i></a>
          </div>
        </div>

        {/* Right: Form */}
        <form ref={formRef} onSubmit={handleSubmit} className="glass-card contact-form">
          {/* FormSubmit Configuration */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="form-group">
            <label>Your Name</label>
            <input type="text" name="name" className="form-input" placeholder="John Doe" required />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" className="form-input" placeholder="john@example.com" required />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" className="form-input" placeholder="Project Inquiry" required />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" className="form-input" placeholder="Tell me about your project..." required></textarea>
          </div>

          {/* Status Message Container */}
          {status === 'success' && (
            <div ref={statusRef} className="status-message-wrapper">
              <div className="status-alert status-success" role="alert">
                <i className="ri-checkbox-circle-fill status-icon"></i>
                <div>
                  <strong>Message Sent!</strong>
                </div>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="status-alert status-error">
              Oops! There was a problem submitting your form.
            </div>
          )}

          <button type="submit" className="btn btn-primary magnetic-btn submit-btn" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>

      </section>

    </div>
  );
};

export default Contact;
