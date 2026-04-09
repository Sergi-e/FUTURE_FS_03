import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiX } from 'react-icons/hi';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import styles from './BookingModal.module.css';

export default function BookingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className={styles.root}>
          <motion.button
            type="button"
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close"
            onClick={onClose}
          />
          <motion.div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.head}>
              <div>
                <p className={styles.eyebrow}>Novita Health</p>
                <h2 id="booking-modal-title" className={styles.title}>
                  Book a visit
                </h2>
                <p className={styles.sub}>We&apos;ll confirm your appointment within two hours.</p>
              </div>
              <button type="button" className={styles.close} onClick={onClose} aria-label="Close booking">
                <HiX size={24} />
              </button>
            </div>
            <AppointmentForm idPrefix="modal" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
