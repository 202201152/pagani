import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './PerformanceCluster.css';

gsap.registerPlugin(ScrollTrigger);

const SPECS_GRID = [
  { value: '852', unit: 'HP', label: 'Engine Power' },
  { value: '6.0', unit: 'L', label: 'Displacement' },
  { value: '1,280', unit: 'KG', label: 'Dry Weight' },
  { value: '2.5', unit: 's', label: '0-100 km/h' },
  { value: '355', unit: 'km/h', label: 'Top Speed' },
  { value: '99', unit: '', label: 'Units Built' },
  { value: '7', unit: 'Speed', label: 'Manual' },
  { value: 'Carbon', unit: 'Ti', label: 'Monocoque' },
  { value: 'Pushrod', unit: '', label: 'Suspension' },
];

const mapRange = (value, inMin, inMax, outMin, outMax) => {
  const pct = (value - inMin) / (inMax - inMin);
  return outMin + Math.max(0, Math.min(1, pct)) * (outMax - outMin);
};

export default function PerformanceCluster() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const needleRefs = useRef([]);
  const idleTweensRef = useRef([]);
  const startupTlRef = useRef(null);

  const [isIgnited, setIsIgnited] = useState(false);
  const [throttle, setThrottle] = useState(24);

  const topRow = useMemo(() => SPECS_GRID.slice(0, 3), []);
  const middleRow = useMemo(() => SPECS_GRID.slice(3, 6), []);
  const bottomRow = useMemo(() => SPECS_GRID.slice(6, 9), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.filter(Boolean).forEach((card, index) => {
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
    }, sectionRef);

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
      mapRange(throttle, 0, 100, -125, 108),
      mapRange(throttle, 0, 100, -120, 72),
      mapRange(throttle, 0, 100, -122, 56),
      mapRange(throttle, 0, 100, -130, 124),
      mapRange(throttle, 0, 100, -128, 135),
      mapRange(throttle, 0, 100, -126, 115),
    ];

    targets.forEach((target, idx) => {
      const needle = needleRefs.current[idx];
      if (!needle) return;
      gsap.to(needle, { rotation: target, duration: 0.28, ease: 'power2.out', overwrite: true });
    });
  }, [throttle, isIgnited]);

  const rpm = Math.round(mapRange(throttle, 0, 100, 1100, 7300));
  const hp = Math.round(mapRange(throttle, 0, 100, 120, 852));
  const gear = throttle < 25 ? 'II' : throttle < 50 ? 'III' : throttle < 75 ? 'IV' : 'V';
  const zone = throttle > 72 ? 'RACE' : 'OPT';

  return (
    <div className="pagani-perf">
      <section ref={sectionRef} className="pp-root">
        <div className="container">
          <div className="pp-top-strip">
            <div className="pp-hud-row">
              <span>Pagani · Automobili Modena · Utopia</span>
              <span className="pp-gold">System · Live</span>
              <span>Chassis N°099 / 099</span>
              <span>RPM {rpm}</span>
            </div>
          </div>

          <div className="pp-hero">
            <h2 className="pp-title">
              Perf<span>or</span>mance
            </h2>
            <button type="button" className="pp-ignition" onClick={() => setIsIgnited((prev) => !prev)}>
              {isIgnited ? 'Running' : 'Ignition'}
            </button>
          </div>

          <div className="pp-grid-shell">
            <div className="telemetry-grid-row pp-divider">
              {topRow.map((spec, index) => (
                <GaugeCard
                  key={spec.label}
                  spec={spec}
                  faceImage={
                    index === 0
                      ? '/assets/images/meter-engine.png'
                      : index === 1
                        ? '/assets/images/meter-displacement.png'
                        : '/assets/images/meter-weight.png'
                  }
                  setRef={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  setNeedleRef={(el) => {
                    needleRefs.current[index] = el;
                  }}
                />
              ))}
            </div>
            <div className="telemetry-grid-row pp-divider">
              {middleRow.map((spec, index) => (
                <GaugeCard
                  key={spec.label}
                  spec={spec}
                  faceImage={
                    index === 0
                      ? '/assets/images/meter-speedometer.png'
                      : index === 1
                        ? '/assets/images/meter-engine.png'
                        : '/assets/images/meter-displacement.png'
                  }
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
                <TypeCard
                  key={spec.label}
                  spec={spec}
                  setRef={(el) => {
                    cardsRef.current[index + 6] = el;
                  }}
                />
              ))}
            </div>
          </div>

          <div className="telemetry-control-row pp-controls">
            <div className="pp-labels">Accelerator · Drive by wire</div>
            <div className="pp-slider-wrap">
              <input
                type="range"
                min={0}
                max={100}
                value={throttle}
                onChange={(event) => setThrottle(Number(event.target.value))}
                disabled={!isIgnited}
                aria-label="Accelerator"
              />
            </div>
            <div className="pp-readouts">
              <span>RPM {rpm}</span>
              <span>HP {hp}</span>
              <span>Gear {gear}</span>
              <span>Zone {zone}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function GaugeCard({ spec, faceImage, setRef, setNeedleRef }) {
  return (
    <div ref={setRef} className="spec-card pp-cell">
      <div
        className="dial-wrap"
        style={{
          backgroundImage: `url(${faceImage})`,
        }}
      >
        <div className="dial-top-label">{spec.label}</div>
        <img
          ref={setNeedleRef}
          src="/assets/images/meters-needle.png"
          alt=""
          aria-hidden
          className="pp-needle"
        />
      </div>
      <div className="dial-center dial-value">
        <span className="pp-value">{spec.value}</span>
        {spec.unit ? <span className="unit">{spec.unit}</span> : null}
      </div>
    </div>
  );
}

function TypeCard({ spec, setRef }) {
  const [firstWord, secondWord] = spec.value.split(' ');
  return (
    <div ref={setRef} className="spec-card pp-cell pp-type-cell">
      <p className="pp-type-value">
        {firstWord}
        {secondWord ? <span> {secondWord}</span> : null}
      </p>
      {spec.unit ? <p className="pp-type-unit">{spec.unit}</p> : null}
      <p className="pp-type-label">{spec.label}</p>
    </div>
  );
}
