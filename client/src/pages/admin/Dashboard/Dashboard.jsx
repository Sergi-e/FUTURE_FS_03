import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { MdEventNote, MdHourglassEmpty, MdCheckCircle, MdMail } from 'react-icons/md';
import { appointmentsApi, contactApi } from '../../../services/api';
import styles from './Dashboard.module.css';

function StatusBadge({ status }) {
  const cls =
    status === 'confirmed' ? styles.badgeTeal : status === 'cancelled' ? styles.badgeRed : styles.badgeAmber;
  return <span className={`${styles.badge} ${cls}`}>{status}</span>;
}

export default function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [aRes, cRes] = await Promise.all([appointmentsApi.list(), contactApi.list()]);
        if (!cancelled) {
          setAppointments(aRes.data);
          setMessages(cRes.data);
        }
      } catch {
        if (!cancelled) {
          setAppointments([]);
          setMessages([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const stats = useMemo(() => {
    const pending = appointments.filter((a) => a.status === 'pending').length;
    const confirmed = appointments.filter((a) => a.status === 'confirmed').length;
    return {
      total: appointments.length,
      pending,
      confirmed,
      messages: messages.length,
    };
  }, [appointments, messages]);

  const recent = useMemo(() => appointments.slice(0, 5), [appointments]);

  const cards = [
    { label: 'Total Appointments', value: stats.total, icon: MdEventNote },
    { label: 'Pending', value: stats.pending, icon: MdHourglassEmpty },
    { label: 'Confirmed', value: stats.confirmed, icon: MdCheckCircle },
    { label: 'Messages', value: stats.messages, icon: MdMail },
  ];

  if (loading) {
    return <p className={styles.loading}>Loading…</p>;
  }

  return (
    <div>
      <h1 className={styles.title}>Overview</h1>
      <div className={styles.cards}>
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <c.icon className={styles.cardIcon} />
            <p className={styles.cardValue}>{c.value}</p>
            <p className={styles.cardLabel}>{c.label}</p>
          </motion.div>
        ))}
      </div>
      <div className={styles.tableWrap}>
        <h2 className={styles.subtitle}>Recent appointments</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 ? (
                <tr>
                  <td colSpan={4} className={styles.empty}>
                    No appointments yet.
                  </td>
                </tr>
              ) : (
                recent.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.department}</td>
                    <td>{new Date(a.preferredDate).toLocaleDateString('en-GB')}</td>
                    <td>
                      <StatusBadge status={a.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
