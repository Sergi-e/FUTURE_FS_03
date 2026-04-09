import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { useScrollNav } from '../../hooks/useScrollNav';
import styles from './Navbar.module.css';

const links = [
  { to: '#home', label: 'Home' },
  { to: '#services', label: 'Services' },
  { to: '#about', label: 'About' },
  { to: '#team', label: 'Team' },
  { to: '#testimonials', label: 'Testimonials' },
  { to: '#contact', label: 'Contact' },
];

export default function Navbar({ onBookOpen }) {
  const solid = useScrollNav(40);
  const [open, setOpen] = useState(false);

  const closeDrawer = () => setOpen(false);

  return (
    <>
      <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
        <div className={styles.inner}>
          <a href="#home" className={styles.logo} onClick={closeDrawer}>
            <span className={styles.logoCross} aria-hidden>
              ✚
            </span>
            <span className={styles.logoNovita}>Novita</span>
            <span className={styles.logoHealth}>Health</span>
          </a>

          <nav className={styles.nav} aria-label="Main">
            {links.map(({ to, label }) => (
              <a key={to} href={to} className={styles.link}>
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.actions}>
            <button type="button" className={styles.cta} onClick={() => onBookOpen?.()}>
              Book Appointment
            </button>
            <button
              type="button"
              className={styles.burger}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              className={styles.backdrop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-label="Close menu"
              onClick={closeDrawer}
            />
            <motion.div
              className={styles.drawer}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.drawerHead}>
                <span className={styles.drawerLogo}>
                  <span className={styles.logoCross} aria-hidden>
                    ✚
                  </span>
                  <span className={styles.logoNovita}>Novita</span>
                  <span className={styles.logoHealth}>Health</span>
                </span>
                <button type="button" className={styles.drawerClose} onClick={closeDrawer} aria-label="Close">
                  <HiX size={26} />
                </button>
              </div>
              <nav className={styles.drawerNav}>
                {links.map(({ to, label }) => (
                  <a key={to} href={to} className={styles.drawerLink} onClick={closeDrawer}>
                    {label}
                  </a>
                ))}
                <Link to="/admin" className={styles.drawerAdmin} onClick={closeDrawer}>
                  Staff login
                </Link>
              </nav>
              <button type="button" className={styles.drawerCta} onClick={() => { closeDrawer(); onBookOpen?.(); }}>
                Book Appointment
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
