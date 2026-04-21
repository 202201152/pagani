import { Hero } from '../components/sections/home/Hero';
import { IntroStatement } from '../components/sections/home/IntroStatement';
import { RotateSection } from '../components/sections/home/RotateSection';
import { SpecsTeaser } from '../components/sections/home/SpecsTeaser';
import { HomeCTA } from '../components/sections/home/HomeCTA';

export function Home() {
  return (
    <>
      <Hero />
      <IntroStatement />
      <RotateSection />
      <SpecsTeaser />
      <HomeCTA />
    </>
  );
}
