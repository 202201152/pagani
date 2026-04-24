import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SPECS_GRID } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

const mapRange = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const pct = (value - inMin) / (inMax - inMin);
  return outMin + Math.max(0, Math.min(1, pct)) * (outMax - outMin);
};

export function SpecGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const needleRefs = useRef<(HTMLImageElement | null)[]>([]);
  const idleTweensRef = useRef<gsap.core.Tween[]>([]);
  const startupTlRef = useRef<gsap.core.Timeline | null>(null);

  const [isIgnited, setIsIgnited] = useState(false);
  const [throttle, setThrottle] = useState(24);

  const topRow = useMemo(() => SPECS_GRID.slice(0, 3), []);
  const middleRow = useMemo(() => SPECS_GRID.slice(3, 6), []);
  const bottomRow = useMemo(() => SPECS_GRID.slice(6, 9), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

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

      gsap.from('.perf-title-reveal', {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isIgnited) {
      startupTlRef.current?.kill();
      idleTweensRef.current.forEach((tween) => tween.kill());
      idleTweensRef.current = [];
      needleRefs.current.forEach((needle) => {
        if (!needle) return;
        gsap.to(needle, { rotation: -128, duration: 0.35, ease: 'power2.out', overwrite: true });
      });
      return;
    }

    const activeNeedles = needleRefs.current.filter(Boolean);
    startupTlRef.current?.kill();
    idleTweensRef.current.forEach((tween) => tween.kill());
    idleTweensRef.current = [];

    startupTlRef.current = gsap
      .timeline()
      .to(activeNeedles, {
        rotation: 118,
        duration: 1.2,
        ease: 'power2.inOut',
        stagger: 0.04,
      })
      .to(
        activeNeedles,
        {
          rotation: (i) => [28, 22, 18, 12, 25, 16][i] ?? 14,
          duration: 0.95,
          ease: 'power3.out',
          stagger: 0.02,
        },
        '>-0.1'
      );

    idleTweensRef.current = activeNeedles.map((needle, index) =>
      gsap.to(needle, {
        rotation: `+=${index % 2 === 0 ? 2.6 : -2.2}`,
        duration: 0.75 + index * 0.05,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      })
    );
  }, [isIgnited]);

  useEffect(() => {
    if (!isIgnited) return;

    const targets = [
      mapRange(throttle, 0, 100, -125, 108), // Engine power
      mapRange(throttle, 0, 100, -120, 72), // Displacement
      mapRange(throttle, 0, 100, -122, 56), // Weight readout
      mapRange(throttle, 0, 100, -130, 124), // 0-100 response
      mapRange(throttle, 0, 100, -128, 135), // Top speed
      mapRange(throttle, 0, 100, -126, 115), // Units built / telemetry demo
    ];

    targets.forEach((target, idx) => {
      const needle = needleRefs.current[idx];
      if (!needle) return;
      gsap.to(needle, {
        rotation: target,
        duration: 0.28,
        ease: 'power2.out',
        overwrite: true,
      });
    });
  }, [throttle, isIgnited]);

  const rpm = Math.round(mapRange(throttle, 0, 100, 1100, 7300));
  const hp = Math.round(mapRange(throttle, 0, 100, 120, 852));
  const gear = throttle < 25 ? 'II' : throttle < 50 ? 'III' : throttle < 75 ? 'IV' : 'V';
  const zone = throttle > 72 ? 'RACE' : 'OPT';

  return (
    <section ref={sectionRef} style={{ padding: 'clamp(72px, 9vw, 140px) 0', background: '#05070D' }}>
      <div className="container">
        <div
          style={{
            borderTop: '1px solid rgba(201,168,76,0.2)',
            borderBottom: '1px solid rgba(201,168,76,0.12)',
            padding: '10px 0',
            marginBottom: 'clamp(28px, 4vw, 48px)',
            display: 'grid',
            gap: '8px',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.72)',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px 18px',
            }}
          >
            <span>Pagani · Automobili Modena · Utopia</span>
            <span style={{ color: 'var(--gold)' }}>System · Live</span>
            <span>Chassis N°099 / 099</span>
            <span>RPM 4396</span>
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: '9px',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.48)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 16px',
            }}
          >
            <span>Oil 82.4°C</span>
            <span>Coolant 88.1°C</span>
            <span>Fuel 74%</span>
            <span>Volts 14.2V</span>
            <span>Boost 0.34 Bar</span>
            <span>Drive RWD</span>
            <span>Mode Sport</span>
          </div>
        </div>

        <div
          style={{
            minHeight: 'clamp(260px, 42vw, 460px)',
            display: 'grid',
            alignContent: 'space-between',
            marginBottom: 'clamp(24px, 3vw, 38px)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '16px',
              alignItems: 'start',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p
                className="font-mono perf-title-reveal"
                style={{
                  margin: 0,
                  fontSize: '10px',
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.85)',
                  marginBottom: '12px',
                }}
              >
                Capitolo 01 · Telemetria
              </p>
              <h2
                className="font-display perf-title-reveal"
                style={{
                  margin: 0,
                  fontSize: 'clamp(58px, 12vw, 158px)',
                  lineHeight: 0.85,
                  color: 'var(--cream)',
                  fontWeight: 400,
                }}
              >
                Perf
                <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>or</span>
                mance
              </h2>
            </div>

            <div style={{ maxWidth: '290px', alignSelf: 'center' }}>
              <p
                className="font-mono"
                style={{
                  margin: '0 0 8px 0',
                  fontSize: '9px',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(245,240,232,0.55)',
                }}
              >
                Atelier de Utopia
              </p>
              <p
                className="font-display"
                style={{
                  margin: 0,
                  fontSize: 'clamp(14px,1.6vw,20px)',
                  lineHeight: 1.35,
                  fontStyle: 'italic',
                  color: 'rgba(245,240,232,0.62)',
                }}
              >
                Art and science, in Modena, have always walked hand in hand.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', justifyItems: 'center' }}>
            <button
              type="button"
              className="font-mono"
              onClick={() => setIsIgnited((prev) => !prev)}
              style={{
                width: '112px',
                height: '112px',
                borderRadius: '50%',
                border: '1px solid rgba(201,168,76,0.55)',
                background:
                  'radial-gradient(circle at 50% 40%, rgba(201,168,76,0.3), rgba(7,9,16,0.95) 58%), #05070D',
                color: 'rgba(245,240,232,0.85)',
                fontSize: '10px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                boxShadow: '0 0 0 8px rgba(201,168,76,0.05), 0 16px 40px rgba(0,0,0,0.45)',
                cursor: 'pointer',
              }}
              aria-label="Ignition"
            >
              {isIgnited ? 'Running' : 'Ignition'}
            </button>
          </div>
        </div>

        <div
          style={{
            border: '1px solid rgba(201,168,76,0.45)',
            background:
              'linear-gradient(180deg, rgba(9,12,20,0.98), rgba(6,8,14,0.98)), radial-gradient(circle at 50% -10%, rgba(201,168,76,0.07), transparent 55%)',
            boxShadow: 'inset 0 0 0 1px rgba(245,240,232,0.05)',
          }}
        >
          <div
            className="telemetry-grid-row"
            style={{
              borderBottom: '1px solid rgba(201,168,76,0.14)',
            }}
          >
            {topRow.map((spec, index) => (
              <TelemetryGaugeCard
                key={spec.label}
                spec={spec}
                slotLabel={`Gauge · 0${index + 1}`}
                accent={index === 0 ? '#D94A49' : '#C9A84C'}
                faceImage={
                  index === 0
                    ? '/assets/images/meter-engine.png'
                    : index === 1
                      ? '/assets/images/meter-displacement.png'
                      : '/assets/images/meter-weight.png'
                }
                needleImage="/assets/images/meters-needle.png"
                setRef={(el) => {
                  cardsRef.current[index] = el;
                }}
                setNeedleRef={(el) => {
                  needleRefs.current[index] = el;
                }}
              />
            ))}
          </div>

          <div
            className="telemetry-grid-row"
            style={{
              borderBottom: '1px solid rgba(201,168,76,0.14)',
            }}
          >
            {middleRow.map((spec, index) => (
              <TelemetryGaugeCard
                key={spec.label}
                spec={spec}
                slotLabel={`Gauge · 0${index + 4}`}
                accent={index > 0 ? '#D94A49' : '#C9A84C'}
                faceImage={
                  index === 0
                    ? '/assets/images/meter-speedometer.png'
                    : index === 1
                      ? '/assets/images/meter-engine.png'
                      : '/assets/images/meter-displacement.png'
                }
                needleImage="/assets/images/meters-needle.png"
                setRef={(el) => {
                  cardsRef.current[index + 3] = el;
                }}
                setNeedleRef={(el) => {
                  needleRefs.current[index + 3] = el;
                }}
              />
            ))}
          </div>

          <div className="telemetry-grid-row">
            {bottomRow.map((spec, index) => (
              <TelemetryTypeCard
                key={spec.label}
                spec={spec}
                setRef={(el) => {
                  cardsRef.current[index + 6] = el;
                }}
              />
            ))}
          </div>
        </div>

        <div
          className="telemetry-control-row"
          style={{
            marginTop: '14px',
            border: '1px solid rgba(201,168,76,0.2)',
            padding: 'clamp(16px,2.6vw,22px)',
            gap: '16px',
            alignItems: 'center',
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: '10px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.7)',
              lineHeight: 1.5,
            }}
          >
            <div>Accelerator</div>
            <div style={{ color: 'rgba(245,240,232,0.45)' }}>Drive by wire · drag to rev</div>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              type="range"
              min={0}
              max={100}
              value={throttle}
              onChange={(event) => setThrottle(Number(event.target.value))}
              disabled={!isIgnited}
              aria-label="Accelerator"
              style={{
                width: '100%',
                accentColor: 'var(--gold)',
                cursor: isIgnited ? 'ew-resize' : 'not-allowed',
              }}
            />
            <span
              style={{
                position: 'absolute',
                left: `${throttle}%`,
                top: '50%',
                width: '18px',
                height: '18px',
                transform: 'translate(-50%,-50%)',
                borderRadius: '50%',
                background: '#E8C96A',
                border: '1px solid rgba(0,0,0,0.5)',
                boxShadow: '0 0 0 4px rgba(232,201,106,0.15)',
              }}
            />
          </div>
          <div
            className="font-mono"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, auto)',
              gap: '6px 18px',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'rgba(245,240,232,0.5)' }}>RPM</span>
            <span style={{ color: 'var(--cream)', fontSize: '30px', fontFamily: 'var(--font-display)' }}>{rpm}</span>
            <span style={{ color: 'rgba(245,240,232,0.5)' }}>HP</span>
            <span style={{ color: 'var(--cream)', fontSize: '30px', fontFamily: 'var(--font-display)' }}>{hp}</span>
            <span style={{ color: 'rgba(245,240,232,0.5)' }}>Gear</span>
            <span style={{ color: 'var(--cream)', fontSize: '22px', fontFamily: 'var(--font-display)' }}>{gear}</span>
            <span style={{ color: 'rgba(245,240,232,0.5)' }}>Zone</span>
            <span style={{ color: 'var(--gold)', fontSize: '22px', fontFamily: 'var(--font-display)' }}>{zone}</span>
          </div>
        </div>

        <div
          className="font-mono"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            marginTop: 'clamp(20px,2.8vw,34px)',
            color: 'rgba(245,240,232,0.44)',
            fontSize: '9px',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            flexWrap: 'wrap',
          }}
        >
          <span>Modena · Italia · MMXXV</span>
          <span className="font-display" style={{ fontSize: 'clamp(28px,3.6vw,52px)', letterSpacing: '0.01em', color: 'var(--gold)', textTransform: 'none', fontStyle: 'italic' }}>
            Horacio Pagani
          </span>
          <span>V12 · Naturally Aspirated</span>
        </div>
      </div>
    </section>
  );
}

type TelemetrySpec = (typeof SPECS_GRID)[number];

function TelemetryGaugeCard({
  spec,
  slotLabel,
  accent,
  faceImage,
  needleImage,
  setRef,
  setNeedleRef,
}: {
  spec: TelemetrySpec;
  slotLabel: string;
  accent: string;
  faceImage: string;
  needleImage: string;
  setRef: (el: HTMLDivElement | null) => void;
  setNeedleRef: (el: HTMLImageElement | null) => void;
}) {
  return (
    <div
      ref={setRef}
      className="spec-card"
      style={{
        minHeight: '260px',
        borderRight: '1px solid rgba(201,168,76,0.12)',
        padding: '18px 18px 14px',
        display: 'grid',
        alignContent: 'space-between',
      }}
    >
      <div className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>
        {slotLabel}
      </div>

      <div style={{ display: 'grid', justifyItems: 'center', gap: '10px' }}>
        <div
          className="dial-wrap"
          style={{
            width: '170px',
            height: '170px',
            borderRadius: '50%',
            border: '1px solid rgba(245,240,232,0.07)',
            backgroundImage: `url(${faceImage}), conic-gradient(from 210deg, ${accent} 0deg, rgba(201,168,76,0.95) 128deg, rgba(255,255,255,0.04) 130deg, rgba(255,255,255,0.02) 360deg)`,
            backgroundSize: 'cover, cover',
            backgroundPosition: 'center, center',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.75)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div className="dial-top-label">{spec.label}</div>
          <img
            ref={setNeedleRef}
            src={needleImage}
            alt=""
            aria-hidden
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '124%',
              maxWidth: 'none',
              transform: 'translate(-50%, -52%) rotate(-128deg)',
              transformOrigin: '50% 54%',
              filter: 'drop-shadow(0 2px 5px rgba(0, 0, 0, 0.65))',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              transform: 'translate(-50%,-50%)',
              background: 'radial-gradient(circle, rgba(255,255,255,0.7), rgba(98,98,98,0.85))',
              boxShadow: '0 0 0 4px rgba(201,168,76,0.2)',
            }}
          />
        </div>
        <div className="dial-center dial-value" style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span className="font-display" style={{ fontSize: '56px', color: 'var(--cream)', lineHeight: 0.9 }}>
            {spec.value}
          </span>
          {spec.unit ? (
            <span className="unit font-mono" style={{ fontSize: '12px', letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              {spec.unit}
            </span>
          ) : null}
        </div>
      </div>

      <div className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.24em', color: 'rgba(245,240,232,0.28)', textTransform: 'uppercase', textAlign: 'center' }}>
        Utopia · #099 · GTV
      </div>
    </div>
  );
}

function TelemetryTypeCard({
  spec,
  setRef,
}: {
  spec: TelemetrySpec;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const [firstWord, secondWord] = spec.value.split(' ');

  return (
    <div
      ref={setRef}
      className="spec-card"
      style={{
        minHeight: '250px',
        borderRight: '1px solid rgba(201,168,76,0.12)',
        padding: '20px 18px 14px',
        display: 'grid',
        alignContent: 'space-between',
      }}
    >
      <div className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.35)', textTransform: 'uppercase' }}>
        Gauge · 0{spec.label === 'Manual' ? '7' : spec.label === 'Monocoque' ? '8' : '9'}
      </div>

      <div style={{ textAlign: 'center' }}>
        <p className="font-display" style={{ fontSize: 'clamp(56px,7vw,76px)', color: 'var(--cream)', margin: 0, lineHeight: 0.9 }}>
          {firstWord}
          {secondWord ? (
            <span style={{ color: 'var(--gold)', fontStyle: 'italic' }}>
              {' '}
              {secondWord}
            </span>
          ) : null}
        </p>
        {spec.unit ? (
          <p className="font-display" style={{ margin: '4px 0 0', fontSize: '36px', color: 'var(--gold)', lineHeight: 1 }}>
            {spec.unit}
          </p>
        ) : null}
        <p className="font-mono" style={{ margin: '8px 0 0', fontSize: '9px', letterSpacing: '0.22em', color: 'rgba(245,240,232,0.62)', textTransform: 'uppercase' }}>
          {spec.label}
        </p>
      </div>

      <div className="font-mono" style={{ fontSize: '8px', letterSpacing: '0.24em', color: 'rgba(245,240,232,0.28)', textTransform: 'uppercase', textAlign: 'center' }}>
        Utopia · #099 · GTV
      </div>
    </div>
  );
}
