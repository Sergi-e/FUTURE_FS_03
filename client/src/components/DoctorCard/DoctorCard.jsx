import { motion } from 'framer-motion';
import { handleAvatarImageError } from '../../utils/imageError';
import styles from './DoctorCard.module.css';

function initials(name) {
  return name
    .replace(/Dr\.?\s*/i, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();
}

export default function DoctorCard({ name, specialty, imageUrl, index = 0 }) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <div className={styles.avatarWrap}>
        {imageUrl ? (
          <>
            <img
              className={styles.avatarImg}
              src={imageUrl}
              alt={`Portrait of ${name}, ${specialty}`}
              loading="lazy"
              decoding="async"
              onError={handleAvatarImageError}
            />
            <div className={styles.avatarFallback} aria-hidden>
              {initials(name)}
            </div>
          </>
        ) : (
          <div className={styles.avatarFallback} style={{ display: 'flex' }} aria-hidden>
            {initials(name)}
          </div>
        )}
      </div>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.specialty}>{specialty}</p>
    </motion.article>
  );
}
