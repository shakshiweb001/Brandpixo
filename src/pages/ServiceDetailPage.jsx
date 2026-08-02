import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiChevronDown,
  FiMail,
  FiPhone,
  FiPlay,
  FiPlus
} from 'react-icons/fi';
import { servicesData } from '../data/servicesData';
import styles from './ServiceDetailPage.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } }
};

export default function ServiceDetailPage() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = servicesData[serviceId];
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpenFaq(0);
  }, [serviceId]);

  if (!service) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h2>Service not found.</h2>
          <Link to="/services">Back to services</Link>
        </div>
      </main>
    );
  }

  const otherServices = Object.entries(servicesData)
    .filter(([id]) => id !== serviceId)
    .slice(0, 2);
  const processItems = service.process.length >= 3
    ? service.process.slice(0, 3)
    : [
        ...service.process,
        { title: 'Quality Assurance & Handover', desc: 'Refining every detail, validating the final work, and preparing a smooth delivery.' }
      ].slice(0, 3);

  const faqItems = [
    ...service.faqs,
    {
      q: `What is included in a ${service.title} engagement?`,
      a: 'Discovery, strategic direction, production, quality assurance, and a polished final handover are included. Your exact deliverables are confirmed before work begins.'
    },
    {
      q: 'How long does the project usually take?',
      a: `Most ${service.title.toLowerCase()} projects move from kickoff to delivery within four to eight weeks, depending on scope and feedback speed.`
    },
    {
      q: 'How do feedback and revisions work?',
      a: 'Feedback is gathered at clear milestones. Every phase includes focused refinement before approval, keeping decisions calm and progress predictable.'
    }
  ];

  return (
    <main className={styles.page}>
      <section className={styles.titleBanner}>
        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.kicker}>BrandPixo / Services</span>
          <h1>Service Detail</h1>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>/</span><Link to="/services">Services</Link><span>/</span><strong>{service.title}</strong>
          </nav>
        </motion.div>
      </section>

      <section className={styles.detailLayout}>
        <div className={styles.mainColumn}>
          <motion.div className={styles.heroMedia} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75 }}>
            <img src={service.heroImage} alt={service.title} />
            <span>{service.category}</span>
          </motion.div>

          <div className={styles.sectionIntro}>
            <span className={styles.eyebrow}><FiPlus /> What we offer</span>
            <h2>{service.title}</h2>
            <p>{service.aboutText}</p>
          </div>

          <div className={styles.offerGrid}>
            <article>
              <span>Core features</span>
              <ul>
                {service.features.map((feature) => <li key={feature.title}><FiCheck /> {feature.title}</li>)}
              </ul>
            </article>
            <article>
              <span>What this improves</span>
              <ul>
                {service.benefits.map((benefit) => <li key={benefit.title}><FiCheck /> {benefit.title}</li>)}
                <li><FiCheck /> Thoughtful quality assurance</li>
                <li><FiCheck /> Clear final handover</li>
              </ul>
            </article>
          </div>

          <div className={styles.whyChoose}>
            <span className={styles.eyebrow}>Why choose BrandPixo</span>
            <h3>{service.tagline}</h3>
            <p>We combine strategic clarity with high-end execution, so the finished work feels distinctive, performs reliably, and stays useful as your business grows.</p>
            <div className={styles.reasons}>
              {['Senior-led expertise', 'Tailored strategy', 'Refined creative craft', 'Results-oriented delivery'].map((reason) => (
                <span key={reason}><FiCheck /> {reason}</span>
              ))}
            </div>
          </div>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sideHeading}><span>Explore</span><h3>Other Services</h3></div>
          {otherServices.map(([id, item]) => (
            <Link className={`${styles.serviceLink} hover-target`} to={`/services/${id}`} key={id}>
              <span>{item.category}</span>
              <strong>{item.title}</strong>
              <FiArrowUpRight />
            </Link>
          ))}
          <div className={styles.contactCard}>
            <span>Start a conversation</span>
            <a href="tel:+15550192834"><FiPhone /><div><small>Talk with an expert</small><strong>+1 (555) 019-2834</strong></div></a>
            <a href="mailto:hello@brandpixo.com"><FiMail /><div><small>Email us</small><strong>hello@brandpixo.com</strong></div></a>
            <button className="hover-target" onClick={() => navigate('/contact')}>Get in touch <FiArrowRight /></button>
          </div>
        </aside>
      </section>

      <section className={styles.processSection}>
        <div className={styles.processHeader}>
          <span className={styles.eyebrow}><FiPlus /> Our process</span>
          <h2>A smooth workflow from first idea to final delivery.</h2>
        </div>
        <div className={styles.processGrid}>
          {processItems.map((item, index) => (
            <motion.article key={item.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-70px' }} variants={fadeUp}>
              <div><span>0{index + 1}</span><strong>{index === 0 ? 'Discover' : index === processItems.length - 1 ? 'Deliver' : 'Develop'}</strong></div>
              <FiPlus />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.article>
          ))}
        </div>

        <div className={styles.processVisual}>
          <img src={service.portfolio[0]?.image || service.heroImage} alt="Our creative process" />
          <div><button aria-label="View our work" onClick={() => navigate('/portfolio')}><FiPlay /></button><h3>See thoughtful craft<br />behind our digital work.</h3></div>
        </div>
      </section>

      <section className={styles.faqSection}>
        <div className={styles.faqHeader}>
          <span className={styles.eyebrow}><FiPlus /> FAQs</span>
          <h2>Frequently asked questions</h2>
        </div>
        <div className={styles.faqList}>
          {faqItems.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div className={`${styles.faqItem} ${isOpen ? styles.open : ''}`} key={faq.q}>
                <button onClick={() => setOpenFaq(isOpen ? null : index)} aria-expanded={isOpen}>
                  <span>{faq.q}</span><FiChevronDown />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p>{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <section className={styles.bottomCta}>
        <div><span>Build with BrandPixo</span><h2>Is your business ready for the <em>digital leap?</em></h2><p>Let’s shape a premium digital experience around your next stage of growth.</p></div>
        <div className={styles.ctaContact}>
          <a href="tel:+15550192834"><FiPhone /><span><small>Talk with an expert</small><strong>+1 (555) 019-2834</strong></span></a>
          <a href="mailto:hello@brandpixo.com"><FiMail /><span><small>Email us</small><strong>hello@brandpixo.com</strong></span></a>
          <button className="hover-target" onClick={() => navigate('/contact')}>Start your project <FiArrowRight /></button>
        </div>
      </section>
    </main>
  );
}
