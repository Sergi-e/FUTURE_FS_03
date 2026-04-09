import { motion } from 'framer-motion';
import AppointmentForm from '../../components/AppointmentForm/AppointmentForm';
import ContactQuickForm from '../../components/ContactQuickForm/ContactQuickForm';
import styles from './Contact.module.css';

const RECEPTION_IMG =
  'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&q=80';

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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19801902705!2d29.71998895!3d-1.9400723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca4258ed8f5a1%3A0x1c0c6e7c5b5b5b5b!2sKigali%2C%20Rwanda!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
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
