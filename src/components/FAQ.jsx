import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './FAQ.module.scss';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: 'How long does a premium website project take?',
      a: 'Typically, a luxury redesign project takes anywhere from 4 to 8 weeks, depending on the number of bespoke custom animations, complexity, and content gathering requirements.'
    },
    {
      q: 'Will our team be able to edit the website content?',
      a: 'Absolutely. We configure a headless CMS (like Sanity or Contentful) or structure our codebases modularly so your marketing team can update copies and imagery without breaking layout systems.'
    },
    {
      q: 'How do you ensure high performance with complex animations?',
      a: 'We leverage GSAP and Framer Motion because they run calculations outside the main render loop. We also enforce asset compression, utilize hardware acceleration properties, and optimize layouts to achieve 90+ Lighthouse targets.'
    }
  ];

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.header}>
        <span className={styles.tag}>Information Hub</span>
        <h2 className={styles.title}>FAQ</h2>
      </div>

      <div className={styles.list}>
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={styles.item}>
              <button className={`${styles.trigger} hover-target`} onClick={() => toggle(idx)}>
                <h3>{faq.q}</h3>
                <FiChevronDown className={`${styles.icon} ${isOpen ? styles.active : ''}`} />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className={styles.answer}
                  >
                    <p style={{ paddingBottom: '1.5rem' }}>{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
