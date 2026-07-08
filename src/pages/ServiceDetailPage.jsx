import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck } from 'react-icons/fi';
import { servicesData } from '../data/servicesData';
import styles from './ServiceDetailPage.module.scss';

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const service = servicesData[serviceId];
  const [openFaq, setOpenFaq] = useState(null);

  // Scroll to top on load/navigation
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Service not found. <Link to="/services">Go back to Services</Link></h2>
      </div>
    );
  }

  // Duplicate tech list for continuous marquee loop
  const marqueeList = [...service.technologies, ...service.technologies];

  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.page}>
      {/* 1. Hero */}
      <section className={styles.hero}>
        <div>
          <nav className={styles.breadcrumbs}>
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/services">Services</Link>
            <span>/</span>
            <span>{service.title}</span>
          </nav>
          <h1 className={styles.heroTitle}>{service.title}</h1>
          <button onClick={handleCtaClick} className={styles.btnPrimary}>
            Request Consultation
          </button>
        </div>
        <div className={styles.heroImageWrap}>
          <img src={service.heroImage} alt={service.title} />
        </div>
      </section>

      {/* 2. About */}
      <section className={styles.aboutSection}>
        <div className={styles.aboutCard}>
          <h2 className={styles.sectionTitle} style={{ textAlign: 'left', marginBottom: '1.5rem' }}>About Service</h2>
          <p style={{ fontSize: '1.1rem', color: '#6B6B6B', lineHeight: '1.7' }}>{service.aboutText}</p>
        </div>
        <div>
          <img 
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
            alt="Creative Team Workspace" 
            style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}
            loading="lazy"
          />
        </div>
      </section>

      {/* 3. Why Choose */}
      <section className={styles.whySection}>
        <h2 className={styles.sectionTitle}>Why Choose This</h2>
        <div className={styles.whyGrid}>
          {service.features.map((feat, idx) => (
            <div key={idx} className={styles.whyCard}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem', color: '#181818' }}>{feat.title}</h3>
              <p style={{ color: '#6B6B6B', fontSize: '0.95rem' }}>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Process */}
      <section className={styles.processSection}>
        <h2 className={styles.sectionTitle}>Execution Process</h2>
        <div className={styles.processList}>
          {service.process.map((proc, idx) => (
            <div key={idx} className={styles.processItem}>
              <span className={styles.processNum}>0{idx + 1}</span>
              <div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.5rem', color: '#181818' }}>{proc.title}</h3>
                <p style={{ color: '#6B6B6B', fontSize: '1rem' }}>{proc.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Benefits */}
      <section className={styles.benefitsSection}>
        <h2 className={styles.sectionTitle}>Main Benefits</h2>
        <div className={styles.benefitsGrid}>
          {service.benefits.map((ben, idx) => (
            <div key={idx} className={styles.benefitCard}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '600', color: '#181818' }}>{ben.title}</h3>
              <p style={{ color: '#6B6B6B', fontSize: '0.95rem' }}>{ben.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Portfolio */}
      <section className={styles.portfolioSection}>
        <h2 className={styles.sectionTitle}>Related Cases</h2>
        <div className={styles.portfolioGrid}>
          {service.portfolio.map((port, idx) => (
            <div key={idx} className={styles.portfolioCard}>
              <img src={port.image} alt={port.title} loading="lazy" />
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{port.title}</h3>
                <span style={{ color: '#6B6B6B', fontSize: '0.9rem' }}>{port.category}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Technologies */}
      <section className={`dark-section ${styles.techSection}`}>
        <h2 className={styles.techTitle}>Tech & Frameworks</h2>
        <div className={styles.marqueeContainer}>
          <div className={styles.marquee}>
            {marqueeList.map((tech, idx) => (
              <span key={idx} style={{ paddingRight: '4rem' }}>{tech}</span>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>Client Perspective</h2>
        {service.testimonials.map((test, idx) => (
          <div key={idx} className={styles.testCard}>
            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem', color: '#181818' }}>"{test.quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
              <img src={test.avatar} alt={test.author} style={{ width: '50px', height: '50px', borderRadius: '50%' }} loading="lazy" />
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontWeight: '600' }}>{test.author}</h4>
                <span style={{ color: '#6B6B6B', fontSize: '0.85rem' }}>{test.role}</span>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 9. FAQ */}
      <section className={styles.faqSection}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <div style={{ marginTop: '4rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {service.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} style={{ borderBottom: '1px solid #EAEAEA', paddingBottom: '1rem' }}>
                <button 
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  style={{ width: '100%', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 0', cursor: 'pointer', textAlign: 'left' }}
                >
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '600' }}>{faq.q}</h3>
                  <FiChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden', color: '#6B6B6B', fontSize: '0.95rem' }}
                    >
                      <p style={{ padding: '0.5rem 0 1.5rem 0' }}>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* 10. Contact CTA */}
      <section className={`dark-section ${styles.contactCta}`} id="contact">
        <h2>Launch your next product with BrandPixo</h2>
        <button onClick={handleCtaClick} className={styles.btnPrimary}>
          Get In Touch
        </button>
      </section>
    </div>
  );
}
