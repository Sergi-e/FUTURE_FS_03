import { motion } from 'framer-motion';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import ContactQuickForm from '../../components/ContactQuickForm/ContactQuickForm';
import styles from './Contact.module.css';

const RECEPTION_IMG =
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.h2}>Visit & Book</h2>
          <p className={styles.sub}>Reach out directly or request an appointment — we respond within two hours.</p>
        </motion.div>
        <div className={styles.grid}>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className={styles.receptionShell}>
              <img
                className={styles.receptionImg}
                src={RECEPTION_IMG}
                alt="Warm, welcoming clinic reception desk and waiting area"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.block}>
              <h3 className={styles.label}>Address</h3>
              <p>KG 123 St, Kigali, Rwanda</p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.label}>Phone</h3>
              <p>
                <a href="tel:+250788000000">+250 788 000 000</a>
              </p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.label}>Email</h3>
              <p>
                <a href="mailto:hello@novitahealth.com">hello@novitahealth.com</a>
              </p>
            </div>
            <div className={styles.block}>
              <h3 className={styles.label}>Hours</h3>
              <p>Mon–Fri: 8:00 – 18:00</p>
              <p>Sat: 9:00 – 14:00</p>
            </div>
            <div className={styles.mapWrap}>
              <iframe
                title="Novita Health location"
                className={styles.map}
                src="https://maps.google.com/maps?q=Kigali,Rwanda&t=&z=13&ie=UTF8&iwloc=&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <ContactQuickForm />
          </motion.div>
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <h3 className={styles.formTitle}>Request an appointment</h3>
            <p className={styles.formHint}>All fields are required. We never share your details.</p>
            <AppointmentForm idPrefix="contact" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
