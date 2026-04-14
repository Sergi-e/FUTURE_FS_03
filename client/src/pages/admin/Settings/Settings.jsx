import { useEffect, useState } from 'react';
import { authApi } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import styles from './Settings.module.css';

const EMPTY_PASSWORDS = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export default function Settings() {
  const { admin, updateAdmin, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [profileForm, setProfileForm] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
  });
  const [passwordForm, setPasswordForm] = useState(EMPTY_PASSWORDS);
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    setProfileForm({
      name: admin?.name || '',
      email: admin?.email || '',
    });
  }, [admin]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { data } = await authApi.me();
        if (!cancelled && data?.admin) {
          updateAdmin(data.admin);
        }
      } catch {
        // Silent: we already have local auth state and 401 is handled globally.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [updateAdmin]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileMessage('');
    setProfileError('');
    setSavingProfile(true);
    try {
      const payload = { name: profileForm.name.trim(), email: profileForm.email.trim() };
      const { data } = await authApi.updateProfile(payload);
      updateAdmin(data.admin);
      setProfileMessage(data.message || 'Profile updated.');
    } catch (err) {
      setProfileError(err.response?.data?.message || 'Could not update profile.');
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordMessage('');
    setPasswordError('');
    setSavingPassword(true);
    try {
      const payload = {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      };
      const { data } = await authApi.changePassword(payload);
      setPasswordMessage(`${data.message || 'Password updated.'} Please sign in again.`);
      setPasswordForm(EMPTY_PASSWORDS);
      setTimeout(() => logout(), 1200);
    } catch (err) {
      setPasswordError(err.response?.data?.message || 'Could not update password.');
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Settings</h1>
      <p className={styles.subtitle}>Manage your admin account details and password.</p>

      <section className={styles.card}>
        <h2 className={styles.cardTitle}>Select section</h2>
        <div className={styles.sectionSwitch}>
          <button
            type="button"
            className={`${styles.switchBtn} ${activeSection === 'profile' ? styles.switchBtnActive : ''}`}
            onClick={() => setActiveSection('profile')}
          >
            Account details
          </button>
          <button
            type="button"
            className={`${styles.switchBtn} ${activeSection === 'security' ? styles.switchBtnActive : ''}`}
            onClick={() => setActiveSection('security')}
          >
            Change password
          </button>
        </div>
      </section>

      {activeSection === 'profile' && (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Account details</h2>
          <form className={styles.form} onSubmit={handleProfileSubmit}>
            <div className={styles.field}>
              <label htmlFor="admin-name">Display name</label>
              <input
                id="admin-name"
                value={profileForm.name}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, name: e.target.value }))}
                minLength={2}
                maxLength={60}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            {profileError && <p className={styles.error}>{profileError}</p>}
            {profileMessage && <p className={styles.success}>{profileMessage}</p>}
            <button type="submit" className={styles.primaryBtn} disabled={savingProfile}>
              {savingProfile ? 'Saving...' : 'Save profile'}
            </button>
          </form>
        </section>
      )}

      {activeSection === 'security' && (
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Change password</h2>
          <form className={styles.form} onSubmit={handlePasswordSubmit}>
            <div className={styles.field}>
              <label htmlFor="current-password">Current password</label>
              <input
                id="current-password"
                type="password"
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                minLength={6}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="new-password">New password</label>
              <input
                id="new-password"
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                minLength={6}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="confirm-password">Confirm new password</label>
              <input
                id="confirm-password"
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                minLength={6}
                required
              />
            </div>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            {passwordMessage && <p className={styles.success}>{passwordMessage}</p>}
            <button type="submit" className={styles.primaryBtn} disabled={savingPassword}>
              {savingPassword ? 'Updating...' : 'Update password'}
            </button>
          </form>
        </section>
      )}
    </div>
  );
}
