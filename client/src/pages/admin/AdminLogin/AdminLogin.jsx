import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { useAuth } from '../../../context/AuthContext';
import { authApi } from '../../../services/api';
import styles from './AdminLogin.module.css';

export default function AdminLogin() {
  const { isAuthenticated, setAuth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { email: '', password: '' } });

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setError('');
    try {
      const res = await authApi.login(data.email, data.password);
      setAuth(res.data.token, res.data.admin);
      navigate('/admin/dashboard', { replace: true });
    } catch (e) {
      setError(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className={styles.brand}>
          <span className={styles.brandNovita}>Novita</span>
          <span className={styles.brandHealth}>Health</span>
        </div>
        <p className={styles.hint}>Staff sign in</p>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.field}>
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <span className={styles.err}>{errors.email.message}</span>}
          </div>
          <div className={styles.field}>
            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <span className={styles.err}>{errors.password.message}</span>}
          </div>
          <button type="submit" className={styles.btn} disabled={isSubmitting}>
            {isSubmitting ? 'Signing in…' : 'Login'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
