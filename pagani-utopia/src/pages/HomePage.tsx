import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
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
    </>
  );
}
