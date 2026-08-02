import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import styles from './NotFoundPage.module.scss';

export default function NotFoundPage() {
  return (
    <main className={styles.page}>
      <span>404 / Page not found</span>
      <h1>This BrandPixo page doesn’t exist.</h1>
      <p>Return home or explore our digital marketing and branding services.</p>
      <div>
        <Link to="/">Return home <FiArrowRight /></Link>
        <Link to="/services">Explore digital marketing services</Link>
      </div>
    </main>
  );
}
