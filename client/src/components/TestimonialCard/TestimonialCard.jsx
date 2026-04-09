import { FaStar } from 'react-icons/fa';
import { handleAvatarImageError } from '../../utils/imageError';
import styles from './TestimonialCard.module.css';

function patientInitials(name) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

export default function TestimonialCard({ quote, name, avatarUrl }) {
  return (
    <article className={styles.card}>
      <p className={styles.quote}>{quote}</p>
      <div className={styles.stars} aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} className={styles.star} />
        ))}
      </div>
      <div className={styles.nameRow}>
        {avatarUrl ? (
          <span className={styles.avatarShell}>
            <img
              className={styles.avatar}
              src={avatarUrl}
              alt={`Portrait of ${name}, Novita Health patient`}
              loading="lazy"
              decoding="async"
              onError={handleAvatarImageError}
            />
            <span className={styles.avatarFallback} aria-hidden>
              {patientInitials(name)}
            </span>
          </span>
        ) : null}
        <p className={styles.name}>{name}</p>
      </div>
    </article>
  );
}
