import LogoLoop from '../../ui/LogoLoop';

const partnerLogos = [
  { src: '/assets/img/amg_lg.png',    alt: 'AMG' },
  { src: '/assets/img/arrow_lg.png',  alt: 'Arrow' },
  { src: '/assets/img/art_lg.png',    alt: 'ART' },
  { src: '/assets/img/aspa_lg.png',   alt: 'ASPA' },
  { src: '/assets/img/bermbo_lg.png', alt: 'Brembo' },
  { src: '/assets/img/bosh_lg.png',   alt: 'Bosch' },
  { src: '/assets/img/pir_lg.png',    alt: 'Pirelli' },
];

export function PartnersSection() {
  return (
    <section
      id="partners"
      style={{
        width: '100%',
        padding: '80px 0',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      {/* Label */}
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '10px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--gold)',
          textAlign: 'center',
          marginBottom: '48px',
          opacity: 0.8,
        }}
      >
        Technical Partners
      </p>

      {/* Logo strip */}
      <div style={{ height: '64px', position: 'relative', overflow: 'hidden' }}>
        <LogoLoop
          logos={partnerLogos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={80}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#000000"
          ariaLabel="Pagani technical partners"
        />
      </div>
    </section>
  );
}
