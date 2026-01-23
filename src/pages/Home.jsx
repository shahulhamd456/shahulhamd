import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import Marquee from '../components/Marquee';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Process from '../components/Process';
import FeaturedWork from '../components/FeaturedWork';
import FAQ from '../components/FAQ';

const Home = () => {

  useEffect(() => {
    // Any page specific initializations
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Process />
      <FeaturedWork />
      <FAQ />
    </>
  );
};

export default Home;
