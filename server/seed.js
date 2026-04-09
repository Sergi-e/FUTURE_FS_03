import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from './models/Admin.js';
import Doctor from './models/Doctor.js';
import Service from './models/Service.js';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/novita_health';

const doctors = [
  {
    name: 'Dr. Jean-Claude Nkurunziza',
    specialty: 'General & Family Medicine',
    department: 'General Medicine',
    bio: 'Comprehensive primary care with a focus on prevention and long-term wellness for Kigali families.',
    email: 'j.nkurunziza@novitahealth.com',
    available: true,
  },
  {
    name: 'Dr. Amina Uwase',
    specialty: 'Psychiatry & Counseling',
    department: 'Mental Health',
    bio: 'Compassionate mental health support combining evidence-based therapy and medication when appropriate.',
    email: 'a.uwase@novitahealth.com',
    available: true,
  },
  {
    name: 'Dr. Samuel Habimana',
    specialty: 'Clinical Nutrition',
    department: 'Nutrition',
    bio: 'Personalized nutrition plans for metabolic health, recovery, and sustainable lifestyle change.',
    email: 's.habimana@novitahealth.com',
    available: true,
  },
  {
    name: 'Dr. Grace Mukamana',
    specialty: 'Physiotherapy & Rehabilitation',
    department: 'Physiotherapy',
    bio: 'Hands-on rehabilitation for mobility, pain relief, and return to the activities you love.',
    email: 'g.mukamana@novitahealth.com',
    available: true,
  },
];

const services = [
  {
    title: 'General Medicine',
    description:
      'Preventive check-ups, chronic disease management, acute illness care, and coordinated referrals when you need a specialist.',
    department: 'General Medicine',
    icon: 'general',
    active: true,
  },
  {
    title: 'Mental Health',
    description:
      'Confidential consultations for anxiety, depression, stress, and life transitions — in a calm, judgment-free environment.',
    department: 'Mental Health',
    icon: 'mental',
    active: true,
  },
  {
    title: 'Nutrition & Dietetics',
    description:
      'Science-backed meal planning, weight management, and support for diabetes, digestion, and athletic performance.',
    department: 'Nutrition',
    icon: 'nutrition',
    active: true,
  },
  {
    title: 'Physiotherapy',
    description:
      'Manual therapy, exercise programs, and post-injury rehabilitation tailored to your goals and daily life.',
    department: 'Physiotherapy',
    icon: 'physio',
    active: true,
  },
];

async function seed() {
  await mongoose.connect(uri);
  console.log('Connected for seed');

  await Doctor.deleteMany({});
  await Service.deleteMany({});
  await Doctor.insertMany(doctors);
  await Service.insertMany(services);
  console.log('Doctors and services seeded');

  const adminEmail = 'admin@novitahealth.com';
  await Admin.deleteMany({ email: adminEmail });
  await Admin.create({
    email: adminEmail,
    password: 'Admin@2024',
    name: 'Administrator',
  });
  console.log('Admin created:', adminEmail);

  await mongoose.disconnect();
  console.log('Done.');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
