import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Portfolio.module.scss';

export default function Portfolio() {
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Branding', 'Development', 'Marketing'];

  const projects = [
    {
      title: 'Aura Luxury Hotel',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Velo E-Commerce',
      category: 'Development',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Solstice Agency Campaign',
      category: 'Marketing',
      image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Equinox Brand Identity',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section className={styles.portfolio} id="portfolio">
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Work</h2>
        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.filterBtn} ${filter === cat ? styles.active : ''} hover-target`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              key={project.title}
              className={styles.card}
            >
              <div className={styles.imageWrap}>
                <img src={project.image} alt={project.title} loading="lazy" />
              </div>
              <div className={styles.details}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <span className={styles.category}>{project.category}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
