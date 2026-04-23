import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function EngineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade overlay on scroll enter
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(10, 10, 10, 0.3)',
        duration: 1.2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: true,
        },
      });

      // Title fade in
      gsap.from(titleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        position: 'relative',
        background: 'var(--void)',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 50% 42%, rgba(40, 40, 40, 0.42), rgba(10, 10, 10, 0.96) 68%)',
        }}
      />

      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.72), rgba(10, 10, 10, 0.45))',
          transition: 'background-color 1.2s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Title */}
      <h2
        ref={titleRef}
        className="font-mono"
        style={{
          position: 'absolute',
          top: '48px',
          left: '4vw',
          fontSize: '11px',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          zIndex: 1,
        }}
      >
        V12 · 6.0L · 852HP
      </h2>
    </section>
  );
}
