import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiClock } from 'react-icons/fi';
import { blogPosts, getBlogPost } from '../data/blogPosts';
import styles from './BlogDetailPage.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
};

export default function BlogDetailPage() {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className={styles.page}>
        <div className={styles.notFound}>
          <h1>Article not found.</h1>
          <Link to="/blog">Back to journal</Link>
        </div>
      </main>
    );
  }

  const currentIndex = blogPosts.findIndex((item) => item.slug === post.slug);
  const previousPost = blogPosts[(currentIndex - 1 + blogPosts.length) % blogPosts.length];
  const nextPost = blogPosts[(currentIndex + 1) % blogPosts.length];
  const relatedPosts = post.related
    .map((relatedSlug) => blogPosts.find((item) => item.slug === relatedSlug))
    .filter(Boolean);
  const imageOne = relatedPosts[0]?.image || post.image;
  const imageTwo = relatedPosts[1]?.image || post.image;
  const relatedRail = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 4);

  return (
    <main className={styles.page}>
      <motion.div className={styles.progress} style={{ scaleX }} />

      <header className={styles.hero}>
        <div className={styles.heroMeta}>
          <Link to="/blog"><FiArrowLeft /> Journal</Link>
          <div><span>{post.category}</span><span><FiClock /> {post.readTime}</span></div>
        </div>
        <motion.div className={styles.heroCopy} initial="hidden" animate="visible" variants={fadeUp}>
          <span className={styles.eyebrow}>Field Note / {post.category}</span>
          <h1>{post.title}</h1>
          <p>{post.intro}</p>
        </motion.div>
        <motion.figure className={styles.heroPhoto} initial={{ opacity: 0, y: 34, rotate: -1 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: .85, ease: [0.16, 1, 0.3, 1] }}>
          <span className={styles.tape} />
          <img src={post.image} alt={`${post.title} — BrandPixo agency journal`} fetchPriority="high" />
          <figcaption>BrandPixo Journal — {post.category}</figcaption>
        </motion.figure>
      </header>

      <article className={styles.article}>
        <aside className={styles.relatedRail} aria-label="Related blogs">
          <div className={styles.relatedRailInner}>
            <span className={styles.relatedLabel}>Keep reading</span>
            <h2>Related blogs</h2>
            <div className={styles.relatedList}>
              {relatedRail.map((item, index) => (
                <Link key={item.slug} to={`/blog/${item.slug}`} className={styles.relatedCard}>
                  <img src={item.image} alt={`Related BrandPixo article: ${item.title}`} loading="lazy" />
                  <div>
                    <span>0{index + 1} / {item.category}</span>
                    <h3>{item.title}</h3>
                    <small>{item.readTime} <FiArrowUpRight /></small>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </aside>

        <div className={styles.articleContent}>
        <div className={styles.openingGrid}><p className={styles.lead}>{post.excerpt}</p></div>

        {post.sections.map((section, index) => (
          <React.Fragment key={section.title}>
            <motion.section id={`section-${index + 1}`} className={styles.articleSection} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp}>
              <span>0{index + 1} / Insight</span>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </motion.section>

            {index === 0 && (
              <>
                <blockquote>{post.pullQuote}</blockquote>
                <div className={styles.photoPair}>
                  <figure><span>Related perspective</span><img src={imageOne} alt={relatedPosts[0]?.title || post.title} loading="lazy" /><figcaption>{relatedPosts[0]?.title || post.title}</figcaption></figure>
                  <figure><span>Another angle</span><img src={imageTwo} alt={relatedPosts[1]?.title || post.title} loading="lazy" /><figcaption>{relatedPosts[1]?.title || post.title}</figcaption></figure>
                </div>
              </>
            )}

            {index === 1 && (
              <figure className={styles.widePhoto}>
                <span>BrandPixo field note</span>
                <img src={post.image} alt={`A closer look at ${post.title}`} loading="lazy" />
                <figcaption>Clarity in the details creates confidence in the whole experience.</figcaption>
              </figure>
            )}
          </React.Fragment>
        ))}

        <section className={styles.summary}>
          <span>Practical review before launch</span>
          <div><p>Is the first message immediately clear?</p><strong>Clarity before decoration</strong></div>
          <div><p>Does every section earn its place?</p><strong>Restraint signals confidence</strong></div>
          <div><p>Is the next step obvious and calm?</p><strong>Guide without pressure</strong></div>
        </section>

        <section className={styles.authorCard}>
          <div className={styles.authorMark}>BP</div>
          <div><span>Written by</span><h3>BrandPixo Editorial Team</h3><p>Practical guidance shaped by brand strategy, digital design, and conversion experience.</p><div className={styles.authorTags}><span>Brand strategy</span><span>Digital craft</span></div></div>
          <Link to="/blog">More field notes <FiArrowUpRight /></Link>
        </section>

        <Link to="/contact" className={`${styles.askButton} hover-target`}>Ask our team <FiArrowUpRight /></Link>

        <nav className={styles.postNav} aria-label="Article navigation">
          <Link to={`/blog/${previousPost.slug}`}><span><FiArrowLeft /> Previous</span><strong>{previousPost.title}</strong></Link>
          <Link to={`/blog/${nextPost.slug}`}><span>Next <FiArrowRight /></span><strong>{nextPost.title}</strong></Link>
        </nav>
        </div>
      </article>
    </main>
  );
}
