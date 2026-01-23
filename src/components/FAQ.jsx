import React, { useState } from 'react';
import gsap from 'gsap';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
    const contentRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen) {
            gsap.to(contentRef.current, {
                height: "auto",
                opacity: 1,
                paddingTop: "1rem", // Add some padding when opening if needed, or keep in CSS
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(contentRef.current, {
                height: 0,
                opacity: 0,
                paddingTop: 0,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isOpen]);

    return (
        <div className="accordion-item glass-accordion-item mb-3" onMouseEnter={() => onClick(true)} onMouseLeave={() => onClick(false)}>
            <h2 className="accordion-header">
                <button
                    className={`accordion-button ${isOpen ? '' : 'collapsed'}`}
                    type="button"
                    style={{ background: 'transparent', boxShadow: 'none' }} // Ensure no default bootstrap overrides
                    aria-expanded={isOpen}
                >
                    {question}
                </button>
            </h2>
            <div
                ref={contentRef}
                className="accordion-collapse"
                style={{ height: 0, opacity: 0, overflow: 'hidden' }} // Initial state
            >
                <div className="accordion-body">
                    {answer}
                </div>
            </div>
        </div>
    );
};

const FAQ = () => {
    // We can use state to track which open is open
    // BUT the original main.js logic (Step 13) uses `mouseenter` and `mouseleave` for specific items.
    // It says: item.addEventListener('mouseenter', ... bsCollapse.show())
    // So it's a hover effect essentially.

    // In React, we can track open state by ID. 
    // Wait, original logic shows one at a time? No, it just shows current one on hover.

    const [openId, setOpenId] = useState(null);

    return (
        <section className="section-padding">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-header center-text">
                            <h2 style={{ paddingBottom: '50px' }}>Frequently Asked Questions</h2>
                        </div>

                        <div className="accordion glass-panel p-4" id="faqAccordion">

                            <FAQItem
                                question="What tools do you use for design?"
                                answer="I primarily use Figma for interface design and prototyping. For motion, I use ProtoPie or After Effects, and for development, I use VS Code."
                                isOpen={openId === 1}
                                onClick={(val) => setOpenId(val !== false ? 1 : null)}
                            />

                            <FAQItem
                                question="Do you do coding as well?"
                                answer="Yes! I am a hybrid designer-developer. I write clean HTML, CSS, and React code, ensuring that the final product looks exactly like the design."
                                isOpen={openId === 2}
                                onClick={(val) => setOpenId(val !== false ? 2 : null)}
                            />

                            <FAQItem
                                question="Are you available for freelance projects?"
                                answer="Currently, I am open to freelance opportunities and full-time roles. Feel free to contact me to discuss your project."
                                isOpen={openId === 3}
                                onClick={(val) => setOpenId(val !== false ? 3 : null)}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
