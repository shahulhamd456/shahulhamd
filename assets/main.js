/*
 * Main JavaScript - Cinematic Motion Edition
 * Features: Lenis Smooth Scroll, GSAP Parallax Grid, Staggered Reveals, Interactive Elements
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Native Scroll (Lenis Removed) ---
    // Using standard browser scrolling for maximum reliability

    // Integrate GSAP with ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);


    // --- 0. Preloader & Entry Sequence ---
    const preloader = document.getElementById('preloader');

    if (preloader) {
        document.body.style.overflow = "hidden"; // Disable scroll

        const entryTl = gsap.timeline({
            onComplete: () => {
                document.body.style.overflow = ""; // Enable scroll
                playHeroAnimation();
            }
        });

        // Setup strokes for drawing effect
        gsap.set(".preloader-svg path, .preloader-svg rect, .preloader-svg circle", {
            strokeDasharray: 300,
            strokeDashoffset: 300,
            opacity: 1
        });

        entryTl
            // 1. Draw Monitor & Base
            .to(".svg-monitor, .svg-stand, .svg-base", {
                strokeDashoffset: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power2.inOut"
            })
            // 2. Creative Assembly (The "Premium Touch")
            // Header: Expands from center
            .fromTo(".svg-ui-header",
                { scaleX: 0, opacity: 0, transformOrigin: "center" },
                { scaleX: 1, opacity: 1, duration: 0.6, ease: "expo.out" }
                , "-=0.4")
            // Profile: Spins in
            .fromTo(".svg-ui-profile",
                { scale: 0, rotation: -180, transformOrigin: "center" },
                { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(2)" }
                , "<+0.1")
            // Cards: Slide up with staggering
            .fromTo(".svg-ui-card",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
                , "<+0.1")
            // FAB: Drops from top & bounces
            .fromTo(".svg-ui-fab",
                { y: -30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "bounce.out" }
                , "<+0.2")

            // 3. Fill Colors (Wash effect)
            .to(".svg-ui-header", { fillOpacity: 1, duration: 0.5 }, "-=0.4")
            .to(".svg-ui-profile, .svg-ui-fab", { fillOpacity: 1, duration: 0.5 }, "<")
            .to(".svg-ui-card", { fillOpacity: 1, duration: 0.5 }, "<+0.1")

            // 4. Slide Up
            .to("#preloader", {
                y: "-100%",
                duration: 1.0,
                delay: 0.2,
                ease: "power4.inOut"
            });

    } else {
        playHeroAnimation();
    }

    // --- 1. Cinematic Hero Entrance (Wrapped) ---
    function playHeroAnimation() {
        const heroTl = gsap.timeline();

        // Navbar (Global)
        if (document.querySelectorAll('.navbar').length > 0) {
            heroTl.from(".navbar", {
                y: -100,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });
        }

        // Hero Content (Home only)
        if (document.querySelectorAll('.hero-content > *').length > 0) {
            heroTl.from(".hero-content > *", {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            }, "-=0.8");
        }

        // Profile Container (Home only)
        if (document.querySelector('.profile-container')) {
            heroTl.from(".profile-container", {
                scale: 0.8,
                opacity: 0,
                rotation: 5,
                duration: 1.4,
                ease: "elastic.out(1, 0.5)"
            }, "-=1");
        }

        // Float Cards (Home only)
        if (document.querySelectorAll('.float-card').length > 0) {
            heroTl.from(".float-card", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }, "-=0.5");
        }
    }


    // --- 2. Gallery Cards Reveal ---
    // Premium fade-up for the new gallery layout
    const galleryCards = document.querySelectorAll('.gallery-card');

    galleryCards.forEach((card, i) => {
        gsap.from(card, {
            y: 80,
            opacity: 0,
            duration: 1.2,
            delay: i * 0.15, // Nice stagger
            ease: "power3.out",
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });


    // --- 3. Image Reveal Effect (Scale Out) ---
    // Targeted at gallery images now
    const galleryImages = gsap.utils.toArray('.gallery-image img');
    galleryImages.forEach(img => {
        gsap.from(img, {
            scale: 1.2,
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top 80%",
                end: "bottom 20%",
                scrub: 1.5
            }
        });
    });


    // --- 4. Interactive Letter Animation (Rubber Band) ---
    const letters = document.querySelectorAll('.interactive-text span');
    const container = document.querySelector('.interactive-text');


    if (container && letters.length > 0) {
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
        });

        // 🔥 When mouse leaves the PARENT div → instant reset
        container.addEventListener('pointerleave', () => {
            gsap.to(letters, {
                scale: 1,
                y: 0,
                color: "inherit",
                duration: 0.70,   // almost instant
                ease: "none"
            });
        });
    }

    // --- 5. Mouse Parallax (Hero) ---
    const heroSection = document.querySelector('.hero-section');
    const floatCards = document.querySelectorAll('.float-card');

    if (heroSection && floatCards.length > 0) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 30;

            gsap.to(floatCards, {
                x: x,
                y: y,
                duration: 1,
                stagger: 0.05, // Slight lag for depth
                ease: "power2.out"
            });

            const profileContainer = document.querySelector('.profile-container');
            if (profileContainer) {
                gsap.to(profileContainer, {
                    x: -x * 0.5,
                    y: -y * 0.5,
                    duration: 1,
                    ease: "power2.out"
                });
            }
        });
    }

    // --- 7. Mobile Menu & Magnetic Buttons (Standard) ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            navLinks.classList.toggle('d-none');
            const icon = menuToggle.querySelector('i');
            navLinks.classList.contains('mobile-active') ?
                (icon.classList.remove('ri-menu-line'), icon.classList.add('ri-close-line')) :
                (icon.classList.remove('ri-close-line'), icon.classList.add('ri-menu-line'));
        });
    }

    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.5, y: y * 0.5, duration: 0.5, ease: 'power2.out' });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
        });
    });

    // --- Stats Counter Animation ---
    const statsSection = document.querySelector('.stats-section');
    const statNumbers = document.querySelectorAll('.stat-number');

    if (statsSection && statNumbers.length > 0) {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));

            gsap.to(stat, {
                innerText: target,
                duration: 2.5,
                snap: { innerText: 1 },
                ease: "power2.out",
                scrollTrigger: {
                    trigger: statsSection,
                    start: "top 80%", // Start when section is 80% in view
                    toggleActions: "play none none reverse"
                },
                onUpdate: function () {
                    stat.innerText = Math.ceil(this.targets()[0].innerText);
                }
            });
        });
    }

    // --- 8. Marquee ---
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        gsap.to(marqueeContent, { xPercent: -50, ease: "none", duration: 15, repeat: -1 });
    }

    // --- 9. FAQ Hover Interaction ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const collapseElement = item.querySelector('.accordion-collapse');
        const button = item.querySelector('.accordion-button');

        if (collapseElement && button) {
            // Initialize Bootstrap Collapse instance
            // toggle: false ensures it doesn't auto-toggle on init
            const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });

            item.addEventListener('mouseenter', () => {
                // If using 'accordion' behavior (one open at a time),
                // you might want to close others manually or let Bootstrap handle it if data-bs-parent is set
                // But for hover, simultaneous open is often less jumpy or just open the one hovered
                bsCollapse.show();
                button.classList.remove('collapsed');
                button.setAttribute('aria-expanded', 'true');
            });

            item.addEventListener('mouseleave', () => {
                bsCollapse.hide();
                button.classList.add('collapsed');
                button.setAttribute('aria-expanded', 'false');
            });
        }
    });


    // --- 10. Footer Rolling Text Stagger ---
    const rollingTexts = document.querySelectorAll('.rolling-text');
    rollingTexts.forEach(text => {
        const originalContent = text.textContent;
        text.innerHTML = ''; // Clear text

        // Split into spans
        originalContent.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.classList.add('letter');
            span.style.setProperty('--index', index);

            // Handle space
            if (char === ' ') {
                span.style.marginRight = "0.2em";
            }

            text.appendChild(span);
        });
    });

    // --- 11. Services Section Animation ---
    const serviceCards = document.querySelectorAll('.service-card');

    if (serviceCards.length > 0) {
        gsap.from(serviceCards, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: serviceCards[0].parentElement.parentElement, // Trigger from the row/container
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // --- 12. Process Section Animation ---
    const processCards = document.querySelectorAll('.process-horizontal-card');

    if (processCards.length > 0) {
        gsap.from(processCards, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            stagger: 0.25,
            ease: "back.out(1.2)", // Little bounce for the steps
            scrollTrigger: {
                trigger: processCards[0].parentElement.parentElement, // Trigger from the row
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // --- 13. Gallery Card 3D Tilt Effect ---
    // Updated for new Gallery layout
    const tiltCards = document.querySelectorAll('.gallery-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            // Subtle rotation for gallery feel
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;

            gsap.to(card, {
                duration: 0.5,
                rotationX: rotateX,
                rotationY: rotateY,
                transformPerspective: 1000,
                scale: 1.02,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                duration: 0.8,
                rotationX: 0,
                rotationY: 0,
                scale: 1,
                ease: "elastic.out(1, 0.5)"
            });
        });
    });

    // --- 14. Stacked Cards Animation (Fanned Deck Effect) ---
    const stackedSection = document.querySelector('.stacked-cards-section');
    const cards = document.querySelectorAll('.stack-card');

    if (stackedSection && cards.length > 0) {
        // 1. Initial Fanned State
        // Reverse order for z-index (first code item = top visible)
        // But for visual stacking "behind", we transform them.
        const totalCards = cards.length;

        gsap.set(cards, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transformOrigin: "top center",
            zIndex: i => totalCards - i // 3, 2, 1
        });

        // Loop to set initial visual state (The Fan)
        cards.forEach((card, i) => {
            if (i > 0) {
                // Cards behind the first one
                gsap.set(card, {
                    scale: 1 - (i * 0.05), // 0.95, 0.90
                    y: i * 30, // 30px, 60px visible at bottom
                    opacity: 1 // Keep visible so we see the stack
                });
            }
        });

        // 2. Timeline
        const stackTl = gsap.timeline({
            scrollTrigger: {
                trigger: stackedSection,
                start: "top top",
                // Increase scroll distance per card to make it feel substantial
                end: () => `+=${window.innerHeight * (totalCards + 0.5)}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1
            }
        });

        // 3. Animation Logic
        cards.forEach((card, i) => {
            if (i === totalCards - 1) return; // Last card stays put

            const nextCard = cards[i + 1];

            // A: Current Card Slides Away
            stackTl.to(card, {
                y: -100,
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: "power2.inOut"
            })
                // B: Next Card Moves Up/Forward
                .to(nextCard, {
                    scale: 1,
                    y: 0,
                    boxShadow: "0 20px 50px rgba(0,0,0,0.15)", // Enhance shadow as it becomes active
                    duration: 1,
                    ease: "power2.inOut"
                }, "<"); // Run concurrently with A (Card swap effect)

            // C: Shift remaining cards (optional polish: move card 3 into card 2's spot)
            if (i + 2 < totalCards) {
                const thirdCard = cards[i + 2];
                stackTl.to(thirdCard, {
                    scale: 1 - (1 * 0.05), // Move to "next up" slot (0.95)
                    y: 1 * 30,
                    duration: 1,
                    ease: "power2.inOut"
                }, "<");
            }
        });
    }

    // --- 15. Featured Work Grid Animation (Fade Up) ---
    const projectCards = document.querySelectorAll('.project-card');

    if (projectCards.length > 0) {
        gsap.from(projectCards, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power4.out", // Smoother easing
            scrollTrigger: {
                trigger: "#work",
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });

        // Tilt Effect on Mouse Move (Optional Premium Touch)
        projectCards.forEach(card => {
            const imageContainer = card.querySelector('.project-image-container');
            if (!imageContainer) return; // Skip cards without image container (e.g., "See More")

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = ((y - centerY) / centerY) * -2; // Max 2deg rotation
                const rotateY = ((x - centerX) / centerX) * 2;

                gsap.to(imageContainer, {
                    duration: 0.5,
                    rotationX: rotateX,
                    rotationY: rotateY,
                    ease: "power1.out",
                    transformPerspective: 500
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(imageContainer, {
                    duration: 0.8,
                    rotationX: 0,
                    rotationY: 0,
                    ease: "elastic.out(1, 0.5)"
                });
            });
        });
    }

    // --- 12. Contact Form Entrance Animation ---
    const contactSection = document.querySelector('.contact-container');
    if (contactSection) {
        gsap.from(contactSection.children, {
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
                trigger: contactSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    }

    // (End of previous code)

    // --- 12. Contact Form AJAX Submission ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const statusDiv = document.getElementById('form-status');
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerText;

            // Form Data
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value;





            // Set Loading State
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";
            statusDiv.style.display = 'none';
            statusDiv.className = 'mb-4'; // Reset classes

            try {
                const response = await fetch("https://formsubmit.co/ajax/shahulhamd456@gmail.com", {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.status === 200) {
                    // FormSubmit.co usually returns 200 OK. We can trust that.
                    // Success!
                    statusDiv.style.display = 'block';
                    statusDiv.innerHTML = `
                       <div class="alert alert-success d-flex align-items-center gap-2" role="alert">
                           <i class="ri-checkbox-circle-fill fs-4"></i>
                           <div>
                               <strong>Message Sent!</strong>
                           </div>
                       </div>
                       </div>
                   `;

                    // Smooth Entrance for Success Message
                    gsap.fromTo(statusDiv,
                        { height: 0, opacity: 0, marginTop: 0 },
                        { height: "auto", opacity: 1, marginTop: "1.5rem", duration: 0.5, ease: "power2.out" }
                    );

                    contactForm.reset();
                    submitBtn.innerText = "Sent";
                    // Optional: Re-enable button after a while
                    // Optional: Re-enable button after a while
                    setTimeout(() => {
                        gsap.to(statusDiv, {
                            opacity: 0,
                            duration: 0.5,
                            onComplete: () => {
                                statusDiv.style.display = 'none';
                                statusDiv.style.opacity = 1; // Reset for next time
                                submitBtn.disabled = false;
                                submitBtn.innerText = originalBtnText;
                            }
                        });
                    }, 3000);

                } else {
                    // Server Error or user error
                    statusDiv.innerHTML = "Oops! There was a problem submitting your form";
                    statusDiv.className = 'mb-4 alert alert-danger';
                    statusDiv.style.display = 'block';
                    submitBtn.disabled = false;
                    submitBtn.innerText = originalBtnText;
                }

            } catch (error) {
                // Network Error
                statusDiv.innerHTML = "Oops! There was a problem submitting your form";
                statusDiv.className = 'mb-4 alert alert-danger';
                statusDiv.style.display = 'block';
                submitBtn.disabled = false;
                submitBtn.innerText = originalBtnText;
            }
        });
    }

}); // End DOMContentLoaded

