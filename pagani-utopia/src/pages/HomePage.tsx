import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { HorizontalCraft } from '../components/sections/design/HorizontalCraft';
import { Philosophy } from '../components/sections/design/Philosophy';
import { SpecGrid } from '../components/sections/performance/SpecGrid';
import { EngineSection } from '../components/sections/performance/EngineSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
import { AccelSection } from '../components/sections/performance/AccelSection';
import { Hero } from '../components/sections/interior/Hero';
import { Cockpit } from '../components/sections/interior/Cockpit';
import { Gearshift } from '../components/sections/interior/Gearshift';
import { Outro } from '../components/sections/interior/Outro';

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <DesignHero />
      <UtopiaTextSection />
      <GallerySection />

      {/* Design Section - Horizontal Scroll */}
      <section id="design">
        <HorizontalCraft />
      </section>
      <Philosophy />

      {/* Performance Section */}
      <section id="performance">
        <SpecGrid />
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
