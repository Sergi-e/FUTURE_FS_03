import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <div className={styles.brand}>
            <span className={styles.brandNovita}>Novita</span>
            <span className={styles.brandHealth}>Health</span>
          </div>
          <p className={styles.tagline}>
            Modern private care in Kigali — thoughtful medicine for real life.
          </p>
        </div>
        <div>
          <h3 className={styles.colTitle}>Quick Links</h3>
          <ul className={styles.list}>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.colTitle}>Services</h3>
          <ul className={styles.list}>
            <li>
              <a href="#services">General Medicine</a>
            </li>
            <li>
              <a href="#services">Mental Health</a>
            </li>
            <li>
              <a href="#services">Nutrition</a>
            </li>
            <li>
              <a href="#services">Physiotherapy</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className={styles.colTitle}>Contact</h3>
          <ul className={styles.list}>
            <li>KG 123 St, Kigali</li>
            <li>
              <a href="tel:+250788000000">+250 788 000 000</a>
            </li>
            <li>
              <a href="mailto:hello@novitahealth.com">hello@novitahealth.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.bar}>
        <p>© {new Date().getFullYear()} Novita Health. All rights reserved.</p>
        <p className={styles.built}>Built with React & Node.js</p>
      </div>
    </footer>
  );
}
