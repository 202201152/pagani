import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TiltedCard from '../../ui/TiltedCard';

gsap.registerPlugin(ScrollTrigger);

type Hotspot = { xPct: number; yPct: number };

type Feature = {
  key: string;
  kicker: string;
  title: string;
  description: string;
  hotspot: Hotspot;
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

export function WhatYouGetSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const hotspotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRef = useRef<HTMLElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const features = useMemo<Feature[]>(
    () => [
      {
        key: 'lights',
        kicker: '01 SIGNATURE',
        title: 'Quad-beam presence',
        description: 'A focused front signature with sculpted housings and crisp detailing.',
        hotspot: { xPct: 27.5, yPct: 54.0 },
      },
      {
        key: 'aero',
        kicker: '02 AERODYNAMICS',
        title: 'Front aero sculpt',
        description: 'Clean airflow management around the nose and splitter for stability at speed.',
        hotspot: { xPct: 44.5, yPct: 71.5 },
      },
      {
        key: 'body',
        kicker: '03 LIGHTWEIGHT',
        title: 'Carbon-crafted form',
        description: 'Low mass, high stiffness — engineered for response without compromising beauty.',
        hotspot: { xPct: 52.0, yPct: 51.5 },
      },
      {
        key: 'wheel',
        kicker: '04 CONTROL',
        title: 'Mechanical grip',
        description: 'A composed stance with precise contact — confidence you can feel.',
        hotspot: { xPct: 76.0, yPct: 75.5 },
      },
    ],
    []
  );

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current!;

      const endPx = Math.max(1200, features.length * 900);

      stRef.current = ScrollTrigger.create({
        id: 'what-you-get',
        trigger: sectionEl,
        start: 'top top',
        end: `+=${endPx}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = clamp(Math.round(self.progress * (features.length - 1)), 0, features.length - 1);
          setActiveIndex((prev) => (prev === index ? prev : index));
        },
      });

      // Gentle premium motion on the media (so it doesn't feel "static" while pinned)
      if (mediaRef.current) {
        gsap.fromTo(
          mediaRef.current,
          { scale: 1.04, filter: 'saturate(0.95) contrast(1.05)' },
          {
            scale: 1,
            filter: 'saturate(1) contrast(1.08)',
            ease: 'none',
            scrollTrigger: {
              trigger: sectionEl,
              start: 'top top',
              end: `+=${endPx}`,
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => {
      stRef.current?.kill();
      stRef.current = null;
      ctx.revert();
    };
  }, [features.length]);

  useEffect(() => {
    hotspotRefs.current.forEach((el, i) => {
      if (!el) return;
      const isActive = i === activeIndex;
      el.setAttribute('aria-current', isActive ? 'true' : 'false');
      gsap.to(el, {
        scale: isActive ? 1.1 : 1,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: true,
      });
    });

    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 6, opacity: 0.88 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: true }
      );
    }
  }, [activeIndex]);

  const jumpToIndex = (nextIndex: number) => {
    const st = stRef.current;
    if (!st) return;
    const idx = clamp(nextIndex, 0, features.length - 1);
    const progress = features.length === 1 ? 0 : idx / (features.length - 1);
    const y = st.start + (st.end - st.start) * progress;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const feature = features[activeIndex];

  return (
    <section ref={sectionRef} className="relative bg-void">
      <div className="relative mx-auto h-[100svh] w-full max-w-none px-[2vw] py-[6vh]">
        <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.06),transparent_55%)]" />

        <div className="relative h-full overflow-hidden rounded-[34px] border border-white/10 bg-black">
          <div ref={mediaRef} className="absolute inset-0">
            <img
              className="h-full w-full object-cover opacity-[0.92]"
              src="/assets/images/utopia-angle.png"
              alt="Pagani Utopia performance angle"
              loading="eager"
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_35%,rgba(0,0,0,0),rgba(0,0,0,0.55)_70%)]" />
          </div>

          {/* Header */}
          <div className="absolute left-7 top-7 z-20 md:left-10 md:top-10">
            <p className="font-mono text-[11px] tracking-[0.24em] text-white/70">YOUR ADVANTAGE</p>
            <h2 className="mt-2 font-display text-[clamp(26px,4vw,44px)] leading-[1.05] text-cream">
              What you get
            </h2>
          </div>

          {/* Hotspots */}
          <div className="absolute inset-0 z-10">
            {features.map((f, i) => (
              <button
                key={f.key}
                ref={(el) => {
                  hotspotRefs.current[i] = el;
                }}
                type="button"
                onClick={() => jumpToIndex(i)}
                className="group absolute h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ left: `${f.hotspot.xPct}%`, top: `${f.hotspot.yPct}%` }}
                aria-label={`Show feature: ${f.title}`}
              >
                <span className="absolute inset-0 rounded-full bg-lime-400/20 blur-[10px] opacity-80 transition-opacity group-hover:opacity-100" />
                <span className="absolute inset-0 rounded-full bg-lime-400/30" />
                <span className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-300 shadow-[0_0_0_2px_rgba(0,0,0,0.35)]" />
              </button>
            ))}
          </div>

          {/* Bottom-left caption */}
          <div className="absolute bottom-7 left-7 z-20 md:left-10">
            <p className="font-mono text-[11px] tracking-[0.22em] text-white/70 uppercase">Real components</p>
            <p className="font-mono text-[11px] tracking-[0.04em] text-white/55">
              Designed for real-world performance
            </p>
          </div>

          {/* Feature card */}
          <aside
            ref={cardRef}
            className="absolute bottom-7 right-7 z-30 md:bottom-10 md:right-10"
          >
            <div className="relative">
              <TiltedCard
                imageSrc={undefined}
                captionText={feature.kicker}
                containerHeight="320px"
                containerWidth="220px"
                imageHeight="320px"
                imageWidth="220px"
                rotateAmplitude={12}
                scaleOnHover={1.06}
                showMobileWarning={false}
                showTooltip={true}
                displayOverlayContent={true}
                overlayContent={
                  <div className="tilted-card-overlayContent">
                    <p className="tilted-card-overlayKicker">{feature.kicker}</p>
                    <p className="tilted-card-overlayTitle">{feature.title}</p>
                    <p className="tilted-card-overlayDesc">{feature.description}</p>

                    <div className="tilted-card-actions">
                      <button
                        type="button"
                        onClick={() => jumpToIndex(activeIndex - 1)}
                        disabled={activeIndex === 0}
                        className="utopia-actionBtn utopia-actionBtn--prev"
                        aria-label="Previous feature"
                      >
                        <span>Prev</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height={34} width={34}>
                          <circle strokeWidth={3} stroke="rgba(255,255,255,0.9)" r="35.5" cy={37} cx={37} />
                          <path
                            fill="rgba(255,255,255,0.9)"
                            d="M49 35.5C49.8284 35.5 50.5 36.1716 50.5 37C50.5 37.8284 49.8284 38.5 49 38.5V35.5ZM24.9393 38.0607C24.3536 37.4749 24.3536 36.5251 24.9393 35.9393L34.4853 26.3934C35.0711 25.8076 36.0208 25.8076 36.6066 26.3934C37.1924 26.9792 37.1924 27.9289 36.6066 28.5147L28.1213 37L36.6066 45.4853C37.1924 46.0711 37.1924 47.0208 36.6066 47.6066C36.0208 48.1924 35.0711 48.1924 34.4853 47.6066L24.9393 38.0607ZM49 38.5L26 38.5V35.5L49 35.5V38.5Z"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() => jumpToIndex(activeIndex + 1)}
                        disabled={activeIndex === features.length - 1}
                        className="utopia-actionBtn utopia-actionBtn--next flex-1"
                        aria-label="Next feature"
                      >
                        <span>Next</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 74 74" height={34} width={34}>
                          <circle strokeWidth={3} stroke="rgba(0,0,0,0.85)" r="35.5" cy={37} cx={37} />
                          <path
                            fill="rgba(0,0,0,0.85)"
                            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                }
              />
            </div>
          </aside>

          {/* Progress */}
          <div className="absolute bottom-7 left-1/2 z-20 hidden -translate-x-1/2 md:block">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-5 py-3 backdrop-blur">
              {features.map((f, i) => (
                <span
                  key={`progress-${f.key}`}
                  className="relative h-2.5 w-10 overflow-hidden rounded-full bg-white/15"
                  aria-hidden
                >
                  <span
                    className="absolute inset-y-0 left-0 block rounded-full bg-white/70 transition-[width] duration-300"
                    style={{ width: i <= activeIndex ? '100%' : '0%' }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

