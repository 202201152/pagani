import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ACCEL_DATA = [
  { time: '0.0s', label: 'LAUNCH' },
  { time: '2.5s', label: '100 KM/H' },
  { time: '9.1s', label: '200 KM/H' },
];

export function AccelSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Draw timeline line
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: '100%',
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Title animation
      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
        },
      });

      // Subtitle animation
      gsap.from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 55%',
        },
        delay: 0.2,
      });

      // Marker animations
      const markers = document.querySelectorAll('.accel-marker');
      markers.forEach((marker, index) => {
        gsap.from(marker, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
          delay: 0.4 + index * 0.2,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        background: 'var(--void)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 4vw',
      }}
    >
      {/* Title */}
      <h2
        ref={titleRef}
        className="font-display"
        style={{
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--cream)',
          marginBottom: '12px',
        }}
      >
        2.5 seconds.
      </h2>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        style={{
          fontSize: 'clamp(16px, 2.5vw, 20px)',
          color: 'var(--muted)',
          marginBottom: '80px',
          fontStyle: 'italic',
        }}
      >
        Zero to one hundred. Blink and miss it.
      </p>

      {/* Timeline */}
      <div
        style={{
          width: '100%',
          maxWidth: '800px',
          position: 'relative',
        }}
      >
        {/* Timeline Line */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'var(--border-hi)',
            position: 'relative',
          }}
        >
          {/* Markers */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'space-between',
              transform: 'translateY(-50%)',
            }}
          >
            {ACCEL_DATA.map((data, index) => (
              <div
                key={index}
                className="accel-marker"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: 'var(--gold)',
                    boxShadow: '0 0 12px rgba(201, 168, 76, 0.8)',
                  }}
                />

                {/* Label */}
                <div
                  className="font-mono"
                  style={{
                    fontSize: '10px',
                    color: 'var(--gold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    textAlign: 'center',
                  }}
                >
                  {data.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Time Labels Below */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px',
          }}
        >
          {ACCEL_DATA.map((data, index) => (
            <div
              key={index}
              className="accel-marker font-mono"
              style={{
                fontSize: '11px',
                color: 'var(--muted)',
                textAlign: 'center',
              }}
            >
              {data.time}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
