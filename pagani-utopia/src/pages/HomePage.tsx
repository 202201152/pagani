import { DesignHero } from '../components/sections/design/DesignHero';
import { UtopiaTextSection } from '../components/sections/design/UtopiaTextSection';
import { GallerySection } from '../components/sections/performance/GallerySection';
import { Outro } from '../components/sections/interior/Outro';
import { PartnersSection } from '../components/sections/partners/PartnersSection';
import PerformanceCluster from '../sections/PerformanceCluster';

export function HomePage() {
  return (
    <>
      <section id="design" className="px-[clamp(24px,6vw,500px)]">
        {/* Hero */}
        <DesignHero />

        {/* Spacer after Hero */}
        <div style={{ height: '220px' }} />

        {/* Text */}
        <UtopiaTextSection />

        {/* Spacer after Text */}
        <div style={{ height: '220px' }} />

        {/* Carousel */}
        <GallerySection />

        {/* Spacer after Carousel */}
        <div style={{ height: '220px' }} />
      </section>

      {/* Performance Section */}
      <section id="performance" className="px-[clamp(24px,6vw,500px)]">
        <PerformanceCluster />

        {/* Spacer after Performance */}
        <div style={{ height: '220px' }} />
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Spacer after Partners */}
      <div style={{ height: '120px' }} />

      {/* Footer / Outro */}
      <section id="outro" className="pb-[250px] px-[clamp(24px,6vw,500px)]">
        <Outro />
      </section>
    </>
  );
}
