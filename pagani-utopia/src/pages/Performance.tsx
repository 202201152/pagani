import { SpecGrid } from '../components/sections/performance/SpecGrid';
import { EngineSection } from '../components/sections/performance/EngineSection';
import { AccelSection } from '../components/sections/performance/AccelSection';

export function Performance() {
  return (
    <>
      <SpecGrid />
      <EngineSection />
      <AccelSection />
    </>
  );
}
