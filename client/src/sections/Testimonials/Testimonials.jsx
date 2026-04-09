import { motion } from 'framer-motion';
import TestimonialCard from '../../components/TestimonialCard/TestimonialCard';
import styles from './Testimonials.module.css';

const items = [
  {
    quote:
      'From the first visit, I felt listened to. The mental health team helped me rebuild routines I thought I had lost.',
    name: 'Claire M.',
    avatarUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80',
  },
  {
    quote:
      'Nutrition sessions were practical — no shame, just clear steps. My energy is finally back.',
    name: 'Patrick N.',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
  },
  {
    quote:
      'Physiotherapy after my knee injury was exceptional. Professional, kind, and genuinely invested in my recovery.',
    name: 'Divine K.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80',
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.h2}>Stories from Our Patients</h2>
          <p className={styles.sub}>Real words from people who chose calm, private care in Kigali.</p>
        </motion.div>
        <div className={styles.grid}>
          {items.map((t) => (
            <TestimonialCard key={t.name} quote={t.quote} name={t.name} avatarUrl={t.avatarUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}
