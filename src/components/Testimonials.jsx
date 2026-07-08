import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.scss';

export default function Testimonials() {
  const [width, setWidth] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    if (trackRef.current) {
      setWidth(trackRef.current.scrollWidth - trackRef.current.offsetWidth);
    }
  }, []);

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

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={styles.header}>
        <span className={styles.tag}>Client Feedback</span>
        <h2 className={styles.title}>What They Say</h2>
      </div>

      <div className={styles.carouselContainer}>
        <motion.div 
          ref={trackRef} 
          className={styles.carouselTrack}
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
        >
          {testimonialsData.map((test, index) => (
            <motion.div 
              key={index}
              className={styles.card}
            >
              <p className={styles.quote}>"{test.quote}"</p>
              <div className={styles.profile}>
                <img src={test.avatar} alt={test.name} className={styles.avatar} loading="lazy" />
                <div className={styles.info}>
                  <span className={styles.name}>{test.name}</span>
                  <span className={styles.role}>{test.role}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
