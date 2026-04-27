import Meter from './Meter';
import IgnitionButton from './IgnitionButton';
import GearDisplay from './GearDisplay';

export default function Dashboard() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#16130b] text-[#eae1d4]"
      style={{
        background:
          'radial-gradient(ellipse at center, rgba(35,31,23,1) 0%, rgba(22,19,11,1) 40%, rgba(17,14,7,1) 100%)',
      }}
    >
      {/* Top App Bar (from provided design) */}
      <header
        className="absolute left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b px-10 py-4 backdrop-blur-3xl"
        style={{
          background: 'rgba(3,3,3,0.78)',
          borderBottom: '1px solid transparent',
          borderImage: 'linear-gradient(to right, #3A3A3A, #1A1A1A) 1',
          boxShadow: 'inset 0px -2px 4px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center gap-4">
          <span className="select-none text-2xl leading-none text-[#D4AF37]">⏱</span>
          <h1 className="font-display text-xl uppercase tracking-[0.2em] text-[#D4AF37]">
            PAGANI INSTRUMENTS
          </h1>
        </div>
        <div className="flex items-center gap-6 text-neutral-500">
          <button
            type="button"
            className="scale-95 transition-colors duration-300 hover:text-[#D4AF37] active:translate-y-px"
            aria-label="Settings"
          >
            <span className="select-none">⚙</span>
          </button>
          <button
            type="button"
            className="scale-95 transition-colors duration-300 hover:text-[#D4AF37] active:translate-y-px"
            aria-label="AC"
          >
            <span className="select-none">❄</span>
          </button>
          <button
            type="button"
            className="scale-95 transition-colors duration-300 hover:text-[#D4AF37] active:translate-y-px"
            aria-label="Bluetooth"
          >
            <span className="select-none">⌁</span>
          </button>
        </div>
      </header>

      {/* Main canvas */}
      <main className="relative flex min-h-screen flex-col items-center justify-center px-10 pb-32 pt-24">
        {/* Top Row: meters */}
        <div className="flex w-full max-w-[1400px] items-end justify-center gap-10">
          <Meter kind="displacement" label="Displacement" value="5980" unit="CC" size="sm" />
          <Meter kind="speed" label="Speed" value="350" unit="KM/H" size="lg" elevate />
          <Meter kind="rpm" label="Engine" value="8500" unit="RPM" size="lg" elevate redline />
          <Meter kind="weight" label="Dry Weight" value="1280" unit="KG" size="sm" />
        </div>

        {/* Center: ignition button */}
        <div className="mt-20">
          <IgnitionButton />
        </div>

        {/* Lower readouts */}
        <div className="absolute bottom-40 w-full max-w-[1000px] px-10">
          <div className="flex w-full items-end justify-between">
            <GearDisplay label="Transmission" />
            <div className="flex flex-col items-end text-right">
              <span className="font-mono text-[12px] tracking-[0.14em] text-[#99907c] uppercase">
                Suspension
              </span>
              <div className="mt-1 flex items-center gap-3">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{
                    background: '#f2ca50',
                    boxShadow: '0 0 8px rgba(242,202,80,0.8)',
                  }}
                />
                <span className="font-display text-[24px] uppercase text-[#eae1d4]">
                  Track Mode
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom nav (from provided design) */}
      <nav
        className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t px-12 pb-6 pt-2"
        style={{
          background: 'linear-gradient(to bottom, #171717, #000)',
          borderTop: '1px solid #1A1A1A',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.9)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      >
        <button
          type="button"
          className="group w-24 translate-y-[-2px] border-t-2 border-[#D4AF37] pt-2 text-[#D4AF37] duration-200 hover:bg-neutral-900/50"
          aria-current="page"
        >
          <div className="mb-1 text-[28px] leading-none">⌂</div>
          <div className="font-display text-[10px] uppercase tracking-widest">Cockpit</div>
        </button>
        <button
          type="button"
          className="group w-24 translate-y-[-2px] pt-2 text-neutral-600 duration-200 hover:bg-neutral-900/50 hover:text-[#D4AF37]"
        >
          <div className="mb-1 text-[24px] leading-none transition-transform group-hover:scale-110">
            ⏱
          </div>
          <div className="font-display text-[10px] uppercase tracking-widest">Telemetry</div>
        </button>
        <button
          type="button"
          className="group w-24 translate-y-[-2px] pt-2 text-neutral-600 duration-200 hover:bg-neutral-900/50 hover:text-[#D4AF37]"
        >
          <div className="mb-1 text-[24px] leading-none transition-transform group-hover:scale-110">
            ⌖
          </div>
          <div className="font-display text-[10px] uppercase tracking-widest">Navigation</div>
        </button>
        <button
          type="button"
          className="group w-24 translate-y-[-2px] pt-2 text-neutral-600 duration-200 hover:bg-neutral-900/50 hover:text-[#D4AF37]"
        >
          <div className="mb-1 text-[24px] leading-none transition-transform group-hover:scale-110">
            ◉
          </div>
          <div className="font-display text-[10px] uppercase tracking-widest">Media</div>
        </button>
      </nav>
    </section>
  );
}

