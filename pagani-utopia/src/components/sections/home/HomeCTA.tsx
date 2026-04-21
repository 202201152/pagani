import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import { IMAGES } from '../../../lib/constants';

gsap.registerPlugin(ScrollTrigger);

export function HomeCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background image
      gsap.to(imageRef.current, {
        y: '20%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Text fade in
      gsap.from(textRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      });

      // Button fade in
      gsap.from(buttonRef.current, {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  const handleClick = () => {
    navigate('/design');
  };

  return (
    <section
      ref={sectionRef}
      style={{
        height: '80vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Parallax Background Image */}
      <div
        ref={imageRef}
        className="parallax-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${IMAGES.st_front})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: 'scale(1.1)',
        }}
      />

      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10, 10, 10, 0.72)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '32px',
        }}
      >
        {/* Statement */}
        <h2
          ref={textRef}
          className="font-display"
          style={{
            fontSize: 'clamp(32px, 5vw, 60px)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--cream)',
            lineHeight: 1.2,
          }}
        >
          The design begins here.
        </h2>

        {/* CTA Button */}
        <button
          ref={buttonRef}
          className="cta-btn btn-gold"
          onClick={handleClick}
          style={{
            cursor: 'pointer',
          }}
        >
          Explore Design
        </button>
      </div>
    </section>
  );
}
