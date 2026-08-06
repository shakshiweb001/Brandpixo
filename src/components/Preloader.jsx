import React, { useEffect, useState } from 'react';
import styles from './Preloader.module.scss';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const startedAt = performance.now();
    const minimumDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 850;
    let exitTimer;
    let removeTimer;

    const finish = () => {
      const remaining = Math.max(0, minimumDuration - (performance.now() - startedAt));
      exitTimer = window.setTimeout(() => {
        setLeaving(true);
        removeTimer = window.setTimeout(() => setVisible(false), 450);
      }, remaining);
    };

    document.body.style.overflow = 'hidden';
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = '';
  }, [visible]);

  if (!visible) return null;

  return (
    <div className={`${styles.preloader} ${leaving ? styles.leaving : ''}`} role="status" aria-live="polite" aria-label="Loading BrandPixo">
      <div className={styles.mark} aria-hidden="true"><span>B</span><i /></div>
      <strong>brandpixo</strong>
      <div className={styles.track} aria-hidden="true"><span /></div>
      <small>Branding that connects</small>
    </div>
  );
}
