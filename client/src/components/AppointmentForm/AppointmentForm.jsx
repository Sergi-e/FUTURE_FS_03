import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';
import { appointmentsApi } from '../../services/api';
import { DEPARTMENTS, isFutureDateString, isValidEmail } from '../../utils/validators';
import styles from './AppointmentForm.module.css';

export default function AppointmentForm({ idPrefix = 'booking' }) {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      patientName: '',
      email: '',
      phone: '',
      department: '',
      preferredDate: '',
      preferredTime: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError('');
    if (!isValidEmail(data.email)) {
      return;
    }
    if (!isFutureDateString(data.preferredDate)) {
      return;
    }
    setSubmitting(true);
    try {
      await appointmentsApi.create({
        patientName: data.patientName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        department: data.department,
        preferredDate: new Date(data.preferredDate + 'T12:00:00').toISOString(),
        preferredTime: data.preferredTime,
        message: data.message?.trim() || '',
      });
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 5000);
    } catch (e) {
      setServerError(e.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.wrap}>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            className={styles.success}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <motion.div
              className={styles.checkRing}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
            >
              <FaCheck className={styles.checkIcon} />
            </motion.div>
            <p className={styles.successTitle}>Booking received!</p>
            <p className={styles.successText}>We&apos;ll confirm within 2 hours.</p>
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
            {serverError && <p className={styles.serverError}>{serverError}</p>}

            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-name`}>Full name</label>
                <input
                  id={`${idPrefix}-name`}
                  {...register('patientName', { required: 'Full name is required' })}
                  autoComplete="name"
                />
                {errors.patientName && <span className={styles.err}>{errors.patientName.message}</span>}
              </div>
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-email`}>Email</label>
                <input
                  id={`${idPrefix}-email`}
                  type="email"
                  {...register('email', {
                    required: 'Email is required',
                    validate: (v) => isValidEmail(v) || 'Enter a valid email',
                  })}
                  autoComplete="email"
                />
                {errors.email && <span className={styles.err}>{errors.email.message}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-phone`}>Phone</label>
                <input
                  id={`${idPrefix}-phone`}
                  {...register('phone', { required: 'Phone is required' })}
                  autoComplete="tel"
                />
                {errors.phone && <span className={styles.err}>{errors.phone.message}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${idPrefix}-dept`}>Department</label>
              <select
                id={`${idPrefix}-dept`}
                {...register('department', { required: 'Please choose a department' })}
                defaultValue=""
              >
                <option value="" disabled>
                  Select department
                </option>
                {DEPARTMENTS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
              {errors.department && <span className={styles.err}>{errors.department.message}</span>}
            </div>

            <div className={styles.row2}>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-date`}>Preferred date</label>
                <input
                  id={`${idPrefix}-date`}
                  type="date"
                  {...register('preferredDate', {
                    required: 'Date is required',
                    validate: (v) => isFutureDateString(v) || 'Choose a future date',
                  })}
                />
                {errors.preferredDate && <span className={styles.err}>{errors.preferredDate.message}</span>}
              </div>
              <div className={styles.field}>
                <label htmlFor={`${idPrefix}-time`}>Preferred time</label>
                <input
                  id={`${idPrefix}-time`}
                  type="time"
                  {...register('preferredTime', { required: 'Time is required' })}
                />
                {errors.preferredTime && <span className={styles.err}>{errors.preferredTime.message}</span>}
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor={`${idPrefix}-msg`}>Message / symptoms</label>
              <textarea
                id={`${idPrefix}-msg`}
                rows={4}
                {...register('message', { required: 'Please share a brief note or symptoms' })}
                placeholder="Tell us how we can help..."
              />
              {errors.message && <span className={styles.err}>{errors.message.message}</span>}
            </div>

            <button type="submit" className={styles.submit} disabled={submitting}>
              {submitting ? 'Sending…' : 'Book Appointment'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
