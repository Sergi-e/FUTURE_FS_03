import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { servicesApi } from '../../../services/api';
import styles from './Services.module.css';

const empty = { title: '', description: '', department: '', icon: '', active: true };

export default function Services() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: empty });

  const load = async () => {
    setLoading(true);
    try {
      const res = await servicesApi.listAll();
      setList(res.data);
    } catch {
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    reset(empty);
    setModalOpen(true);
  };

  const openEdit = (s) => {
    setEditing(s);
    reset({
      title: s.title,
      description: s.description,
      department: s.department,
      icon: s.icon || '',
      active: s.active !== false,
    });
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const onSave = async (data) => {
    const payload = { ...data, active: Boolean(data.active) };
    try {
      if (editing) {
        const res = await servicesApi.update(editing._id, payload);
        setList((prev) => prev.map((x) => (x._id === editing._id ? res.data : x)));
      } else {
        const res = await servicesApi.create(payload);
        setList((prev) => [...prev, res.data]);
      }
      close();
    } catch {
      /* ignore */
    }
  };

  const toggleActive = async (s) => {
    try {
      const res = await servicesApi.update(s._id, {
        title: s.title,
        description: s.description,
        department: s.department,
        icon: s.icon || '',
        active: !s.active,
      });
      setList((prev) => prev.map((x) => (x._id === s._id ? res.data : x)));
    } catch {
      /* ignore */
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await servicesApi.remove(id);
      setList((prev) => prev.filter((x) => x._id !== id));
    } catch {
      /* ignore */
    }
  };

  if (loading) return <p className={styles.muted}>Loading…</p>;

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Services</h1>
        <button type="button" className={styles.add} onClick={openAdd}>
          Add Service
        </button>
      </div>
      <ul className={styles.list}>
        {list.map((s) => (
          <li key={s._id} className={`${styles.item} ${!s.active ? styles.inactive : ''}`}>
            <div className={styles.itemMain}>
              <h3 className={styles.itemTitle}>{s.title}</h3>
              <p className={styles.itemDesc}>{s.description}</p>
              <p className={styles.itemMeta}>
                {s.department} · icon: {s.icon || '—'}
              </p>
            </div>
            <div className={styles.itemActions}>
              <label className={styles.toggle}>
                <input type="checkbox" checked={s.active} onChange={() => toggleActive(s)} />
                <span>{s.active ? 'Active' : 'Inactive'}</span>
              </label>
              <button type="button" className={styles.edit} onClick={() => openEdit(s)}>
                Edit
              </button>
              <button type="button" className={styles.danger} onClick={() => remove(s._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {modalOpen && (
              <div className={styles.modalRoot}>
                <motion.button
                  type="button"
                  className={styles.backdrop}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  aria-label="Close"
                  onClick={close}
                />
                <motion.div
                  className={styles.panel}
                  role="dialog"
                  aria-modal="true"
                  initial={{ opacity: 0, scale: 0.96, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: 12 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className={styles.modalHead}>
                    <h2>{editing ? 'Edit service' : 'Add service'}</h2>
                    <button type="button" className={styles.iconBtn} onClick={close} aria-label="Close">
                      <HiX size={22} />
                    </button>
                  </div>
                  <form className={styles.form} onSubmit={handleSubmit(onSave)}>
                    <div className={styles.field}>
                      <label>Title</label>
                      <input {...register('title', { required: true })} />
                      {errors.title && <span className={styles.err}>Required</span>}
                    </div>
                    <div className={styles.field}>
                      <label>Description</label>
                      <textarea rows={4} {...register('description', { required: true })} />
                    </div>
                    <div className={styles.field}>
                      <label>Department</label>
                      <input {...register('department', { required: true })} />
                    </div>
                    <div className={styles.field}>
                      <label>Icon key</label>
                      <input placeholder="general, mental, nutrition, physio" {...register('icon')} />
                    </div>
                    <label className={styles.check}>
                      <input type="checkbox" {...register('active')} />
                      Active on public site
                    </label>
                    <div className={styles.formActions}>
                      <button type="button" className={styles.ghost} onClick={close}>
                        Cancel
                      </button>
                      <button type="submit" className={styles.primary}>
                        Save
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
