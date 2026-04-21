import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useAppStore } from '../../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const { setScrollProgress } = useAppStore();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchSmoothness: 0.1,
      smoothTouch: false,
    });

    lenisRef.current = lenis;

    // Connect to GSAP ticker
    const raf = (time: number) => {
      lenis.raf(time * 1000);
      gsap.ticker.request(raf);
    };

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Update scroll progress
    const updateScrollProgress = () => {
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = window.scrollY / maxScroll;
      setScrollProgress(progress);
    };

    lenis.on('scroll', updateScrollProgress);

    // Handle route changes - scroll to top
    const handleRouteChange = () => {
      lenis.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    window.addEventListener('pagani-route-change', handleRouteChange);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
      window.removeEventListener('pagani-route-change', handleRouteChange);
    };
  }, [setScrollProgress]);

  return <>{children}</>;
}
