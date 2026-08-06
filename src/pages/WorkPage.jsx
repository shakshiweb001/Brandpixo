import React from 'react';
import { Link } from 'react-router-dom';
import ProjectGallery from '../components/ProjectGallery';
import styles from './WorkPage.module.scss';

export default function WorkPage() {
  return <main className={styles.page}>
    <section className={styles.hero}>
      <div className={styles.breadcrumbs}><Link to="/">Home</Link><span>/</span><strong>Work</strong></div>
      <span>Selected digital experiences</span>
      <h1>Work that moves<br /><mark>business forward.</mark></h1>
      <div><p>Explore complete website experiences. Hover over any project to travel from its first screen to its final section, then select it to discuss a similar build.</p><strong>06 projects</strong></div>
    </section>
    <section className={`dark-section ${styles.gallery}`}>
      <ProjectGallery />
    </section>
  </main>;
}
