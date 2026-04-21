import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TEASER_SPECS } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function SpecsTeaser() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const specs = document.querySelectorAll('.spec-item');

      specs.forEach((spec, index) => {
        const valueEl = spec.querySelector('.spec-value');
        const labelEl = spec.querySelector('.spec-label');
        const sublabelEl = spec.querySelector('.spec-sublabel');

        if (!valueEl || !labelEl) return;

        // Create timeline for this spec
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spec,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        });

        // Count up animation for value
        const targetValue = parseFloat(spec.getAttribute('data-value') || '0');
        const isFloat = targetValue % 1 !== 0;

        tl.from(
          {},
          {
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              const progress = tl.progress();
              const currentValue = targetValue * progress;
              if (isFloat) {
                valueEl.textContent = currentValue.toFixed(1);
              } else {
                valueEl.textContent = Math.round(currentValue).toLocaleString();
              }
            },
          },
          0
        );

        // Label appears after count finishes
        tl.to(
          labelEl,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
          },
          '-=0.3'
        );

        // Sublabel appears after label
        if (sublabelEl) {
          tl.to(
            sublabelEl,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power3.out',
            },
            '-=0.3'
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--void)',
        position: 'relative',
      }}
    >
      {/* 2x2 Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'clamp(40px, 8vw, 80px)',
          padding: '0 4vw',
        }}
      >
        {TEASER_SPECS.map((spec, index) => (
          <div
            key={index}
            className="spec-item"
            data-value={spec.value}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            {/* Value */}
            <div
              className="spec-value font-mono"
              style={{
                fontSize: 'clamp(48px, 6vw, 80px)',
                fontWeight: 300,
                color: 'var(--cream)',
                lineHeight: 1,
              }}
            >
              {spec.value}
            </div>

            {/* Label */}
            <div
              className="spec-label font-mono"
              style={{
                fontSize: 'clamp(10px, 1.5vw, 11px)',
                color: 'var(--gold)',
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                marginTop: '12px',
                opacity: 0,
                transform: 'translateY(10px)',
              }}
            >
              {spec.label}
            </div>

            {/* Sublabel */}
            {spec.sublabel && (
              <div
                className="spec-sublabel font-mono"
                style={{
                  fontSize: 'clamp(9px, 1.2vw, 10px)',
                  color: 'var(--muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.25em',
                  marginTop: '6px',
                  opacity: 0,
                  transform: 'translateY(10px)',
                }}
              >
                {spec.sublabel}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Grid Lines */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(200px, 50vw, 600px)',
          height: 'clamp(200px, 50vw, 600px)',
          pointerEvents: 'none',
        }}
      >
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            background: 'var(--border-hi)',
            transform: 'translateX(-50%)',
          }}
        />
        {/* Horizontal line */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '50%',
            height: '1px',
            background: 'var(--border-hi)',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
    </section>
  );
}
