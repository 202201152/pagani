import { useMemo, useState } from 'react';

/**
 * Step 1 only: UI scaffold.
 * The real simulation + rAF loop will be implemented after UI confirmation.
 */
export function useEngineSimulation() {
  const [state, setState] = useState({
    speed: 0,
    rpm: 0,
    gear: 0,
    isRunning: false,
  });

  return useMemo(() => ({ state, setState }), [state]);
}

