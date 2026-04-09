import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import { doctorsApi } from '../../../services/api';
import styles from './Doctors.module.css';

const empty = { name: '', specialty: '', department: '', bio: '', email: '', available: true };

export default function Doctors() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: empty });

  const load = async () => {
    setLoading(true);
    try {
      const res = await doctorsApi.listAll();
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

  const openEdit = (doc) => {
    setEditing(doc);
    reset({
      name: doc.name,
      specialty: doc.specialty,
      department: doc.department,
      bio: doc.bio || '',
      email: doc.email || '',
      available: doc.available !== false,
    });
    setModalOpen(true);
  };

  const close = () => {
    setModalOpen(false);
    setEditing(null);
  };

  const onSave = async (data) => {
    const payload = {
      ...data,
      available: Boolean(data.available),
    };
    try {
      if (editing) {
        const res = await doctorsApi.update(editing._id, payload);
        setList((prev) => prev.map((d) => (d._id === editing._id ? res.data : d)));
      } else {
        const res = await doctorsApi.create(payload);
        setList((prev) => [...prev, res.data]);
      }
      close();
    } catch {
      /* ignore */
    }
  };

  const remove = async (id) => {
    if (!window.confirm('Remove this doctor?')) return;
    try {
      await doctorsApi.remove(id);
      setList((prev) => prev.filter((d) => d._id !== id));
    } catch {
      /* ignore */
    }
  };

  if (loading) return <p className={styles.muted}>Loading…</p>;

  return (
    <div>
      <div className={styles.head}>
        <h1 className={styles.title}>Doctors</h1>
        <button type="button" className={styles.add} onClick={openAdd}>
          Add Doctor
        </button>
      </div>
      <div className={styles.grid}>
        {list.map((d) => (
          <article key={d._id} className={styles.card}>
            <h3 className={styles.name}>{d.name}</h3>
            <p className={styles.spec}>{d.specialty}</p>
            <p className={styles.dept}>{d.department}</p>
            <p className={styles.bio}>{d.bio}</p>
            <div className={styles.actions}>
              <button type="button" className={styles.edit} onClick={() => openEdit(d)}>
                Edit
              </button>
              <button type="button" className={styles.danger} onClick={() => remove(d._id)}>
                Delete
              </button>
            </div>
          </article>
        ))}
      </div>

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
                    <h2>{editing ? 'Edit doctor' : 'Add doctor'}</h2>
                    <button type="button" className={styles.iconBtn} onClick={close} aria-label="Close">
                      <HiX size={22} />
                    </button>
                  </div>
                  <form className={styles.form} onSubmit={handleSubmit(onSave)}>
                    <div className={styles.field}>
                      <label>Name</label>
                      <input {...register('name', { required: true })} />
                      {errors.name && <span className={styles.err}>Required</span>}
                    </div>
                    <div className={styles.field}>
                      <label>Specialty</label>
                      <input {...register('specialty', { required: true })} />
                    </div>
                    <div className={styles.field}>
                      <label>Department</label>
                      <input {...register('department', { required: true })} />
                    </div>
                    <div className={styles.field}>
                      <label>Bio</label>
                      <textarea rows={3} {...register('bio')} />
                    </div>
                    <div className={styles.field}>
                      <label>Email</label>
                      <input type="email" {...register('email')} />
                    </div>
                    <label className={styles.check}>
                      <input type="checkbox" {...register('available')} />
                      Available for booking
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
