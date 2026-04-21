import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useAppStore } from '../../../store/useAppStore';
import { ROTATION_SECTION } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function RotateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const instructionRef = useRef<HTMLDivElement>(null);
  const progressArcRef = useRef<SVGSVGElement>(null);
  const progressCircleRef = useRef<SVGCircleElement>(null);
  const { setIsInRotationSection, setRotationProgress, isInRotationSection } = useAppStore();
  const [scrollStarted, setScrollStarted] = useState(false);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;

      // Create scroll-triggered rotation
      const scrollTrigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          setScrollStarted(true);
          setRotationProgress(self.progress);
          setIsInRotationSection(true);

          // Fade out instruction when scroll starts
          if (self.progress > 0.02) {
            gsap.to(instructionRef.current, {
              opacity: 0,
              duration: 0.5,
            });
          }

          // Update progress arc
          if (progressCircleRef.current) {
            const circumference = 2 * Math.PI * 24;
            const offset = circumference - self.progress * circumference;
            gsap.set(progressCircleRef.current, {
              strokeDashoffset: offset,
            });
          }

          // Reset idle timer
          if (idleTimerRef.current) {
            clearTimeout(idleTimerRef.current);
          }
          idleTimerRef.current = setTimeout(() => {
            // Resume scroll control after 3s idle
            setScrollStarted(false);
          }, 3000);
        },
        onLeaveBack: () => {
          setIsInRotationSection(false);
          setRotationProgress(0);
        },
        onLeave: () => {
          setIsInRotationSection(false);
        },
      });

      // Show progress arc when instruction fades
      gsap.to(progressArcRef.current, {
        opacity: 1,
        duration: 0.5,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100',
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [setIsInRotationSection, setRotationProgress]);

  return (
    <section
      ref={sectionRef}
      style={{
        height: ROTATION_SECTION.height,
        position: 'relative',
        background: 'var(--surface)',
      }}
    >
      {/* Fixed Overlay Content */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8vw',
          pointerEvents: 'none',
        }}
      >
        {/* Left Side - Instructions / Progress */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Instruction Text */}
          <div
            ref={instructionRef}
            className="font-mono"
            style={{
              fontSize: '10px',
              letterSpacing: '0.25em',
              color: 'var(--muted)',
              textTransform: 'uppercase',
            }}
          >
            Drag to explore / or scroll
          </div>

          {/* Progress Arc */}
          <svg
            ref={progressArcRef}
            width="60"
            height="60"
            style={{ opacity: 0 }}
          >
            {/* Background circle */}
            <circle
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="var(--border)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <circle
              ref={progressCircleRef}
              cx="30"
              cy="30"
              r="24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24}
              transform="rotate(-90 30 30)"
            />
          </svg>
        </div>

        {/* Right Side - Annotations */}
        <div
          className="font-mono"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            alignItems: 'flex-end',
          }}
        >
          {/* 0° - Front */}
          <Annotation
            label="FRONT"
            sublabel="Dual headlights"
            progress={0}
            currentProgress={isInRotationSection ? undefined : 0}
          />

          {/* 180° - Rear */}
          <Annotation
            label="REAR · QUAD EXHAUSTS"
            sublabel="Blue titanium pipes"
            progress={0.5}
            currentProgress={isInRotationSection ? undefined : undefined}
          />

          {/* 270° - Side */}
          <Annotation
            label="SIDE PROFILE"
            sublabel="Butterfly doors"
            progress={0.75}
            currentProgress={isInRotationSection ? undefined : undefined}
          />
        </div>
      </div>
    </section>
  );
}

function Annotation({
  label,
  sublabel,
  progress,
  currentProgress,
}: {
  label: string;
  sublabel: string;
  progress: number;
  currentProgress?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentProgress === undefined) return;

    const threshold = 0.08;
    const active = Math.abs(currentProgress - progress) < threshold;
    setIsActive(active);

    gsap.to(ref.current, {
      opacity: active ? 1 : 0.3,
      x: active ? 0 : 10,
      duration: 0.5,
    });
  }, [currentProgress, progress]);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '12px',
      }}
    >
      <span
        style={{
          fontSize: '9px',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}
      >
        {sublabel}
      </span>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--gold)',
          }}
        />
        <span
          className="font-mono"
          style={{
            fontSize: '10px',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
          }}
        >
          {label}
        </span>
        <div
          style={{
            width: '24px',
            height: '1px',
            background: 'var(--gold)',
          }}
        />
      </div>
    </div>
  );
}
