import React from 'react';
import styles from './Technologies.module.scss';

export default function Technologies() {
  const techs = [
    'React',
    'GSAP',
    'Framer Motion',
    'Three.js',
    'Lenis Scroll',
    'SCSS Modules',
    'Vite',
    'JavaScript'
  ];

  // Duplicate items for infinite scroll rendering
  const listItems = [...techs, ...techs];

  return (
    <section className={`dark-section ${styles.technologies}`}>
      <div className={styles.header}>
        <h2>Our Tech Stack</h2>
        <p>We deploy modern frameworks and high-performance libraries to execute robust layouts.</p>
      </div>

      <div className={styles.marqueeContainer}>
        <div className={styles.marquee}>
          {listItems.map((tech, idx) => (
            <div key={idx} className={`${styles.item} hover-target`}>
              <div className={styles.dot} />
              <span>{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
