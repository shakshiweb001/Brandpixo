import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <div className={styles.code} aria-hidden="true">404</div>
      <div className={styles.content}>
        <span>Wrong turn / right direction</span>
        <h1>This page doesn’t exist.</h1>
        <p>The link may have moved, but your next digital idea still has somewhere to go.</p>
        <div className={styles.actions}>
          <Link to="/">Return home <FiArrowRight /></Link>
          <Link to="/services">Explore BrandPixo services</Link>
        </div>
      </div>
    </main>
  );
}
