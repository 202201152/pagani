import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

const GEAR_RANGES = [
  { gear: 1, min: 0, max: 40 },
  { gear: 2, min: 40, max: 80 },
  { gear: 3, min: 80, max: 120 },
  { gear: 4, min: 120, max: 180 },
  { gear: 5, min: 180, max: 240 },
  { gear: 6, min: 240, max: 300 },
  { gear: 7, min: 300, max: 380 },
];

function gearForSpeed(speed) {
  for (const g of GEAR_RANGES) {
    if (speed >= g.min && speed < g.max) return g.gear;
  }
  return 7;
}

function rangeForGear(gear) {
  return GEAR_RANGES.find((g) => g.gear === gear) ?? GEAR_RANGES[GEAR_RANGES.length - 1];
}

/**
 * Central simulation state (kept off the React render loop).
 * UI binds DOM nodes and we update them at 60fps via rAF.
 */
export function useEngineSimulation() {
  const [isRunning, setIsRunning] = useState(false);

  const configRef = useRef({
    vmax: 355,
    // Calibrated to ~0-100 in 3.0s and ~350 in ~11.8s.
    accelKMax: 1.09, // 1/s
    accelTau: 13.7, // seconds (controls early ramp)
  });

  const nodesRef = useRef({
    speedEl: null,
    rpmEl: null,
    gearEl: null,
  });

  const simRef = useRef({
    speed: 0,
    rpm: 0,
    gear: 0,
    isRunning: false,
    runTime: 0,
  });

  const loopRef = useRef({
    rafId: 0,
    lastT: 0,
    startTimeoutId: 0,
    shiftingUntilT: 0,
    lastGear: 0,
  });

  const setSpeedEl = useCallback((el) => {
    nodesRef.current.speedEl = el;
  }, []);
  const setRpmEl = useCallback((el) => {
    nodesRef.current.rpmEl = el;
  }, []);
  const setGearEl = useCallback((el) => {
    nodesRef.current.gearEl = el;
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
    simRef.current.isRunning = false;
    simRef.current.runTime = 0;
    loopRef.current.lastT = 0;
    if (loopRef.current.rafId) cancelAnimationFrame(loopRef.current.rafId);
    loopRef.current.rafId = 0;
    if (loopRef.current.startTimeoutId) window.clearTimeout(loopRef.current.startTimeoutId);
    loopRef.current.startTimeoutId = 0;
  }, []);

  const start = useCallback(() => {
    // ignition sequence
    setIsRunning(true);
    simRef.current.isRunning = true;

    simRef.current.speed = 0;
    simRef.current.rpm = 1200;
    simRef.current.gear = 1;
    simRef.current.runTime = 0;

    const { speedEl, rpmEl, gearEl } = nodesRef.current;
    if (speedEl) speedEl.textContent = '0';
    if (rpmEl) rpmEl.textContent = '1200';
    if (gearEl) gearEl.textContent = '1';

    if (loopRef.current.startTimeoutId) window.clearTimeout(loopRef.current.startTimeoutId);
    loopRef.current.startTimeoutId = window.setTimeout(() => {
      loopRef.current.lastT = 0;
      loopRef.current.lastGear = 1;
      loopRef.current.shiftingUntilT = 0;
      loopRef.current.rafId = requestAnimationFrame(tick);
    }, 500);
  }, []);

  const toggle = useCallback(() => {
    if (simRef.current.isRunning) stop();
    else start();
  }, [start, stop]);

  const tick = useCallback((t) => {
    if (!simRef.current.isRunning) return;

    const prevT = loopRef.current.lastT || t;
    loopRef.current.lastT = t;
    const dt = clamp((t - prevT) / 1000, 0, 0.05); // seconds

    // --- drivetrain model (physics-inspired, non-linear) ---
    const { vmax, accelKMax, accelTau } = configRef.current;
    simRef.current.runTime += dt;

    // Accel curve: exponential approach with a slow power ramp.
    // This matches the desired timeline:
    // - 0-100 km/h ≈ 3.0s
    // - ~top speed in ≈ 11.5–12s
    const ramp = 1 - Math.exp(-simRef.current.runTime / accelTau);
    const k = accelKMax * ramp; // 1/s

    const speed = simRef.current.speed;
    simRef.current.speed = clamp(speed + (vmax - speed) * k * dt, 0, vmax + 2);

    // detect shift and simulate clutch drop
    const newGear = gearForSpeed(simRef.current.speed);
    const now = t / 1000;
    if (newGear !== loopRef.current.lastGear) {
      loopRef.current.lastGear = newGear;
      simRef.current.gear = newGear;
      loopRef.current.shiftingUntilT = now + 0.18; // ~180ms "shift event"
      simRef.current.rpm = Math.max(1400, simRef.current.rpm * 0.72);
    }

    // RPM model: tracks within gear range + shift dips
    const gRange = rangeForGear(newGear);
    const gearPct = clamp((simRef.current.speed - gRange.min) / (gRange.max - gRange.min), 0, 1);
    const idle = 1200;
    const redline = 8500;
    const baseRpmTarget = idle + gearPct * (redline - idle);

    const inShift = now < loopRef.current.shiftingUntilT;
    const rpmTarget = inShift ? Math.max(idle, baseRpmTarget * 0.78) : baseRpmTarget;
    const rpmResponse = inShift ? 0.18 : 0.28; // slower during shift
    simRef.current.rpm += (rpmTarget - simRef.current.rpm) * rpmResponse * dt * 60;
    simRef.current.rpm = clamp(simRef.current.rpm, 900, redline + 200);

    // --- DOM output (no React re-render) ---
    const { speedEl, rpmEl, gearEl } = nodesRef.current;
    if (speedEl) speedEl.textContent = String(Math.round(simRef.current.speed));
    if (rpmEl) rpmEl.textContent = String(Math.round(simRef.current.rpm));
    if (gearEl) gearEl.textContent = String(simRef.current.gear);

    loopRef.current.rafId = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return useMemo(
    () => ({
      isRunning,
      start,
      stop,
      toggle,
      bind: {
        setSpeedEl,
        setRpmEl,
        setGearEl,
      },
      stateRef: simRef,
    }),
    [isRunning, setGearEl, setRpmEl, setSpeedEl, start, stop, toggle]
  );
}

