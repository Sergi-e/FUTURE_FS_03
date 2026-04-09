import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Hero from '../../sections/Hero/Hero';
import Services from '../../sections/Services/Services';
import About from '../../sections/About/About';
import Team from '../../sections/Team/Team';
import Testimonials from '../../sections/Testimonials/Testimonials';
import Contact from '../../sections/Contact/Contact';
import { doctorsApi, servicesApi } from '../../services/api';

export default function Home() {
  const { onBookOpen } = useOutletContext() || {};
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [sRes, dRes] = await Promise.all([servicesApi.list(), doctorsApi.list()]);
        if (!cancelled) {
          setServices(sRes.data);
          setDoctors(dRes.data);
        }
      } catch {
        if (!cancelled) {
          setServices([]);
          setDoctors([]);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main>
      <Hero onBookOpen={onBookOpen} />
      <Services items={services} />
      <About />
      <Team doctors={doctors} />
      <Testimonials />
      <Contact />
    </main>
  );
}
