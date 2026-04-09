import { useEffect, useMemo, useState } from 'react';
import { appointmentsApi } from '../../../services/api';
import styles from './Appointments.module.css';

export default function Appointments() {
  const [rows, setRows] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const res = await appointmentsApi.list();
      setRows(res.data);
    } catch {
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      const okStatus = filter === 'all' || r.status === filter;
      const q = search.trim().toLowerCase();
      const okSearch = !q || r.patientName.toLowerCase().includes(q);
      return okStatus && okSearch;
    });
  }, [rows, filter, search]);

  const updateStatus = async (id, status) => {
    try {
      const res = await appointmentsApi.updateStatus(id, status);
      setRows((prev) => prev.map((r) => (r._id === id ? res.data : r)));
    } catch {
      /* ignore */
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this appointment permanently?')) return;
    try {
      await appointmentsApi.remove(id);
      setRows((prev) => prev.filter((r) => r._id !== id));
    } catch {
      /* ignore */
    }
  };

  if (loading) return <p className={styles.muted}>Loading…</p>;

  return (
    <div>
      <h1 className={styles.title}>Appointments</h1>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {['all', 'pending', 'confirmed', 'cancelled'].map((f) => (
            <button
              key={f}
              type="button"
              className={`${styles.filterBtn} ${filter === f ? styles.filterActive : ''}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="search"
          className={styles.search}
          placeholder="Search by patient name…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className={styles.tableWrap}>
        <div className={styles.scroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className={styles.empty}>
                    No appointments match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a._id}>
                    <td>{a.patientName}</td>
                    <td>{a.email}</td>
                    <td>{a.department}</td>
                    <td>{new Date(a.preferredDate).toLocaleDateString('en-GB')}</td>
                    <td>{a.preferredTime}</td>
                    <td>
                      <select
                        className={styles.select}
                        value={a.status}
                        onChange={(e) => updateStatus(a._id, e.target.value)}
                        aria-label={`Status for ${a.patientName}`}
                      >
                        <option value="pending">pending</option>
                        <option value="confirmed">confirmed</option>
                        <option value="cancelled">cancelled</option>
                      </select>
                    </td>
                    <td>
                      <button type="button" className={styles.danger} onClick={() => remove(a._id)}>
                        Delete
                      </button>
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
