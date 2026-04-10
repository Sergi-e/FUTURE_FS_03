import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import BackToTop from '../components/BackToTop/BackToTop';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import BookingModal from '../components/BookingModal/BookingModal';

export default function PublicLayout() {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Navbar onBookOpen={() => setBookingOpen(true)} />
      <Outlet context={{ onBookOpen: () => setBookingOpen(true) }} />
      <Footer />
      <BackToTop />
      <BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
