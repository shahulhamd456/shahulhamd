import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../styles/Stats.css';

gsap.registerPlugin(ScrollTrigger);

const Stats = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const stats = sectionRef.current.querySelectorAll('.stat-number');
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));

                gsap.to(stat, {
                    innerText: target,
                    duration: 2.5,
                    snap: { innerText: 1 },
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    onUpdate: function () {
                        stat.innerText = Math.ceil(this.targets()[0].innerText); // Ensure integer display
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="stats-section section-padding position-relative overflow-hidden" ref={sectionRef}>
            {/* Floating Circle Decoration */}
            <div className="green-glow-circle"></div>

            <div className="container position-relative z-2">
                <div className="stats-grid">
                    <div className="stat-column">
                        <div className="stat-item">
                            <div className="stat-number-wrapper">
                                <span className="stat-number" data-target="15">0</span><span className="plus">+</span>
                            </div>
                            <p className="stat-label">Global Brands</p>
                        </div>
                    </div>
                    <div className="stat-column">
                        <div className="stat-item">
                            <div className="stat-number-wrapper">
                                <span className="stat-number" data-target="8">0</span><span className="plus">+</span>
                            </div>
                            <p className="stat-label">Months Experience</p>
                        </div>
                    </div>
                    <div className="stat-column">
                        <div className="stat-item">
                            <div className="stat-number-wrapper">
                                <span className="stat-number" data-target="18">0</span><span className="plus">+</span>
                            </div>
                            <p className="stat-label">Projects Delivered</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
