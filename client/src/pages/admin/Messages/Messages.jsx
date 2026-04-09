import { useEffect, useState } from 'react';
import { contactApi } from '../../../services/api';
import styles from './Messages.module.css';

export default function Messages() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const res = await contactApi.list();
      setItems(res.data);
    } catch {
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id) => {
    try {
      const res = await contactApi.markRead(id);
      setItems((prev) => prev.map((m) => (m._id === id ? res.data : m)));
    } catch {
      /* ignore */
    }
  };

  if (loading) return <p className={styles.muted}>Loading…</p>;

  return (
    <div>
      <h1 className={styles.title}>Messages</h1>
      <p className={styles.sub}>Contact form submissions from the website.</p>
      <ul className={styles.list}>
        {items.length === 0 ? (
          <li className={styles.empty}>No messages yet.</li>
        ) : (
          items.map((m) => (
            <li
              key={m._id}
              className={`${styles.card} ${!m.read ? styles.unread : ''}`}
            >
              <button
                type="button"
                className={styles.row}
                onClick={() => setExpanded(expanded === m._id ? null : m._id)}
              >
                <div className={styles.rowMain}>
                  <span className={styles.name}>{m.name}</span>
                  <span className={styles.email}>{m.email}</span>
                  {m.subject && <span className={styles.subject}>{m.subject}</span>}
                </div>
                <span className={styles.date}>
                  {new Date(m.createdAt).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })}
                </span>
              </button>
              {expanded === m._id && (
                <div className={styles.body}>
                  <p className={styles.message}>{m.message}</p>
                  {!m.read && (
                    <button type="button" className={styles.mark} onClick={() => markRead(m._id)}>
                      Mark as read
                    </button>
                  )}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
