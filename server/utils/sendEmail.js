import nodemailer from 'nodemailer';

const teal = '#2A6B5E';
const wrapHtml = (title, bodyHtml) => `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>${title}</title></head>
<body style="margin:0;font-family:Georgia,serif;background:#FAFAF8;padding:24px;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 2px 16px rgba(42,107,94,0.08);">
    <tr><td style="background:${teal};padding:20px 24px;color:#FFFFFF;font-size:20px;font-weight:600;">Novita Health</td></tr>
    <tr><td style="padding:28px 24px;color:#1A1A1A;font-size:15px;line-height:1.6;">${bodyHtml}</td></tr>
    <tr><td style="padding:16px 24px;background:#F2F0EB;color:#5C5C5C;font-size:12px;">Kigali, Rwanda · Private care, human touch.</td></tr>
  </table>
</body>
</html>
`;

export const getTransporter = () => {
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: false,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
};

export async function sendMail({ to, subject, html }) {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn('Email not configured: skipping send to', to);
    return { skipped: true };
  }
  await transporter.sendMail({
    from: `"Novita Health" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
  return { sent: true };
}

export function appointmentPatientEmail(patientName) {
  return wrapHtml(
    'Appointment received',
    `<p>Hello ${patientName},</p>
    <p>Your appointment request at <strong style="color:${teal};">Novita Health</strong> has been received.</p>
    <p>We'll confirm within <strong>2 hours</strong> during business hours.</p>
    <p style="margin-top:24px;color:#5C5C5C;">With care,<br/>The Novita Health team</p>`
  );
}

export function appointmentAdminEmail({ patientName, department, preferredDate, preferredTime }) {
  const dateStr = new Date(preferredDate).toLocaleDateString('en-GB', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  return wrapHtml(
    'New appointment',
    `<p><strong>New appointment</strong></p>
    <p><strong style="color:${teal};">${patientName}</strong> booked <strong>${department}</strong> for <strong>${dateStr}</strong> at <strong>${preferredTime}</strong>.</p>
    <p>Please review in the admin dashboard.</p>`
  );
}
