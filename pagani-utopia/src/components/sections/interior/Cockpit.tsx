import { IMAGES } from '../../../lib/constants';

export function Cockpit() {
  return (
    <section className="relative w-full h-screen overflow-hidden flex flex-row">
      {/* Dark left 35% */}
      <div className="w-[35%] h-full bg-[#111111] flex flex-col justify-center px-[6%] z-10 shrink-0">
        <div className="text-left w-full max-w-[400px]">
          <p className="font-mono text-gold text-[11px] uppercase tracking-[0.2em] mb-6">
            THE COCKPIT
          </p>
          <h2 className="font-display italic text-[48px] text-cream leading-[1.1] mb-8">
            Hand-stitched bull leather.
          </h2>
          <p className="font-body text-[14px] text-[rgba(245,240,232,0.45)] leading-relaxed">
            Deep crimson Schedoni leather. Every stitch placed by hand in Modena.
          </p>
        </div>
      </div>
      
      {/* Image right 65% */}
      <div className="w-[65%] h-full relative shrink-0">
        <img
          src={IMAGES.sty_int}
          alt="Interior Cockpit"
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  );
}
