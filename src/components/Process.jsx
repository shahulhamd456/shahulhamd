import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Services.css';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = sectionRef.current.querySelectorAll('.process-card');

            if (cards.length > 0) {
                gsap.from(cards, {
                    y: 60,
                    opacity: 0,
                    duration: 1.2,
                    stagger: 0.25,
                    ease: "back.out(1.2)", // Little bounce for the steps
                    scrollTrigger: {
                        trigger: sectionRef.current, // Trigger from the row/container
                        start: "top 75%",
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
                <div className="services-header center-text mb-5">
                    <h2>My Process</h2>
                    <p>A streamlined workflow ensuring quality at every step.</p>
                </div>

                <div className="process-grid">
                    {/* Step 1 */}
                    <div className="process-column">
                        <div className="process-card">
                            <div className="step-badge">01</div>
                            <div className="mb-4 mt-3 icon-wrapper">
                                <i className="ri-search-eye-line"></i>
                            </div>
                            <h4>Discovery</h4>
                            <p className="text-muted small">Deep dive into user needs, competitor analysis, and problem definition.</p>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="process-column">
                        <div className="process-card">
                            <div className="step-badge">02</div>
                            <div className="mb-4 mt-3 icon-wrapper">
                                <i className="ri-mind-map"></i>
                            </div>
                            <h4>Strategy</h4>
                            <p className="text-muted small">Blueprinting the architecture, wireframing flows, and planning the UX.</p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="process-column">
                        <div className="process-card">
                            <div className="step-badge">03</div>
                            <div className="mb-4 mt-3 icon-wrapper">
                                <i className="ri-pen-nib-line"></i>
                            </div>
                            <h4>Design</h4>
                            <p className="text-muted small">Crafting pixel-perfect visuals, interactive prototypes, and design systems.</p>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="process-column">
                        <div className="process-card">
                            <div className="step-badge">04</div>
                            <div className="mb-4 mt-3 icon-wrapper">
                                <i className="ri-code-box-line"></i>
                            </div>
                            <h4>Develop</h4>
                            <p className="text-muted small">Translating designs into clean, responsive, and accessible code.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
