import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.scss';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkActive, setDarkActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect if we are scrolling over a dark section
      const darkSections = document.querySelectorAll('.dark-section');
      let isDarkActive = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 60) {
          isDarkActive = true;
        }
      });
      setDarkActive(isDarkActive);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const navClass = `${styles.nav} ${scrolled ? styles.scrolled : ''} ${darkActive ? styles.darkSectionActive : ''}`;

  return (
    <nav className={navClass}>
      <div className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        BrandPixo
      </div>
      
      <div className={styles.links}>
        <a href="#about" className={styles.link}>About</a>
        <a href="#services" className={styles.link}>Services</a>
        <a href="#process" className={styles.link}>Process</a>
        <a href="#portfolio" className={styles.link}>Portfolio</a>
        <a href="#contact" className={styles.link}>Contact</a>
        <button onClick={handleCtaClick} className={`${styles.cta} magnetic-button`}>
          Start Project
        </button>
      </div>

      <button 
        className={`${styles.burger} ${mobileOpen ? styles.active : ''}`} 
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <a href="#about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</a>
        <a href="#services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Services</a>
        <a href="#process" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Process</a>
        <a href="#portfolio" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Portfolio</a>
        <a href="#contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</a>
      </div>
    </nav>
  );
}
