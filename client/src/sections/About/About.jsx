import { motion } from 'framer-motion';
import styles from './About.module.css';

const ABOUT_IMG =
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80';

const stats = [
  { num: '12+', label: 'Specialists' },
  { num: '6', label: 'Years' },
  { num: '2,400+', label: 'Patients' },
  { num: '4', label: 'Departments' },
];

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.grid}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={styles.h2}>Care that feels personal</h2>
            <p className={styles.p}>
              Since 2018, Novita Health has served Kigali with a simple promise: medicine with warmth. Our team takes
              time to listen, explain, and plan with you — whether you need a routine visit, mental health support, or
              rehabilitation after an injury.
            </p>
            <p className={styles.p}>
              We believe premium care is not cold or rushed; it is clear communication, respectful privacy, and
              evidence-based treatment tailored to your life.
            </p>
          </motion.div>
          <motion.div
            className={styles.stats}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            {stats.map((s) => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </motion.div>
          <motion.a
            className={styles.teamBtn}
            href="#team"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            Meet Our Team
          </motion.a>
        </div>
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className={styles.imageFrame}>
            <div className={styles.imageShell}>
              <img
                className={styles.aboutImg}
                src={ABOUT_IMG}
                alt="Doctor consulting with a patient in a bright, welcoming clinic office"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.floatBadge}>📍 Kigali, Rwanda · Est. 2018</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
