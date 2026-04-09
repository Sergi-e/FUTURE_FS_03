import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard,
  MdEventNote,
  MdPeople,
  MdMedicalServices,
  MdMail,
  MdLogout,
  MdMenu,
  MdClose,
} from 'react-icons/md';
import { useAuth } from '../context/AuthContext';
import styles from './AdminLayout.module.css';

const nav = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: MdDashboard },
  { to: '/admin/appointments', label: 'Appointments', icon: MdEventNote },
  { to: '/admin/doctors', label: 'Doctors', icon: MdPeople },
  { to: '/admin/services', label: 'Services', icon: MdMedicalServices },
  { to: '/admin/messages', label: 'Messages', icon: MdMail },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={styles.shell}>
      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sideTop}>
          <div className={styles.brandLockup}>
            <span className={styles.adminNovita}>Novita</span>
            <span className={styles.adminDot} aria-hidden />
            <span className={styles.adminHealth}>Health</span>
          </div>
          <button type="button" className={styles.sideClose} onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <MdClose size={22} />
          </button>
        </div>
        <nav className={styles.nav}>
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.navActive : ''}`}
              onClick={() => setMobileOpen(false)}
            >
              <Icon className={styles.navIcon} />
              {label}
            </NavLink>
          ))}
        </nav>
        <button type="button" className={styles.logout} onClick={handleLogout}>
          <MdLogout className={styles.navIcon} />
          Logout
        </button>
      </aside>

      {mobileOpen && (
        <button type="button" className={styles.overlay} aria-label="Close menu" onClick={() => setMobileOpen(false)} />
      )}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button type="button" className={styles.burger} onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <MdMenu size={26} />
          </button>
          <div>
            <p className={styles.welcome}>Welcome back, {admin?.name || 'Admin'}</p>
            <p className={styles.date}>{today}</p>
          </div>
        </header>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            className={styles.content}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
