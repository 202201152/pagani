export default function GearDisplay({ label = 'Transmission', gear = '1' }) {
  return (
    <div className="flex flex-col items-start">
      <span className="font-mono text-[12px] uppercase tracking-widest text-[#99907c]">
        {label}
      </span>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-display text-[32px] text-[#eae1d4]">GEAR</span>
        <span
          className="font-display text-[48px] tracking-[-0.02em]"
          style={{
            color: '#d4af37',
            filter: 'drop-shadow(0 0 12px rgba(212,175,55,0.4))',
          }}
        >
          {gear}
        </span>
      </div>
    </div>
  );
}

