import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Services.css';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current.querySelectorAll('.service-card');

            if (cards.length > 0) {
                gsap.from(cards, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current, // Trigger from the container
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section-padding" ref={sectionRef}>
            <div className="container">
                <div className="services-header center-text">
                    <h2>What I Do</h2>
                    <p>Translating complex problems into simple, beautiful, and intuitive designs.</p>
                </div>

                <div className="services-grid">
                    <div className="service-column">
                        <div className="service-card">
                            <div className="service-icon"><i className="ri-layout-masonry-line"></i></div>
                            <h3>UI Design</h3>
                            <p>Creating visually stunning interfaces using Figma & Adobe XD with a focus on modern aesthetics.</p>
                        </div>
                    </div>
                    <div className="service-column">
                        <div className="service-card">
                            <div className="service-icon"><i className="ri-user-search-line"></i></div>
                            <h3>UX Research</h3>
                            <p>Understanding user needs through personas and journey maps to ensure meaningful experiences.</p>
                        </div>
                    </div>
                    <div className="service-column">
                        <div className="service-card">
                            <div className="service-icon"><i className="ri-code-s-slash-line"></i></div>
                            <h3>Frontend Dev</h3>
                            <p>Bridging the gap between design and code with clean HTML, CSS, and React implementation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
