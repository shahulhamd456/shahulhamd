import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import { useLocation } from 'react-router-dom';
import useMagneticEffect from '../hooks/useMagneticEffect';

const Layout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    useMagneticEffect();

    // Disable scroll while loading and force top
    useEffect(() => {
        if (loading) {
            document.body.style.overflow = "hidden";
            window.scrollTo(0, 0);
        } else {
            document.body.style.overflow = "";
        }
    }, [loading]);

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            {loading && <Preloader onComplete={() => setLoading(false)} />}

            {!loading && <Navbar />}

            <main style={{ minHeight: '100vh', opacity: loading ? 0 : 1, transition: 'opacity 0.5s ease' }}>
                {!loading && children}
            </main>

            {!loading && <Footer />}
        </>
    );
};

export default Layout;
