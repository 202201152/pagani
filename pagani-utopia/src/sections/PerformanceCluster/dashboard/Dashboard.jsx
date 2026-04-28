import Meter from './Meter';
import IgnitionButton from './IgnitionButton';
import GearDisplay from './GearDisplay';
import { useEngineSimulation } from './useEngineSimulation';
import { useEngineAudio } from './useEngineAudio';

export default function Dashboard() {
  const audio = useEngineAudio({ src: '/audio/engine-voice.mp3' });
  const sim = useEngineSimulation({
    onFrame: (t) => {
      // keep audio locked to sim time
      audio.setTime(t);
    },
  });

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
        className="absolute left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b px-[clamp(24px,6vw,500px)] py-4 backdrop-blur-3xl"
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
      <main className="relative flex min-h-screen flex-col items-center justify-center px-[clamp(24px,6vw,500px)] pb-32 pt-24">
        {/* Top Row: meters */}
        <div className="flex w-full max-w-[1400px] items-end justify-center gap-10">
          <Meter kind="displacement" label="Displacement" value="5980" unit="CC" size="sm" />
          <Meter
            kind="speed"
            label="Speed"
            value="0"
            unit="KM/H"
            size="lg"
            elevate
            valueRef={sim.bind.setSpeedEl}
          />
          <Meter
            kind="rpm"
            label="Engine"
            value="0"
            unit="RPM"
            size="lg"
            elevate
            redline
            valueRef={sim.bind.setRpmEl}
          />
          <Meter kind="weight" label="Dry Weight" value="1280" unit="KG" size="sm" />
        </div>

        {/* Center: ignition button */}
        <div className="mt-20">
          <IgnitionButton
            isRunning={sim.isRunning}
            onToggle={() => {
              // play must start on user gesture
              if (!sim.isRunning) audio.playFromStart();
              else audio.stop();
              sim.toggle();
            }}
          />
        </div>

        {/* Lower readouts */}
        <div className="absolute bottom-40 w-full max-w-[1000px] px-10">
          <div className="flex w-full items-end justify-between">
            <GearDisplay label="Transmission" gear="1" gearRef={sim.bind.setGearEl} />
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
    </section>
  );
}

