import { motion } from 'framer-motion';
import { FaHeartbeat, FaBrain, FaAppleAlt, FaWalking } from 'react-icons/fa';
import styles from './ServiceCard.module.css';

const icons = {
  general: FaHeartbeat,
  mental: FaBrain,
  nutrition: FaAppleAlt,
  physio: FaWalking,
};

export default function ServiceCard({ title, description, iconKey, index = 0 }) {
  const Icon = icons[iconKey] || FaHeartbeat;

  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.iconWrap}>
        <Icon className={styles.icon} aria-hidden />
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.desc}>{description}</p>
    </motion.article>
  );
}
