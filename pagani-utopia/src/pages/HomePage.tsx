import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
import { Hero } from '../components/sections/interior/Hero';
import { Cockpit } from '../components/sections/interior/Cockpit';
import { Gearshift } from '../components/sections/interior/Gearshift';
import { Outro } from '../components/sections/interior/Outro';
import PerformanceCluster from '../sections/PerformanceCluster';

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
        <PerformanceCluster />
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
