import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function DesignHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title fade in
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Subtitle fade in
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
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
        overflow: 'hidden',
      }}
    >
      {/* Background Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/assets/img/pg_ut.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Dark Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3), rgba(10,10,10,0.7))',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(80px, 18vw, 240px)',
            fontWeight: 300,
            color: 'var(--cream)',
            letterSpacing: '0.15em',
            lineHeight: 1,
            textShadow: '0 20px 40px rgba(0,0,0,0.8)',
            marginBottom: '24px',
          }}
        >
          UTOPIA
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono"
          style={{
            fontSize: 'clamp(12px, 2vw, 16px)',
            color: 'var(--gold)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            textAlign: 'center',
          }}
        >
          Born from obsession
        </p>
      </div>
    </section>
  );
}
