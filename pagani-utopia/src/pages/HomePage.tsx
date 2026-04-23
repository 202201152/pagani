import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { SpecGrid } from '../components/sections/performance/SpecGrid';
import { EngineSection } from '../components/sections/performance/EngineSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
import { AccelSection } from '../components/sections/performance/AccelSection';
import { WhatYouGetSection } from '../components/sections/performance/WhatYouGetSection';
import { Hero } from '../components/sections/interior/Hero';
import { Cockpit } from '../components/sections/interior/Cockpit';
import { Gearshift } from '../components/sections/interior/Gearshift';
import { Outro } from '../components/sections/interior/Outro';

export function HomePage() {
  return (
    <>
      <section id="design">
        <DesignHero />
        <UtopiaTextSection />
        <GallerySection />
      </section>

      {/* Performance Section */}
      <section id="performance">
        <SpecGrid />
        <WhatYouGetSection />
        <EngineSection />
        <AccelSection />
      </section>

      {/* Interior Section */}
      <section id="interior">
        <Hero />
        <Cockpit />
        <Gearshift />
        <Outro />
      </section>
    </>
  );
}
