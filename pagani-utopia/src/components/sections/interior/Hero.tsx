import { IMAGES } from '../../../lib/constants';

export function Hero() {
  return (
    <section className="relative w-full h-[100vh] overflow-hidden flex items-end">
      {/* Background Image */}
      <img
        src={IMAGES.ut1}
        alt="Pagani Utopia Interior"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 w-full px-[8vw] pb-[8vh] flex flex-col items-start text-left">
        <h1 className="font-display text-[96px] font-light text-cream tracking-[0.2em] leading-none m-0 uppercase">
          Interior
        </h1>
        <p className="font-display italic text-[24px] text-gold mt-4">
          The Cockpit
        </p>
      </div>
    </section>
  );
}
