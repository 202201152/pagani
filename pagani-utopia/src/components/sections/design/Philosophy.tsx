import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { HORACIO_QUOTE } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in elements
      gsap.from('.philosophy-quote', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      gsap.from('.philosophy-attribution', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        delay: 0.2,
      });

      gsap.from('.philosophy-text', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        stagger: 0.15,
        delay: 0.4,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: '100vh',
        background: 'var(--void)',
        padding: 'clamp(80px, 10vw, 160px) 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Diagonal Pattern Background */}
      <div
        className="diagonal-pattern"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '680px',
          padding: '0 4vw',
          width: '100%',
        }}
      >
        {/* Quote */}
        <blockquote
          className="philosophy-quote font-display"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--cream)',
            lineHeight: 1.4,
            marginBottom: '24px',
          }}
        >
          {HORACIO_QUOTE.text}
        </blockquote>

        {/* Attribution */}
        <div
          className="philosophy-attribution font-mono"
          style={{
            fontSize: '11px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '48px',
          }}
        >
          — {HORACIO_QUOTE.author}, {HORACIO_QUOTE.role}
        </div>

        {/* Two Column Text */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '48px',
          }}
        >
          <div
            className="philosophy-text"
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.9,
            }}
          >
            <p style={{ marginBottom: '16px' }}>
              The Pagani Utopia represents the culmination of three decades of
              automotive artistry. Born in Modena, Italy, each vehicle is
              handcrafted by a team of fewer than twenty artisans, working in
              the same workshop where Horacio Pagani once sketched dreams on
              napkins.
            </p>
            <p>
              Every curve, every surface, every mechanical detail exists at the
              intersection of form and function. The Utopia is not merely
              transportation—it is a rolling sculpture, a testament to the
              belief that beauty and performance are not mutually exclusive,
              but inseparable.
            </p>
          </div>

          <div
            className="philosophy-text"
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.9,
            }}
          >
            <p style={{ marginBottom: '16px' }}>
              Only 99 units will ever exist. This is not a marketing decision;
              it is a philosophical one. Each Utopia requires six months of
              craftsmanship, with every component inspected by Horacio himself.
              To produce more would be to compromise the very essence of what
              makes these machines extraordinary.
            </p>
            <p>
              In a world of mass production, the Utopia stands as a reminder
              that true luxury cannot be scaled. It must be lived, felt, and
              experienced—one impossible detail at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
