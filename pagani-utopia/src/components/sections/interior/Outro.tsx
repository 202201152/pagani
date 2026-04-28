import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useAppStore } from '../../../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export function Outro() {
  const containerRef = useRef<HTMLElement>(null);
  const setCurrentCameraPosition = useAppStore((state) => state.setCurrentCameraPosition);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top center',
        onEnter: () => setCurrentCameraPosition('outro'),
        onLeaveBack: () => setCurrentCameraPosition('interior'),
      });
    });
    return () => ctx.revert();
  }, [setCurrentCameraPosition]);

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden z-10">
      <div className="absolute inset-0 bg-black -z-10" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-80"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.04), rgba(0,0,0,1) 62%)',
        }}
      />

      <div className="relative mx-auto flex h-full w-full max-w-none items-center px-[0.8vw]">
        <div className="w-full">
          <div className="mt-8 w-full">
            <p
              className="select-none whitespace-nowrap font-body font-[700] tracking-[-0.045em] text-cream leading-[0.76] w-full"
              style={{ fontSize: 'clamp(135px, 27vw, 760px)', transform: 'scaleX(1.04)', transformOrigin: 'left center' }}
            >
              PAGANI
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
