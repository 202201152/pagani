import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  ThreeDScrollTriggerContainer,
  ThreeDScrollTriggerRow,
} from '../../ui/ThreeDScrollTrigger';

// --- Image data for the marquee rows ---
const ROW_1_ITEMS = [
  {
    src: '/assets/img/pu_exterior.png',
    label: 'EXTERIOR',
    caption: 'Art Nouveau Silhouette',
  },
  {
    src: '/assets/img/ct_top.jpg',
    label: 'CARBO-TITANIUM',
    caption: 'HP62 G2 Monocoque',
  },
  {
    src: '/assets/img/pu_rear.png',
    label: 'REAR FASCIA',
    caption: 'Quad Titanium Exhausts',
  },
  {
    src: '/assets/img/st_front.jpg',
    label: 'FRONT END',
    caption: 'Active Aerodynamics',
  },
  {
    src: '/assets/img/st_back.jpg',
    label: 'CARBON SKIN',
    caption: 'Handformed Bodywork',
  },
];

const ROW_2_ITEMS = [
  {
    src: '/assets/img/pu_interior.png',
    label: 'COCKPIT',
    caption: 'Hand-stitched Bull Leather',
  },
  {
    src: '/assets/img/ct_gear_7.jpg',
    label: 'GEARBOX',
    caption: '7-Speed Manual · Titanium',
  },
  {
    src: '/assets/img/pu_engine.png',
    label: 'V12 ENGINE',
    caption: '6.0 L · 852 HP · AMG Built',
  },
  {
    src: '/assets/img/sty_int.jpg',
    label: 'INSTRUMENTS',
    caption: 'Chrome Analog Gauges',
  },
  {
    src: '/assets/img/ct_engine.jpg',
    label: 'POWER PLANT',
    caption: 'Inconel & Titanium Block',
  },
];

// --- Individual marquee card ---
function GalleryCard({
  src,
  label,
  caption,
}: {
  src: string;
  label: string;
  caption: string;
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        width: '320px',
        height: '200px',
        marginRight: '20px',
        borderRadius: '2px',
        overflow: 'hidden',
        position: 'relative',
        flexShrink: 0,
        cursor: 'default',
      }}
      className="marquee-card"
    >
      <img
        src={src}
        alt={caption}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
          filter: 'brightness(0.88) contrast(1.06)',
          transition: 'transform 0.6s ease, filter 0.4s ease',
        }}
        draggable={false}
      />
      {/* Gold overlay label */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background:
            'linear-gradient(to top, rgba(10,10,10,0.88) 0%, transparent 100%)',
          padding: '20px 16px 14px',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: '9px',
            fontFamily: 'var(--font-mono, monospace)',
            color: 'var(--gold, #C9A84C)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontSize: '12px',
            color: 'var(--cream, #F0EDE8)',
            letterSpacing: '0.04em',
          }}
        >
          {caption}
        </p>
      </div>
    </div>
  );
}

// --- Separator ornament between rows ---
function RowSeparator() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        padding: '32px 60px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }}
      />
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '9px',
          color: 'var(--gold, #C9A84C)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          opacity: 0.7,
        }}
      >
        Pagani Utopia · Modena, Italy · Est. 1992
      </p>
      <div
        style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.15)' }}
      />
    </div>
  );
}

// --- Main section header ---
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: 'center',
        padding: '80px 40px 48px',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono, monospace)',
          fontSize: '10px',
          color: 'var(--gold, #C9A84C)',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          opacity: 0.8,
        }}
      >
        01 / THE CRAFT
      </p>
      <h2
        className="font-display"
        style={{
          fontSize: 'clamp(36px, 5.5vw, 72px)',
          fontWeight: 300,
          fontStyle: 'italic',
          color: 'var(--cream, #F0EDE8)',
          lineHeight: 1.15,
          letterSpacing: '-0.01em',
          marginBottom: '20px',
        }}
      >
        99 units.
        <br />
        Each one a revelation.
      </h2>
      <p
        style={{
          fontFamily: 'sans-serif',
          fontSize: '14px',
          color: 'var(--muted, #888)',
          lineHeight: 1.8,
          maxWidth: '520px',
          margin: '0 auto',
        }}
      >
        Scroll to feel the momentum. Every surface, every component,
        every stitch — crafted by hand in Modena.
      </p>
    </motion.div>
  );
}

// --- Main export ---
export function HorizontalCraft() {
  return (
    <section
      style={{
        background: 'var(--surface, #0e0e0e)',
        paddingBottom: '80px',
        overflow: 'hidden',
      }}
    >
      <SectionHeader />

      <ThreeDScrollTriggerContainer>
        {/* Row 1 — scrolls LEFT → */}
        <ThreeDScrollTriggerRow
          baseVelocity={4}
          direction={1}
          style={{ paddingBottom: '20px' }}
        >
          {ROW_1_ITEMS.map((item) => (
            <GalleryCard key={item.src + item.label} {...item} />
          ))}
        </ThreeDScrollTriggerRow>

        <RowSeparator />

        {/* Row 2 — scrolls RIGHT ← */}
        <ThreeDScrollTriggerRow
          baseVelocity={4}
          direction={-1}
          style={{ paddingBottom: '20px' }}
        >
          {ROW_2_ITEMS.map((item) => (
            <GalleryCard key={item.src + item.label} {...item} />
          ))}
        </ThreeDScrollTriggerRow>
      </ThreeDScrollTriggerContainer>

      {/* Bottom rule */}
      <div
        style={{
          margin: '48px 60px 0',
          height: '1px',
          background:
            'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)',
        }}
      />
    </section>
  );
}
