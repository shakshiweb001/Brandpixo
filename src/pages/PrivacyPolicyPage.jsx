import React from 'react';
import styles from './LegalPage.module.scss';

export default function PrivacyPolicyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <span className={styles.eyebrow}>BrandPixo / Legal</span>
        <h1>Privacy Policy</h1>
        <p>How we handle information when you browse our website or contact us about a project. Last updated: 2 August 2026.</p>
      </header>
      <article className={styles.content}>
        <section><h2>Information we collect</h2><p>We may collect the name, email address, phone number, company details and project information you voluntarily submit through our enquiry forms, email or WhatsApp.</p></section>
        <section><h2>How we use information</h2><p>We use submitted information to respond to enquiries, prepare proposals, provide requested services, improve our website and maintain necessary business records.</p></section>
        <section><h2>Cookies and analytics</h2><p>Our website may use essential cookies and privacy-conscious analytics to understand website performance and visitor interactions. You can control cookies through your browser settings.</p></section>
        <section><h2>Sharing and retention</h2><p>We do not sell personal information. Information may be shared with trusted service providers only when needed to operate our website or deliver an agreed service. We retain it only as long as reasonably necessary.</p></section>
        <section><h2>Your choices</h2><p>You may request access, correction or deletion of personal information we hold about you, subject to applicable legal and record-keeping requirements.</p></section>
        <section><h2>Contact us</h2><p>For privacy questions or requests, email <a href="mailto:brandpixo@gmail.com">brandpixo@gmail.com</a> or contact us through WhatsApp.</p></section>
      </article>
    </main>
  );
}
