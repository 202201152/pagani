const brushedMetal = {
  backgroundImage:
    'repeating-linear-gradient(135deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 2px, transparent 2px, transparent 4px)',
};

function cx(...parts) {
  return parts.filter(Boolean).join(' ');
}

export default function Meter({
  kind,
  label,
  value,
  unit,
  valueRef,
  size = 'sm',
  elevate = false,
  redline = false,
}) {
  const isLarge = size === 'lg';
  const outer = isLarge ? 'w-80 h-80 p-3 border-[#4A4A4A]' : 'w-56 h-56 p-2 border-[#3A3A3A]';
  const outerShadow = isLarge
    ? 'shadow-[0_20px_40px_rgba(0,0,0,0.9),inset_0_2px_5px_rgba(255,255,255,0.08)]'
    : 'shadow-[0_15px_30px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.05)]';

  return (
    <div
      data-meter={kind}
      className={cx(
        'relative flex-shrink-0 rounded-full border bg-[#231f17]',
        outer,
        outerShadow,
        elevate ? 'z-10 translate-y-4' : undefined
      )}
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
      <div
        className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-full border"
        style={{
          ...brushedMetal,
          backgroundColor: '#110e07',
          borderColor: isLarge ? 'rgba(61,57,47,0.6)' : 'rgba(61,57,47,0.4)',
          boxShadow: isLarge
            ? 'inset 0 15px 30px rgba(0,0,0,0.95)'
            : 'inset 0 10px 20px rgba(0,0,0,0.9)',
        }}
      >
        {isLarge ? (
          <div className="absolute inset-4 rounded-full border-2 border-[rgba(77,70,53,0.3)]" />
        ) : (
          <div className="absolute inset-3 rounded-full border border-dashed border-[rgba(77,70,53,0.2)]" />
        )}

        {kind === 'speed' ? (
          <div className="absolute inset-0 flex items-center justify-center opacity-90">
            <div className="h-[1px] w-full rotate-45 bg-[rgba(77,70,53,0.2)]" />
            <div className="h-[1px] w-full -rotate-45 bg-[rgba(77,70,53,0.2)]" />
            <div className="h-full w-[1px] bg-[rgba(77,70,53,0.2)]" />
            <div className="h-[1px] w-full bg-[rgba(77,70,53,0.2)]" />
          </div>
        ) : null}

        {redline ? (
          <div className="absolute right-0 top-0 h-1/2 w-1/2 rounded-tr-full bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-[rgba(255,180,171,0.12)] to-transparent" />
        ) : null}

        <div className="relative z-10 flex flex-col items-center rounded-full border border-white/10 bg-[rgba(17,14,7,0.72)] px-6 py-5 backdrop-blur-sm">
          <span className="mb-3 font-mono text-[12px] uppercase tracking-widest text-[#99907c]">
            {label}
          </span>
          <span
            ref={valueRef}
            className={cx(
              'font-display tracking-[-0.02em]',
              isLarge ? 'text-[48px]' : 'text-[32px]'
            )}
            style={{
              color: isLarge ? '#d4af37' : '#e9c349',
              filter: isLarge
                ? 'drop-shadow(0 0 12px rgba(212,175,55,0.4))'
                : 'drop-shadow(0 0 8px rgba(233,195,73,0.3))',
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <span className="mt-3 font-mono text-[11px] uppercase tracking-[0.25em] text-[rgba(208,197,175,0.9)]">
            {unit}
          </span>
        </div>
      </div>
    </div>
  );
}

