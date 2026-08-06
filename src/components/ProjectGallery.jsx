import React, { useEffect, useState } from 'react';
import { FiArrowUpRight, FiCheckCircle, FiSend, FiX } from 'react-icons/fi';
import { projects } from '../data/projectsData';
import { submitEnquiry } from '../utils/submitEnquiry';
import styles from './ProjectGallery.module.scss';

export default function ProjectGallery({ limit }) {
  const [selected, setSelected] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const visibleProjects = limit ? projects.slice(0, limit) : projects;

  useEffect(() => {
    if (!selected) return undefined;
    const close = (event) => { if (event.key === 'Escape') setSelected(null); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', close);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', close); };
  }, [selected]);

  const openConsultation = (project) => {
    setSelected(project);
    setSent(false);
    setError('');
  };

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitting(true);
    setError('');
    try {
      await submitEnquiry({
        name: data.get('name').trim(),
        email: data.get('email').trim(),
        phone: data.get('phone').trim() || 'Not provided',
        project_reference: selected.title,
        message: data.get('message').trim(),
      }, `Consultation request inspired by ${selected.title}`);
      setSent(true);
    } catch {
      setError('We could not send your request. Please email brandpixo@gmail.com.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.grid}>
        {visibleProjects.map((project, index) => (
          <article className={styles.card} key={project.slug}>
            <button className={styles.preview} type="button" onClick={() => openConsultation(project)} aria-label={`Request a consultation for a project like ${project.title}`}>
              <img src={project.image} alt={project.alt} loading="lazy" />
              <span>0{index + 1}</span>
              <div><strong>View full experience</strong><small>Hover to explore</small></div>
            </button>
            <div className={styles.meta}>
              <div><span>{project.category}</span><h3>{project.title}</h3></div>
              <button type="button" onClick={() => openConsultation(project)} aria-label={`Discuss a project like ${project.title}`}><FiArrowUpRight /></button>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="consultation-title">
            <button className={styles.close} type="button" onClick={() => setSelected(null)} aria-label="Close consultation form"><FiX /></button>
            {!sent ? <>
              <div className={styles.modalIntro}><span>Project consultation</span><h2 id="consultation-title">Build something with the same ambition.</h2><p>You selected <strong>{selected.title}</strong>. Tell us what you want to create and we will recommend a practical next step.</p></div>
              <form onSubmit={submit}>
                <label>Name<input name="name" required autoFocus placeholder="Your name" /></label>
                <label>Email<input name="email" type="email" required placeholder="you@company.com" /></label>
                <label>Phone<input name="phone" placeholder="Your phone number" /></label>
                <label>Project details<textarea name="message" required placeholder="Goals, pages, features, and timeline" /></label>
                <button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Request consultation'} <FiSend /></button>
                {error && <p role="alert">{error}</p>}
              </form>
            </> : <div className={styles.success}><FiCheckCircle /><h2>Request received.</h2><p>We will reply within one business day.</p><button type="button" onClick={() => setSelected(null)}>Close</button></div>}
          </section>
        </div>
      )}
    </>
  );
}
