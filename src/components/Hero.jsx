import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

const Hero = () => {
    const heroRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const heroTl = gsap.timeline();

            // Hero Content
            heroTl.from(".hero-text-section > *", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            });

            // Profile Container
            heroTl.from(".profile-container", {
                scale: 0.8,
                opacity: 0,
                rotation: 5,
                duration: 1.4,
                ease: "elastic.out(1, 0.5)"
            }, "-=1");

            // Float Cards
            heroTl.from(".float-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.5");

            // Interactive Text (Rubber Band)
            const letters = document.querySelectorAll('.interactive-text span');
            letters.forEach(letter => {
                letter.addEventListener('pointerenter', () => {
                    gsap.to(letter, {
                        scale: 1.25,
                        y: -15,
                        color: "#2563eb",
                        duration: 0.45,
                        ease: "back.out(2)"
                    });
                });
                letter.addEventListener('pointerleave', () => {
                    gsap.to(letter, {
                        scale: 1,
                        y: 0,
                        color: "inherit",
                        duration: 0.70,   // almost instant
                        ease: "none"
                    });
                });
            });

            // Mouse Parallax - Optimized with quickSetter
            let windowWidth = window.innerWidth;
            let windowHeight = window.innerHeight;

            const updateWindowDimensions = () => {
                windowWidth = window.innerWidth;
                windowHeight = window.innerHeight;
            };

            window.addEventListener('resize', updateWindowDimensions);

            const xSetCard = gsap.quickSetter(".float-card", "x", "px");
            const ySetCard = gsap.quickSetter(".float-card", "y", "px");
            const xSetProfile = gsap.quickSetter(".profile-container", "x", "px");
            const ySetProfile = gsap.quickSetter(".profile-container", "y", "px");

            const handleMouseMove = (e) => {
                const x = (e.clientX / windowWidth - 0.5) * 30;
                const y = (e.clientY / windowHeight - 0.5) * 30;

                xSetCard(x);
                ySetCard(y);
                xSetProfile(-x * 0.5);
                ySetProfile(-y * 0.5);
            };

            const heroSection = heroRef.current;
            if (heroSection) {
                heroSection.addEventListener('mousemove', handleMouseMove);
            }

            return () => {
                window.removeEventListener('resize', updateWindowDimensions);
                if (heroSection) heroSection.removeEventListener('mousemove', handleMouseMove);
            };

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero-section section-padding" ref={heroRef}>
            <div className="hero-container">
                <div className="hero-grid">
                    {/* Left Content */}
                    <div className="hero-text-section">
                        <h2>I'm</h2>
                        <h1 className="interactive-text">
                            <span>S</span><span>h</span><span>a</span><span>h</span><span>u</span><span>l</span>
                            &nbsp;
                            <span>H</span><span>a</span><span>m</span><span>e</span><span>e</span><span>d</span>
                        </h1>
                        <p className="role">UI/UX Designer | Frontend Developer</p>
                        <p className="bio">
                            I’m an entry-level UI/UX Designer skilled in creating clean, user-friendly interfaces and
                            improving digital experiences through thoughtful design.
                        </p>

                        <div className="cta-group">
                            <a href="/assets/SHAHUL-Cv.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic-btn" style={{ marginRight: '10px' }}>
                                Download CV
                            </a>
                            <Link to="/contact" className="btn btn-primary1 magnetic-btn">
                                Contact Me
                            </Link>
                        </div>
                    </div>

                    {/* Right Visuals */}
                    <div className="hero-visual-section">
                        <div className="profile-container">
                            <img
                                src="/assets/WhatsApp Image 2026-01-25 at 6.16.22 PM.jpeg"
                                alt="Shahul Hameed"
                                loading="eager"
                                width="350"
                                height="450"
                            />
                        </div>

                        {/* Floating Cards */}
                        <div className="glass-card float-card card-1">
                            <div className="icon-box"><i className="ri-palette-line"></i></div>
                            <div className="card-text">
                                <h4>UI Designer</h4>
                                <span>Visual Design</span>
                            </div>
                        </div>

                        <div className="glass-card float-card card-2">
                            <div className="icon-box"><i className="ri-code-s-slash-line"></i></div>
                            <div className="card-text">
                                <h4>Frontend Dev</h4>
                                <span>React & CSS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
