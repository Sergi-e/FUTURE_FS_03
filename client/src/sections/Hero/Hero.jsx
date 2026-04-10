import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

const HERO_IMG =
  'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=900&q=80';

const viewOnce = { once: true };
const sectionMotion = { duration: 0.5 };

export default function Hero({ onBookOpen }) {
  const [parallaxY, setParallaxY] = useState(0);

  useEffect(() => {
    const onScroll = () => setParallaxY(window.scrollY * 0.3);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <motion.p
            className={styles.eyebrow}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={sectionMotion}
          >
            Kigali&apos;s Trusted Health Partner
          </motion.p>
          <motion.h1
            className={styles.h1}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ ...sectionMotion, delay: 0.05 }}
          >
            Your Health, In Trusted Hands.
          </motion.h1>
          <motion.p
            className={styles.lead}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ ...sectionMotion, delay: 0.1 }}
          >
            Novita Health brings together general medicine, mental wellness, nutrition, and physiotherapy under one calm,
            private roof — so you feel heard, not rushed.
          </motion.p>
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ ...sectionMotion, delay: 0.15 }}
          >
            <button type="button" className={styles.btnPrimary} onClick={() => onBookOpen?.()}>
              Book a Visit
            </button>
            <a href="#services" className={styles.btnOutline}>
              Our Services
            </a>
          </motion.div>
          <motion.ul
            className={styles.badges}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewOnce}
            transition={{ ...sectionMotion, delay: 0.2 }}
          >
            <li>
              <span className={styles.badge}>✓ Same-day appointments</span>
            </li>
            <li>
              <span className={styles.badge}>✓ Certified specialists</span>
            </li>
            <li>
              <span className={styles.badge}>✓ Private & confidential</span>
            </li>
          </motion.ul>
        </div>

        <div className={styles.visual}>
          <div className={styles.visualInner}>
            <div className={styles.imageShell}>
              <img
                className={styles.heroImg}
                src={HERO_IMG}
                alt="Bright, modern private clinic reception and waiting area with natural daylight"
                style={{ transform: `translateY(${parallaxY}px)` }}
                decoding="async"
              />
            </div>
            <motion.div
              className={`${styles.stat} ${styles.statTop}`}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.45, delay: 0.25 }}
            >
              <span className={styles.statNum}>2,400+</span>
              <span className={styles.statLabel}>Patients</span>
            </motion.div>
            <motion.div
              className={`${styles.stat} ${styles.statBottom}`}
              initial={{ opacity: 0, x: 12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewOnce}
              transition={{ duration: 0.45, delay: 0.32 }}
            >
              <span className={styles.statNum}>4.9★</span>
              <span className={styles.statLabel}>Rating</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
