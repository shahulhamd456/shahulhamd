import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/FeaturedWork.css';

gsap.registerPlugin(ScrollTrigger);

const FeaturedWork = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current.querySelectorAll('.work-card');

            if (cards.length > 0) {
                gsap.from(cards, {
                    y: 100,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });

                // Tilt Effect
                cards.forEach(card => {
                    const imageContainer = card.querySelector('.work-image-wrapper');
                    if (!imageContainer) return;

                    let bounds = { left: 0, top: 0, width: 0, height: 0 };

                    const onMouseEnter = () => {
                        const rect = card.getBoundingClientRect();
                        bounds = {
                            left: rect.left,
                            top: rect.top,
                            width: rect.width,
                            height: rect.height
                        };
                    };

                    const onMouseMove = (e) => {
                        // Performance: Skip tilt if browser is busy (simple heuristic) or throttle
                        if (gsap.isTweening(window)) return;

                        const x = e.clientX - bounds.left;
                        const y = e.clientY - bounds.top;
                        const centerX = bounds.width / 2;
                        const centerY = bounds.height / 2;

                        const rotateX = ((y - centerY) / centerY) * -2; // Max 2deg rotation
                        const rotateY = ((x - centerX) / centerX) * 2;

                        gsap.to(imageContainer, {
                            duration: 0.5,
                            rotationX: rotateX,
                            rotationY: rotateY,
                            ease: "power1.out",
                            transformPerspective: 500,
                            overwrite: "auto"
                        });
                    };

                    const onMouseLeave = () => {
                        gsap.to(imageContainer, {
                            duration: 0.8,
                            rotationX: 0,
                            rotationY: 0,
                            ease: "elastic.out(1, 0.5)",
                            overwrite: "auto"
                        });
                    };

                    card.addEventListener('mouseenter', onMouseEnter);
                    card.addEventListener('mousemove', onMouseMove);
                    card.addEventListener('mouseleave', onMouseLeave);
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" className="section-padding" ref={sectionRef}>
            <div className="container">
                <div className="work-header">
                    <h2 className="work-title">Selected Works</h2>
                    <p className="work-subtitle">A selection of projects that demonstrate my ability to solve complex problems.</p>
                </div>

                <div className="projects-grid">
                    {/* Project 1: BiteBloom */}
                    <div className="project-column">
                        <a href="https://bitebloome.vercel.app/" className="work-card">
                            <div className="work-card-header">
                                <div>
                                    <h3>BiteBloom</h3>
                                    <p>Artisanal Bakery & Cafe Website in React</p>
                                </div>
                                <div className="work-icon">
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                            <div className="work-image-wrapper">
                                <img
                                    src="/assets/bit1.jpg"
                                    alt="BiteBloom - Artisanal Bakery Website built with React"
                                    className="work-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                        </a>
                    </div>

                    {/* Project 2: Logistics Pro */}
                    <div className="project-column">
                        <a href="https://logistics-sable.vercel.app/" className="work-card">
                            <div className="work-card-header">
                                <div>
                                    <h3>Logistics Pro</h3>
                                    <p>UX/UI Dashboard Design</p>
                                </div>
                                <div className="work-icon">
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                            <div className="work-image-wrapper">
                                <img
                                    src="/assets/logipre.jpg"
                                    alt="Logistics Pro - Supply Chain Dashboard UX UI Design"
                                    className="work-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                        </a>
                    </div>

                    {/* Project 3: Fresh Bite */}
                    <div className="project-column">
                        <a href="#" className="work-card">
                            <div className="work-card-header">
                                <div>
                                    <h3>Fresh Bite</h3>
                                    <p>Food Delivery App Interface</p>
                                </div>
                                <div className="work-icon">
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                            <div className="work-image-wrapper">
                                <img
                                    src="/assets/freshsss.webp"
                                    alt="Fresh Bite - Food Delivery Web App Concept"
                                    className="work-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                        </a>
                    </div>

                    {/* Project 4: SkyCast */}
                    <div className="project-column">
                        <a href="#" className="work-card">
                            <div className="work-card-header">
                                <div>
                                    <h3>Daily Do</h3>
                                    <p>React Native Productivity App</p>
                                </div>
                                <div className="work-icon">
                                    <i className="ri-arrow-right-up-line"></i>
                                </div>
                            </div>
                            <div className="work-image-wrapper">
                                <img
                                    src="/assets/dailyyy.png"
                                    alt="Daily Do - Task Management App Application"
                                    className="work-image"
                                    loading="lazy"
                                    decoding="async"
                                    width="800"
                                    height="600"
                                />
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedWork;
