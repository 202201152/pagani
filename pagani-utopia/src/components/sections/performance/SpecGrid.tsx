import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SPECS_GRID } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function SpecGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = document.querySelectorAll('.spec-card');

      cards.forEach((card, index) => {
        gsap.from(card, {
          clipPath: 'inset(0% 0% 100% 0%)',
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
          delay: index * 0.08,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: 'clamp(80px, 10vw, 160px) 0',
        background: 'var(--void)',
      }}
    >
      <div className="container">
        {/* Section Title */}
        <div
          style={{
            marginBottom: '64px',
          }}
        >
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 300,
              color: 'var(--cream)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            PERFORMANCE
          </h2>
          <div
            style={{
              width: '48px',
              height: '1px',
              background: 'var(--gold)',
            }}
          />
        </div>

        {/* Specs Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1px',
            background: 'var(--border-hi)',
            border: '1px solid var(--border-hi)',
          }}
        >
          {SPECS_GRID.map((spec, index) => (
            <div
              key={index}
              className="spec-card"
              style={{
                background: 'var(--void)',
                padding: 'clamp(24px, 4vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {/* Value & Unit */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  className="font-mono"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 36px)',
                    fontWeight: 300,
                    color: 'var(--cream)',
                    lineHeight: 1,
                  }}
                >
                  {spec.value}
                </span>
                {spec.unit && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: '14px',
                      color: 'var(--gold)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {spec.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <span
                className="font-mono"
                style={{
                  fontSize: '10px',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                }}
              >
                {spec.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
