import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import styles from './PremiumShowcasePages.module.scss';

const projects = [
  { title: 'Aura Hospitality', category: 'Branding', service: 'Identity & digital experience', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=88' },
  { title: 'Velo Commerce', category: 'Development', service: 'Commerce platform', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=88' },
  { title: 'Equinox Studio', category: 'Branding', service: 'Brand identity system', image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&w=1400&q=88' },
  { title: 'Solstice Growth', category: 'Marketing', service: 'Performance campaign', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1400&q=88' },
  { title: 'Noir Residences', category: 'Development', service: 'Luxury property platform', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=88' },
  { title: 'Maison Form', category: 'Marketing', service: 'Launch campaign', image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1400&q=88' },
];

export default function PortfolioPage() {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Branding', 'Development', 'Marketing'];
  const visible = filter === 'All' ? projects : projects.filter((project) => project.category === filter);

  return (
    <main className={styles.page}>
      <section className={`${styles.hero} ${styles.portfolioHero}`}>
        <span className={styles.eyebrow}>BrandPixo / Selected work</span>
        <motion.h1 initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>Portfolio</motion.h1>
        <nav className={styles.heroBreadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Portfolio</strong></nav>
        <p className={styles.heroDescription}>A focused selection of brand, digital, and campaign concepts demonstrating the craft and thinking behind our work.</p>
      </section>

      <section className={styles.workSection}>
        <div className={styles.filterBar}>
          <span>{String(visible.length).padStart(2, '0')} projects</span>
          <div>{categories.map((category) => <button key={category} className={filter === category ? styles.activeFilter : ''} onClick={() => setFilter(category)}>{category}</button>)}</div>
        </div>
        <motion.div layout className={styles.workGrid}>
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <motion.article layout key={project.title} className={`${styles.workCard} ${index % 3 === 0 ? styles.featuredWork : ''}`} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.55 }}>
                <div className={styles.workImage}><img src={project.image} alt={project.title} /><span>{project.category}</span></div>
                <div className={styles.workMeta}><div><h2>{project.title}</h2><p>{project.service}</p></div></div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className={styles.pageCta}>
        <span className={styles.eyebrow}>Your project could be next</span>
        <h2>Build something worth remembering.</h2>
        <Link to="/contact">Discuss your project <FiArrowUpRight /></Link>
      </section>
    </main>
  );
}
