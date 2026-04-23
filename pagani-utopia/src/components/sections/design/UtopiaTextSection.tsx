import ScrollReveal from '../../ui/ScrollReveal';

const utopiaText = `'Utopia'...For the philosopher Thomas More in 1516, Utopia was a place that did not exist, and ever since the name has been given to the idealized places of which we dream. But for those who make their own future, for creators, utopia exists, it is 'merely' a case of finding it!`;

export function UtopiaTextSection() {
  return (
    <section className="bg-void py-[200vh] mt-[4000px] mb-[4000px]">
      <div className="mx-auto w-full max-w-[4200px] pl-[4000px] pr-[4vw] text-center">
        <p className="mb-10 font-mono text-[10px] tracking-[0.3em] text-gold uppercase">
          Manifesto
        </p>
        <ScrollReveal
          baseOpacity={0.08}
          enableBlur
          baseRotation={4}
          blurStrength={8}
          containerClassName="mx-auto w-full text-center"
          textClassName="font-display text-cream"
          rotationEnd="bottom bottom"
          wordAnimationEnd="bottom bottom"
        >
          {utopiaText}
        </ScrollReveal>
      </div>
    </section>
  );
}
