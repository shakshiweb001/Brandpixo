import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheckCircle } from 'react-icons/fi';
import styles from './Contact.module.scss';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      setError('The enquiry form is not configured yet. Please email brandpixo@gmail.com.');
      return;
    }

    setSubmitting(true);
    setError('');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New project enquiry from ${formData.name}`,
          from_name: 'BrandPixo Website',
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim()
        })
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setError('We could not send your enquiry. Please try again or email brandpixo@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.left}>
        <span className={styles.tag}>Connect</span>
        <h2 className={styles.title}>Let's Build Something Exceptional</h2>
        <div className={styles.infoList}>
          <div className={styles.infoItem}>
            <span className={styles.label}>General Inquiries</span>
            <a href="mailto:brandpixo@gmail.com" className={styles.val}>brandpixo@gmail.com</a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>WhatsApp Us</span>
            <a href="https://wa.me/919805312402" target="_blank" rel="noreferrer" className={styles.val}>+91 98053 12402</a>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Main Headquarters</span>
            <span className={styles.val}>India</span>
          </div>
        </div>
      </div>

      <div className={styles.right}>
        {!success ? (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                className={styles.input} 
                placeholder=" "
                required 
              />
              <label className={styles.formLabel}>Name</label>
            </div>
            
            <div className={styles.inputGroup}>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                className={styles.input} 
                placeholder=" "
                required 
              />
              <label className={styles.formLabel}>Email</label>
            </div>

            <div className={styles.inputGroup}>
              <textarea 
                name="message" 
                value={formData.message} 
                onChange={handleInputChange} 
                className={styles.textarea} 
                placeholder=" "
                required
              />
              <label className={styles.formLabel}>Project Details</label>
            </div>

            <button type="submit" className={`${styles.btnSubmit} hover-target`} disabled={submitting} aria-busy={submitting}>
              {submitting ? 'Sending…' : 'Send Proposal'}
            </button>
            {error && <p className={styles.errorMessage} role="alert">{error}</p>}
          </form>
        ) : (
          <motion.div 
            className={styles.successMessage}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiCheckCircle className={styles.successIcon} />
            <h3>Proposal Sent!</h3>
            <p>Thank you for reaching out. A partner strategist will contact you within 24 hours.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
