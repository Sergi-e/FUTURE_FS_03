import { motion } from 'framer-motion';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import styles from './Services.module.css';

const fallback = [
  { _id: '1', title: 'General Medicine', description: 'Primary care, prevention, and treatment for everyday health.', icon: 'general' },
  { _id: '2', title: 'Mental Health', description: 'Confidential support for emotional wellbeing and resilience.', icon: 'mental' },
  { _id: '3', title: 'Nutrition & Dietetics', description: 'Personalized guidance for energy, recovery, and long-term habits.', icon: 'nutrition' },
  { _id: '4', title: 'Physiotherapy', description: 'Movement, strength, and pain relief with hands-on therapy.', icon: 'physio' },
];

export default function Services({ items }) {
  const list = items?.length ? items : fallback;

  return (
    <section id="services" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.h2}>What We Treat</h2>
          <p className={styles.sub}>Four focused departments — one coordinated experience.</p>
        </motion.div>
        <div className={styles.grid}>
          {list.map((s, i) => (
            <ServiceCard
              key={s._id || s.title}
              title={s.title}
              description={s.description}
              iconKey={s.icon || 'general'}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
