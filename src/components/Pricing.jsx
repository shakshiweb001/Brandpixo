import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import styles from './Pricing.module.scss';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$999',
      features: [
        'Brand Identity package',
        'Single-page landing website',
        'Basic SEO optimization',
        '1 Month support'
      ]
    },
    {
      name: 'Growth',
      price: '$2,499',
      featured: true,
      features: [
        'Complete brand identity package',
        'Multi-page responsive website',
        'GSAP advanced animation setups',
        'SEO optimization & Analytics integration',
        '3 Months priority support'
      ]
    },
    {
      name: 'Enterprise',
      price: '$4,999',
      features: [
        'Custom interactive 3D WebGL site',
        'Bespoke visual content production',
        'Ongoing conversion rate audits',
        'Dedicated marketing strategist access',
        'Lifetime platform warranty'
      ]
    }
  ];

  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.header}>
        <span className={styles.tag}>Transparent Fees</span>
        <h2 className={styles.title}>Luxury Agency Packages</h2>
      </div>

      <div className={styles.grid}>
        {plans.map((plan, idx) => (
          <motion.div 
            key={idx}
            className={`${styles.card} ${plan.featured ? styles.featuredCard : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
          >
            <span className={styles.planName}>{plan.name}</span>
            <div className={styles.price}>
              <span className={styles.amount}>{plan.price}</span>
              <span className={styles.period}>/ project</span>
            </div>
            
            <ul className={styles.features}>
              {plan.features.map((feat, fIdx) => (
                <li key={fIdx}>
                  <FiCheck />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            <button className={`${styles.btn} ${plan.featured ? styles.featuredBtn : ''} hover-target`}>
              Select Plan
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
