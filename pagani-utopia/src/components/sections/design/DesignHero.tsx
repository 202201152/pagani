import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { IMAGES } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function DesignHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax zoom effect on image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Title fade in
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Gold line grows from center
      gsap.fromTo(
        lineRef.current,
        { width: 0 },
        {
          width: '80px',
          duration: 1,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
          delay: 0.3,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Image */}
      <div
        ref={imageRef}
        className="parallax-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.ct_top})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.4)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: '10vh',
          left: 0,
          right: 0,
          padding: '0 4vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <h1
          ref={titleRef}
          className="font-display"
          style={{
            fontSize: 'clamp(64px, 12vw, 100px)',
            fontWeight: 300,
            color: 'var(--cream)',
            letterSpacing: '0.15em',
            lineHeight: 1,
          }}
        >
          DESIGN
        </h1>

        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'var(--gold)',
            marginTop: '16px',
          }}
        />
      </div>
    </section>
  );
}
