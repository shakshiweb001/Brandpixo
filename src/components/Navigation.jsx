import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';
import logo from '../assets/logo.svg';

function MegaMenu({ setMegaOpen }) {
  const menuCategories = [
    {
      title: 'Development',
      items: [
        { name: 'Custom Website Development', id: 'custom-website' },
        { name: 'WordPress Development', id: 'wordpress' },
        { name: 'Landing Page Development', id: 'landing-page' },
        { name: 'Shopify Development', id: 'shopify' }
      ]
    },
    {
      title: 'Design',
      items: [
        { name: 'UI/UX Design', id: 'ui-ux' },
        { name: 'Graphic Design', id: 'graphic-design' },
        { name: 'Brand Identity Design', id: 'brand-identity' }
      ]
    },
    {
      title: 'Marketing',
      items: [
        { name: 'SEO Optimization', id: 'seo' },
        { name: 'Social Media Marketing', id: 'social-media' },
        { name: 'Performance Marketing', id: 'performance-marketing' }
      ]
    }
  ];

  return (
    <div 
      className={styles.megaMenu}
      onMouseEnter={() => setMegaOpen(true)}
      onMouseLeave={() => setMegaOpen(false)}
    >
      <div className={styles.megaGrid}>
        {menuCategories.map((cat, idx) => (
          <div key={idx} className={styles.megaCol}>
            <h4 className={styles.megaColTitle}>{cat.title}</h4>
            <ul className={styles.megaColList}>
              {cat.items.map((item) => (
                <li key={item.id}>
                  <Link 
                    to={`/services/${item.id}`} 
                    className={`${styles.megaItem} hover-target`}
                    onClick={() => setMegaOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkActive, setDarkActive] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect dark section overlays
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

  const navigateToSection = (sectionId) => {
    if (window.location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    navigateToSection('contact');
  };

  const navClass = `${styles.nav} ${scrolled ? styles.scrolled : ''} ${darkActive ? styles.darkSectionActive : ''}`;

  return (
    <nav className={navClass}>
      <div className={styles.logo} onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <img src={logo} alt="BrandPixo" />
      </div>
      
      <div className={styles.links}>
        <span onClick={() => navigateToSection('about')} className={styles.link}>About</span>
        
        <div 
          className={styles.menuTrigger}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <Link to="/services" className={styles.link}>Services</Link>
          {megaOpen && <MegaMenu setMegaOpen={setMegaOpen} />}
        </div>

        <span onClick={() => navigateToSection('process')} className={styles.link}>Process</span>
        <span onClick={() => navigateToSection('portfolio')} className={styles.link}>Portfolio</span>
        <span onClick={() => navigateToSection('contact')} className={styles.link}>Contact</span>
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
        <span className={styles.mobileLink} onClick={() => { navigateToSection('about'); setMobileOpen(false); }}>About</span>
        <Link to="/services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Services</Link>
        <span className={styles.mobileLink} onClick={() => { navigateToSection('process'); setMobileOpen(false); }}>Process</span>
        <span className={styles.mobileLink} onClick={() => { navigateToSection('portfolio'); setMobileOpen(false); }}>Portfolio</span>
        <span className={styles.mobileLink} onClick={() => { navigateToSection('contact'); setMobileOpen(false); }}>Contact</span>
      </div>
    </nav>
  );
}
