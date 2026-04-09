const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value) {
  return typeof value === 'string' && EMAIL_RE.test(value.trim());
}

/** @param {string} dateStr - YYYY-MM-DD from date input */
export function isFutureDateString(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d > today;
}

export const DEPARTMENTS = [
  { value: 'General Medicine', label: 'General Medicine' },
  { value: 'Mental Health', label: 'Mental Health' },
  { value: 'Nutrition', label: 'Nutrition' },
  { value: 'Physiotherapy', label: 'Physiotherapy' },
];
