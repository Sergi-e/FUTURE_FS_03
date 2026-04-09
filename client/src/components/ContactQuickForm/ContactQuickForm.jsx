import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { contactApi } from '../../services/api';
import { isValidEmail } from '../../utils/validators';
import styles from './ContactQuickForm.module.css';

export default function ContactQuickForm() {
  const [done, setDone] = useState(false);
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', subject: '', message: '' } });

  const onSubmit = async (data) => {
    setServerError('');
    try {
      await contactApi.create({
        name: data.name.trim(),
        email: data.email.trim(),
        subject: data.subject?.trim() || '',
        message: data.message.trim(),
      });
      setDone(true);
      reset();
      setTimeout(() => setDone(false), 4000);
    } catch (e) {
      setServerError(e.response?.data?.message || 'Could not send. Try again.');
    }
  };

  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Send a quick note</h3>
      <p className={styles.hint}>General questions only — use the booking form to schedule a visit.</p>
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="ok"
            className={styles.success}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <FaCheck className={styles.check} />
            <span>Message sent. We&apos;ll reply soon.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {serverError && <p className={styles.error}>{serverError}</p>}
            <div className={styles.field}>
              <label htmlFor="cq-name">Name</label>
              <input id="cq-name" {...register('name', { required: 'Required' })} />
              {errors.name && <span className={styles.err}>{errors.name.message}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="cq-email">Email</label>
              <input
                id="cq-email"
                type="email"
                {...register('email', {
                  required: 'Required',
                  validate: (v) => isValidEmail(v) || 'Valid email required',
                })}
              />
              {errors.email && <span className={styles.err}>{errors.email.message}</span>}
            </div>
            <div className={styles.field}>
              <label htmlFor="cq-subject">Subject (optional)</label>
              <input id="cq-subject" {...register('subject')} />
            </div>
            <div className={styles.field}>
              <label htmlFor="cq-msg">Message</label>
              <textarea id="cq-msg" rows={3} {...register('message', { required: 'Required' })} />
              {errors.message && <span className={styles.err}>{errors.message.message}</span>}
            </div>
            <button type="submit" className={styles.btn} disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
