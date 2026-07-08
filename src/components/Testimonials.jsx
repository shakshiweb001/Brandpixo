import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.scss';

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const testimonialsData = [
    {
      quote: "BrandPixo transformed our online presence. Their design process was collaborative and the visual assets they generated put us in a league of our own.",
      name: "Sarah Jenkins",
      role: "CEO, Aura Luxury Group",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "The web development team delivered a high-performance e-commerce platform that increased our sales conversion metrics by 40% in just two months.",
      name: "Marcus Vance",
      role: "Founder, Velo Co.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80"
    },
    {
      quote: "Their digital marketing strategy is highly targeted and data-driven. The SEO ranking results exceeded our expectations within the first quarter.",
      name: "Elena Rostova",
      role: "Marketing Director, Solstice",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [testimonialsData.length]);

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.header}>
        <span className={styles.tag}>Client Feedback</span>
        <h2 className={styles.title}>What They Say</h2>
      </div>

      <div className={styles.carouselContainer}>
        <motion.div 
          className={styles.carouselTrack}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {testimonialsData.map((test, idx) => (
            <div key={idx} className={styles.slide}>
              <div className={styles.card}>
                <p className={styles.quote}>"{test.quote}"</p>
                <div className={styles.profile}>
                  <img src={test.avatar} alt={test.name} className={styles.avatar} loading="lazy" />
                  <div className={styles.info}>
                    <span className={styles.name}>{test.name}</span>
                    <span className={styles.role}>{test.role}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className={styles.dots}>
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              className={`${styles.dot} ${index === idx ? styles.activeDot : ''} hover-target`}
              onClick={() => setIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
