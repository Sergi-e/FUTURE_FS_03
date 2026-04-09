import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-60px',
    amount: 0.2,
    ...options,
  });
  return { ref, inView };
}
