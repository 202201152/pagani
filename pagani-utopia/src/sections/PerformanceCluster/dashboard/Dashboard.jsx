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

