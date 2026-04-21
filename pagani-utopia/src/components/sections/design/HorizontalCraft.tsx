import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { IMAGES } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function HorizontalCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Horizontal scroll animation
      gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="horizontal-section"
      style={{ background: 'var(--surface)' }}
    >
      <div ref={trackRef} className="horizontal-track">
        {/* Panel 1 - Body Lines */}
        <HorizontalPanel
          image={IMAGES.ct_top}
          imagePosition="left"
          number="01"
          category="CARBO-TITANIUM"
          title="Art Nouveau"
          body="Every surface curve follows an aerodynamic purpose. The result is sculpture that cuts air at 355 km/h."
        />

        {/* Panel 2 - Gear Shifter */}
        <HorizontalPanel
          image={IMAGES.ct_gear_7}
          imagePosition="right"
          number="02"
          category="TITANIUM MECHANICS"
          title="The Gearbox"
          body="An exposed 7-speed manual transmission. Each component machined from billet titanium. You feel every gram."
          showGrain
        />

        {/* Panel 3 - Engine Underside */}
        <EnginePanel />

        {/* Panel 4 - Interior Tease */}
        <HorizontalPanel
          image={IMAGES.sty_int}
          imagePosition="left"
          imageWidth="55"
          number="04"
          category="THE COCKPIT"
          title="Hand-stitched"
          body="Bull leather. Chrome instruments. The analog soul of a grand touring machine."
          cta={{ text: 'ENTER THE INTERIOR', link: '/interior' }}
        />
      </div>
    </section>
  );
}

function HorizontalPanel({
  image,
  imagePosition,
  imageWidth = '60',
  number,
  category,
  title,
  body,
  showGrain = false,
  cta,
}: {
  image: string;
  imagePosition: 'left' | 'right';
  imageWidth?: string;
  number: string;
  category: string;
  title: string;
  body: string;
  showGrain?: boolean;
  cta?: { text: string; link: string };
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const content = contentRef.current;
      if (!content) return;

      const elements = content.querySelectorAll('.animate-elem');

      gsap.from(elements, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: panelRef.current,
          start: 'left 60%',
          end: 'left 30%',
          toggleActions: 'play none none reverse',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const isLeft = imagePosition === 'left';

  return (
    <div
      ref={panelRef}
      className="horizontal-panel"
      style={{
        display: 'flex',
      }}
    >
      {/* Image Side */}
      <div
        style={{
          width: `${imageWidth}%`,
          height: '100%',
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
        }}
      >
        {showGrain && <div className="grain-overlay" />}
      </div>

      {/* Content Side */}
      <div
        ref={contentRef}
        style={{
          width: `${100 - parseFloat(imageWidth)}%`,
          height: '100%',
          background: 'var(--void)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 8vw',
        }}
      >
        <div
          style={{
            maxWidth: '540px',
          }}
        >
          {/* Number & Category */}
          <p
            className="animate-elem font-mono"
            style={{
              fontSize: '11px',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              letterSpacing: '0.25em',
              marginBottom: '16px',
            }}
          >
            {number} / {category}
          </p>

          {/* Title */}
          <h3
            className="animate-elem font-display"
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--cream)',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {title}
          </h3>

          {/* Body */}
          <p
            className="animate-elem"
            style={{
              fontSize: '14px',
              color: 'var(--muted)',
              lineHeight: 1.8,
              marginBottom: cta ? '32px' : 0,
            }}
          >
            {body}
          </p>

          {/* CTA */}
          {cta && (
            <a
              href={cta.link}
              className="animate-elem cta-btn btn-gold"
              style={{
                display: 'inline-flex',
                cursor: 'pointer',
                textDecoration: 'none',
              }}
            >
              {cta.text}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function EnginePanel() {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const dots = contentRef.current?.querySelectorAll('.callout-dot');

      if (dots) {
        dots.forEach((dot, index) => {
          gsap.to(dot, {
            scale: 1.4,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.3,
          });
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panelRef}
      className="horizontal-panel"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100%',
      }}
    >
      {/* Full Bleed Image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.ct_engine})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.75)',
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* Number & Category */}
        <p
          className="animate-elem font-mono"
          style={{
            fontSize: '11px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            marginBottom: '16px',
          }}
        >
          03 / THE V12 HEART
        </p>

        {/* Title */}
        <h3
          className="animate-elem font-display"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--cream)',
            lineHeight: 1.2,
            marginBottom: '48px',
          }}
        >
          6.0 Litres of pure obsession
        </h3>

        {/* Callout Annotations */}
        <div
          style={{
            display: 'flex',
            gap: '48px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <CalloutDot label="AMG V12 · 852HP" />
          <CalloutDot label="Öhlins TTX · 4-way adj." />
          <CalloutDot label="Titanium · Inconel" />
        </div>
      </div>
    </div>
  );
}

function CalloutDot({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        className="callout-dot"
        style={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          background: 'var(--gold)',
          boxShadow: '0 0 20px rgba(201, 168, 76, 0.6)',
        }}
      />
      <span
        className="font-mono"
        style={{
          fontSize: '10px',
          color: 'var(--gold)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </span>
    </div>
  );
}
