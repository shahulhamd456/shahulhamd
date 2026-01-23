import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Marquee = () => {
    const marqueeRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(contentRef.current, {
                xPercent: -50,
                ease: "none",
                duration: 15,
                repeat: -1
            });
        }, marqueeRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="marquee-section overflow-hidden py-5" ref={marqueeRef}>
            <div className="marquee-wrapper">
                <div className="marquee-content" ref={contentRef}>
                    <span>UI/UX Design</span> • <span>Web Development</span> • <span>Prototyping</span> •
                    <span>Wireframing</span> • <span>React.js</span> • <span>Figma</span> •
                    <span>UI/UX Design</span> • <span>Web Development</span> • <span>Prototyping</span> •
                    <span>Wireframing</span> • <span>React.js</span> • <span>Figma</span> •
                </div>
            </div>
        </section>
    );
};

export default Marquee;
