import { lazy, Suspense } from 'react';
import { DesignHero } from '../components/sections/design/DesignHero';
import { LazySection } from '../components/ui/LazySection';

// Lazy-loaded section components (code-split into separate chunks)
const UtopiaTextSection = lazy(() =>
  import('../components/sections/design/UtopiaTextSection').then((m) => ({ default: m.UtopiaTextSection }))
);
const GallerySection = lazy(() =>
  import('../components/sections/performance/GallerySection').then((m) => ({ default: m.GallerySection }))
);
const PerformanceCluster = lazy(() => import('../sections/PerformanceCluster'));
const SpecSheet = lazy(() =>
  import('../components/sections/specs/SpecSheet').then((m) => ({ default: m.SpecSheet }))
);
const PartnersSection = lazy(() =>
  import('../components/sections/partners/PartnersSection').then((m) => ({ default: m.PartnersSection }))
);
const Outro = lazy(() =>
  import('../components/sections/interior/Outro').then((m) => ({ default: m.Outro }))
);

export function HomePage() {
  return (
    <>
      <section id="design" className="px-[clamp(24px,6vw,500px)]">
        {/* Hero — always eager (above the fold) */}
        <DesignHero />

        {/* Spacer after Hero */}
        <div style={{ height: '220px' }} />

        {/* Text */}
        <LazySection minHeight="600px">
          <Suspense fallback={null}>
            <UtopiaTextSection />
          </Suspense>
        </LazySection>

        {/* Spacer after Text */}
        <div style={{ height: '220px' }} />

        {/* Carousel */}
        <LazySection minHeight="500px">
          <Suspense fallback={null}>
            <GallerySection />
          </Suspense>
        </LazySection>

        {/* Spacer after Carousel */}
        <div style={{ height: '220px' }} />
      </section>

      {/* Performance Section */}
      <section id="performance" className="px-[clamp(24px,6vw,500px)]">
        <LazySection minHeight="800px">
          <Suspense fallback={null}>
            <PerformanceCluster />
          </Suspense>
        </LazySection>

        {/* Spacer after Performance */}
        <div style={{ height: '220px' }} />
      </section>

      {/* Spec Sheet Section */}
      <section className="px-[clamp(24px,6vw,500px)]">
        <LazySection minHeight="600px">
          <Suspense fallback={null}>
            <SpecSheet />
          </Suspense>
        </LazySection>
      </section>

      {/* Spacer after Specs */}
      <div style={{ height: '120px' }} />

      {/* Partners Section */}
      <section className="px-[clamp(24px,6vw,500px)]">
        <LazySection minHeight="200px">
          <Suspense fallback={null}>
            <PartnersSection />
          </Suspense>
        </LazySection>
      </section>

      {/* Spacer after Partners */}
      <div style={{ height: '120px' }} />

      {/* Footer / Outro */}
      <section id="outro" className="pb-[250px] px-[clamp(24px,6vw,500px)]">
        <LazySection minHeight="400px">
          <Suspense fallback={null}>
            <Outro />
          </Suspense>
        </LazySection>
      </section>
    </>
  );
}
