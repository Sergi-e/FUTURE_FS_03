import { motion } from 'framer-motion';
import DoctorCard from '../../components/DoctorCard/DoctorCard';
import styles from './Team.module.css';

const NEUTRAL_PORTRAIT =
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300&q=80';

const TEAM_PORTRAITS = [
  'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&q=80',
  'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&q=80',
  'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&q=80',
  'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&q=80',
];

const fallback = [
  { _id: '1', name: 'Dr. Amara Nkosi', specialty: 'General Medicine' },
  { _id: '2', name: 'Dr. Leila Hassan', specialty: 'Mental Health' },
  { _id: '3', name: 'Dr. James Osei', specialty: 'Nutrition' },
  { _id: '4', name: 'Dr. Priya Sharma', specialty: 'Physiotherapy' },
];

function portraitForDoctor(doctor, index) {
  const name = doctor?.name || '';
  if (/Jean-Claude|Nkurunziza/i.test(name)) {
    return NEUTRAL_PORTRAIT;
  }
  return TEAM_PORTRAITS[index % TEAM_PORTRAITS.length];
}

export default function Team({ doctors }) {
  const list = doctors?.length ? doctors.slice(0, 4) : fallback;

  return (
    <section id="team" className={styles.section}>
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.h2}>Meet Our Team</h2>
          <p className={styles.sub}>Experienced clinicians who treat you like a person, not a chart.</p>
        </motion.div>
        <div className={styles.grid}>
          {list.map((d, i) => (
            <DoctorCard
              key={d._id || d.name}
              name={d.name}
              specialty={d.specialty}
              imageUrl={portraitForDoctor(d, i)}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
