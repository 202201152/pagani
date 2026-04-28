import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { setCurrentCameraPosition } = useAppStore();
  const previousPathRef = useRef(location.pathname);

  useEffect(() => {
    // Determine camera position based on route
    const getCameraPosition = () => {
      if (location.pathname === '/') return 'home';
      if (location.pathname === '/design') return 'design';
      if (location.pathname === '/performance') return 'performance';
      if (location.pathname === '/interior') return 'interior';
      return 'home';
    };

    const newCameraPos = getCameraPosition();

    // Only animate if path actually changed
    if (location.pathname === previousPathRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Cover screen with overlay
      tl.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.5,
        ease: 'expo.inOut',
      });

      // 2. During blackout, camera animates to new position
      tl.to(
        {},
        {
          duration: 0.7,
          onStart: () => {
            setCurrentCameraPosition(newCameraPos);
          },
        },
        '-=0.3'
      );

      // 3. Reveal new page
      tl.to(overlayRef.current, {
        clipPath: 'inset(0% 0% 0% 100%)',
        duration: 0.5,
        ease: 'expo.inOut',
      });

      // 4. Fade in page content
      tl.from('.page-content > *', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }, '-=0.3');
    });

    previousPathRef.current = location.pathname;

    return () => ctx.revert();
  }, [location.pathname, setCurrentCameraPosition]);

  return (
    <>
      <div ref={overlayRef} className="page-transition" />
      <div className="page-content">{children}</div>
    </>
  );
}
