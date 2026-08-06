import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiArrowUp } from 'react-icons/fi';
import styles from './Footer.module.scss';

export default function Footer() {
  const navigate = useNavigate();

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`dark-section ${styles.footer}`}>
      <div className={styles.top}>
        <div className={styles.ctaText}>
          <h2>Ready to elevate your brand?</h2>
          <p>Let's design premium solutions built around your goals.</p>
        </div>
        <button 
          className={`${styles.btnPrimary} hover-target`}
          onClick={() => navigate('/contact')}
        >
          Get In Touch
        </button>
      </div>

      <div className={styles.middle}>
        <div className={styles.brand}>
          <div className={styles.logo}>BrandPixo</div>
          <p>We are a full-service creative digital agency engineering high-end designs and digital marketing solutions.</p>
        </div>
        
        <div className={styles.linksCol}>
          <h4>Agency</h4>
          <ul>
            <li><Link to="/about" className="hover-target">About Us</Link></li>
            <li><Link to="/services" className="hover-target">Our Services</Link></li>
            <li><Link to="/work" className="hover-target">Selected Work</Link></li>
            <li><Link to="/blog" className="hover-target">Journal</Link></li>
          </ul>
        </div>

        <div className={styles.linksCol}>
          <h4>Connect</h4>
          <ul>
            <li><Link to="/contact" className="hover-target">Get a Quote</Link></li>
            <li><a href="mailto:brandpixo@gmail.com" className="hover-target">brandpixo@gmail.com</a></li>
            <li><a href="https://wa.me/919805312402" target="_blank" rel="noreferrer" className="hover-target">WhatsApp: +91 98053 12402</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>&copy; {new Date().getFullYear()} BrandPixo. All rights reserved.</span>

        <nav className={styles.legalLinks} aria-label="Legal">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-and-conditions">Terms &amp; Conditions</Link>
        </nav>
        
        <div className={styles.socials}>
          <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="hover-target" aria-label="BrandPixo on Instagram"><FiInstagram /></a>
          <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover-target" aria-label="BrandPixo on Facebook"><FiFacebook /></a>
        </div>

        <button className={`${styles.backToTop} hover-target`} onClick={scrollUp} aria-label="Back to top">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
