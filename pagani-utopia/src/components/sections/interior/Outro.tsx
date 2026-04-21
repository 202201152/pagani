import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useAppStore } from '../../../store/useAppStore';

gsap.registerPlugin(ScrollTrigger);

export function Outro() {
  const containerRef = useRef<HTMLElement>(null);
  const { setCurrentCameraPosition } = useAppStore();

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
    <section 
      ref={containerRef}
      className="relative w-full h-screen flex flex-col items-center justify-center z-10"
    >
      {/* Almost dark background to let the low-light 3D car peek through */}
      <div className="absolute inset-0 bg-[#0A0A0A]/90 -z-10" />

      <div className="text-center pointer-events-auto">
        <h1 className="font-display italic text-[120px] font-light text-cream leading-none m-0">
          Only 99.
        </h1>
        <p className="font-body text-[20px] text-[rgba(245,240,232,0.45)] mt-6">
          Each one different. Each one final.
        </p>
        
        <div className="mt-16 flex flex-col items-center">
          <p className="font-mono text-gold text-[11px] tracking-[0.2em] uppercase">
            — Pagani Automobili, Modena
          </p>
          <div className="w-[80px] h-[1px] bg-gold my-12" />
          
          <div className="flex gap-6 justify-center">
            <button className="btn-gold cursor-pointer pointer-events-auto">
              CONFIGURE YOURS
            </button>
            <button className="btn-ghost cursor-pointer pointer-events-auto">
              CONTACT PAGANI
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
