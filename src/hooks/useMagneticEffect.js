import { useEffect } from 'react';
import gsap from 'gsap';

const useMagneticEffect = (location) => {
    useEffect(() => {
        const magneticBtns = document.querySelectorAll('.magnetic-btn');

        magneticBtns.forEach(btn => {
            let bounds = { width: 0, height: 0, left: 0, top: 0 };

            const handleMouseEnter = () => {
                const rect = btn.getBoundingClientRect();
                bounds = {
                    width: rect.width,
                    height: rect.height,
                    left: rect.left,
                    top: rect.top
                };
            };

            const handleMouseMove = (e) => {
                const x = e.clientX - bounds.left;
                const y = e.clientY - bounds.top;

                const centerX = bounds.width / 2;
                const centerY = bounds.height / 2;

                const deltaX = (x - centerX) * 0.4; // Magnetic pull strength
                const deltaY = (y - centerY) * 0.4;

                gsap.to(btn, {
                    x: deltaX,
                    y: deltaY,
                    duration: 0.3,
                    ease: "power2.out",
                    overwrite: "auto"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: "elastic.out(1, 0.4)",
                    overwrite: "auto"
                });
            };

            btn.addEventListener('mouseenter', handleMouseEnter);
            btn.addEventListener('mousemove', handleMouseMove);
            btn.addEventListener('mouseleave', handleMouseLeave);

            // Access listener for cleanup
            btn._handleMouseEnter = handleMouseEnter;
            btn._handleMouseMove = handleMouseMove;
            btn._handleMouseLeave = handleMouseLeave;
        });

        // Cleanup function
        return () => {
            magneticBtns.forEach(btn => {
                if (btn._handleMouseEnter) btn.removeEventListener('mouseenter', btn._handleMouseEnter);
                if (btn._handleMouseMove) btn.removeEventListener('mousemove', btn._handleMouseMove);
                if (btn._handleMouseLeave) btn.removeEventListener('mouseleave', btn._handleMouseLeave);
            });
        };
    }, [location]); // Re-run when location changes (new buttons might appear)
};

export default useMagneticEffect;
