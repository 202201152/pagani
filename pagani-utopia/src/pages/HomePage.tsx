import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
import { Outro } from '../components/sections/interior/Outro';
import PerformanceCluster from '../sections/PerformanceCluster';

export function HomePage() {
  return (
    <>
      <section id="design" className="pb-[250px] px-[clamp(24px,6vw,500px)]">
        <DesignHero />
        <div className="mt-[clamp(140px,12vw,260px)]">
          <UtopiaTextSection />
        </div>
        <GallerySection />
      </section>

      {/* Performance Section */}
      <section id="performance" className="pb-[250px] px-[clamp(24px,6vw,500px)]">
        <PerformanceCluster />
      </section>

      {/* Footer / Outro */}
      <section id="outro" className="pb-[250px] px-[clamp(24px,6vw,500px)]">
        <Outro />
      </section>
    </>
  );
}
