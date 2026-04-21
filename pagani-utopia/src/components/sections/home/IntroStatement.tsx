import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function IntroStatement() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainTextRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mainText = mainTextRef.current;
      const subText = subTextRef.current;

      if (!mainText || !subText) return;

      // Split text into characters for animation
      const mainChars = mainText.textContent?.split('') || [];
      const subChars = subText.textContent?.split('') || [];

      // Wrap each character in a span
      mainText.innerHTML = mainChars
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');
      subText.innerHTML = subChars
        .map((char) => `<span class="char">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('');

      const mainSpans = mainText.querySelectorAll('.char');
      const subSpans = subText.querySelectorAll('.char');

      // Set initial state
      gsap.set(mainSpans, { y: 60, opacity: 0 });
      gsap.set(subSpans, { y: 40, opacity: 0 });

      // Animate on scroll enter
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: false,
          toggleActions: 'play none none reverse',
        },
      });

      // Main text stagger
      tl.to(mainSpans, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.035,
        ease: 'power3.out',
      });

      // Sub text stagger (after main)
      tl.to(
        subSpans,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.035,
          ease: 'power3.out',
        },
        '-=0.4'
      );

      // Vertical gold line animation
      gsap.from(lineRef.current, {
        height: 0,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        background: 'linear-gradient(to bottom, var(--void), var(--surface))',
      }}
    >
      {/* Vertical Gold Line */}
      <div
        ref={lineRef}
        style={{
          position: 'absolute',
          top: 0,
          left: '8%',
          width: '1px',
          height: 0,
          background: 'var(--gold)',
        }}
      />

      {/* Main Statement */}
      <div
        ref={mainTextRef}
        className="font-display"
        style={{
          fontSize: 'clamp(40px, 6vw, 80px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--cream)',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        Born from obsession.
      </div>

      {/* Sub Statement */}
      <div
        ref={subTextRef}
        className="font-display"
        style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontStyle: 'italic',
          fontWeight: 300,
          color: 'var(--muted)',
          textAlign: 'center',
          marginTop: '24px',
          lineHeight: 1.2,
        }}
      >
        Where art ends, engineering begins.
      </div>
    </section>
  );
}
