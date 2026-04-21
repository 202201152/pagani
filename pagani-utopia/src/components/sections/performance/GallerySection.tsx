import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { IMAGES } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax effect on the rear view image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      // Fade overlay slightly
      gsap.to(overlayRef.current, {
        backgroundColor: 'rgba(10, 10, 10, 0.2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom top',
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
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--void)'
      }}
    >
      {/* Background Image: Rear View */}
      <div
        ref={imageRef}
        className="parallax-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.st_back})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center',
        }}
      />
      
      {/* Dark Overlay */}
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.6)',
        }}
      />

      {/* Subtle Caption */}
      <div style={{
        position: 'absolute',
        bottom: '8vh',
        right: '4vw',
        textAlign: 'right',
        zIndex: 1,
      }}>
        <p className="font-mono" style={{ color: 'var(--gold)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
          EXHAUST & AERODYNAMICS
        </p>
        <p className="font-display italic" style={{ color: 'var(--cream)', fontSize: '24px', mt: 2 }}>
          Quad Titanium Tails
        </p>
      </div>
    </section>
  );
}
