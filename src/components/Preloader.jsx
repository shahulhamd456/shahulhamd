import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/Preloader.css';

const Preloader = ({ onComplete }) => {
    const preloaderRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    if (onComplete) onComplete();
                }
            });

            // Sequence
            tl
                // 1. Grid Lines Expand
                .to(".grid-line.horiz", { scaleX: 1, duration: 1.2, ease: "expo.inOut" })
                .to(".grid-line.vert", { scaleY: 1, duration: 1.2, ease: "expo.inOut" }, "<")

                // 2. Shapes Construct
                .to(".intro-shape.rect", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.6")
                .to(".intro-shape.circle", { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.7")
                .to(".intro-shape.square", { opacity: 1, scale: 1, rotation: 90, duration: 0.8, ease: "back.out(1.7)" }, "-=0.7")

                // 3. Text Reveal
                .to(".intro-char", {
                    y: 0,
                    opacity: 1,
                    duration: 1.0,
                    stagger: 0.05,
                    ease: "power4.out"
                }, "<")

                // 5. Dot Pop
                .to(".intro-dot", {
                    scale: 1,
                    opacity: 1,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.5")

                // 6. Deconstruct Shapes
                .to(".intro-shape", {
                    opacity: 0,
                    scale: 0.8,
                    duration: 0.6,
                    stagger: 0.1,
                    ease: "power2.in"
                }, "+=0.5")
                .to(".grid-line", { opacity: 0, duration: 0.5 }, "<")

                // 7. Final Logo Hold
                .to(".intro-logo-wrapper", { scale: 1.1, duration: 1.5, ease: "power1.inOut" }, "<")

                // 8. Exit
                .to(preloaderRef.current, {
                    opacity: 0,
                    duration: 1.0,
                    ease: "power2.inOut",
                    delay: 0.1
                });

        }, preloaderRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div id="preloader" ref={preloaderRef}>
            {/* Grid Lines */}
            <div className="intro-grid-lines">
                <div className="grid-line horiz"></div>
                <div className="grid-line vert"></div>
            </div>

            {/* Geometric Shapes */}
            <div className="intro-shapes">
                <div className="intro-shape rect" style={{ transform: 'translateX(-60px) scale(0)' }}></div>
                <div className="intro-shape circle" style={{ transform: 'translateX(60px) scale(0)' }}></div>
                <div className="intro-shape square" style={{ transform: 'translateY(-40px) scale(0)' }}></div>
            </div>

            {/* Typography */}
            <div className="intro-text-container">
                <div className="intro-logo-wrapper">
                    <h1 className="intro-text">
                        {['S', 'h', 'a', 'h', 'u', 'l'].map((char, i) => (
                            <span key={i} className="intro-char">{char}</span>
                        ))}
                        <div className="intro-dot"></div>
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
