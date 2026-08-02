import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navigation.module.scss';
import logo from '../assets/brandpixo-logo.png';

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

  const handleCtaClick = () => {
    navigate('/contact');
  };

  const navClass = `${styles.nav} ${scrolled ? styles.scrolled : ''} ${darkActive ? styles.darkSectionActive : ''}`;

  return (
    <nav className={navClass}>
      <div className={styles.logo} onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
        <img src={logo} alt="BrandPixo" />
      </div>
      
      <div className={styles.links}>
        <Link to="/about" className={styles.link}>About</Link>
        
        <div 
          className={styles.menuTrigger}
          onMouseEnter={() => setMegaOpen(true)}
          onMouseLeave={() => setMegaOpen(false)}
        >
          <Link to="/services" className={styles.link}>Services</Link>
          {megaOpen && <MegaMenu setMegaOpen={setMegaOpen} />}
        </div>

        <Link to="/portfolio" className={styles.link}>Portfolio</Link>
        <Link to="/blog" className={styles.link}>Blog</Link>
        <Link to="/contact" className={styles.link}>Contact</Link>
        <button onClick={handleCtaClick} className={`${styles.cta} magnetic-button`}>
          Start Project
        </button>
      </div>

      <button 
        className={`${styles.burger} ${mobileOpen ? styles.active : ''}`} 
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={mobileOpen}
        aria-controls="mobile-navigation"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div id="mobile-navigation" className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        <Link to="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/services" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Services</Link>
        <Link to="/portfolio" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Portfolio</Link>
        <Link to="/blog" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Blog</Link>
        <Link to="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact</Link>
      </div>
    </nav>
  );
}
