import React from 'react';
import useSmoothScroll from './hooks/useSmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Process from './components/Process';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import WhyChooseUs from './components/WhyChooseUs';
import Technologies from './components/Technologies';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  // Initialize Lenis Smooth Scroll
  useSmoothScroll();

  return (
    <>
      <CustomCursor />
      <Navigation />
      <Hero />
      <About />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <WhyChooseUs />
      <Technologies />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
