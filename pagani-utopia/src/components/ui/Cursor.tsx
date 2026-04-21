import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';

export function Cursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { isInRotationSection } = useAppStore();
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState<'button' | 'image' | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Outer ring - lerp for lag effect
      gsap.to(outerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.15,
        ease: 'power2.out',
      });

      // Inner dot - near instant
      gsap.to(innerRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.05,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Magnetic hover effects
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for CTA buttons
      if (target.closest('.cta-btn, .btn-gold, .btn-ghost, .navbar-link')) {
        setIsHovering(true);
        setHoverType('button');

        gsap.to(outerRef.current, {
          scale: 2.5,
          backgroundColor: 'rgba(201, 168, 76, 0.2)',
          duration: 0.3,
        });

        gsap.to(innerRef.current, {
          scale: 0,
          duration: 0.2,
        });

        // Magnetic effect on button
        const btn = target.closest('.cta-btn, .btn-gold, .btn-ghost');
        if (btn) {
          const rect = btn.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const moveX = (e.clientX - centerX) * 0.3;
          const moveY = (e.clientY - centerY) * 0.3;

          gsap.to(btn, {
            x: moveX,
            y: moveY,
            duration: 0.3,
            ease: 'power2.out',
          });
        }
      }

      // Check for images
      if (target.tagName === 'IMG' || target.closest('.parallax-image')) {
        setIsHovering(true);
        setHoverType('image');

        gsap.to(outerRef.current, {
          scale: 3,
          backgroundColor: 'transparent',
          borderColor: '#C9A84C',
          duration: 0.3,
        });

        gsap.to(innerRef.current, {
          scale: 0,
          duration: 0.2,
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (target.closest('.cta-btn, .btn-gold, .btn-ghost, .navbar-link')) {
        setIsHovering(false);
        setHoverType(null);

        gsap.to(outerRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3,
        });

        gsap.to(innerRef.current, {
          scale: 1,
          duration: 0.2,
        });

        // Reset button position
        const btn = target.closest('.cta-btn, .btn-gold, .btn-ghost');
        if (btn) {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          });
        }
      }

      if (target.tagName === 'IMG' || target.closest('.parallax-image')) {
        setIsHovering(false);
        setHoverType(null);

        gsap.to(outerRef.current, {
          scale: 1,
          borderColor: '#C9A84C',
          duration: 0.3,
        });

        gsap.to(innerRef.current, {
          scale: 1,
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  // Crosshair when in rotation section (drag mode)
  useEffect(() => {
    if (isInRotationSection) {
      gsap.to(outerRef.current, {
        borderStyle: 'dashed',
        duration: 0.3,
      });
    } else {
      gsap.to(outerRef.current, {
        borderStyle: 'solid',
        duration: 0.3,
      });
    }
  }, [isInRotationSection]);

  return (
    <div className="custom-cursor">
      <div
        ref={outerRef}
        className="cursor-outer"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
      <div
        ref={innerRef}
        className="cursor-inner"
        style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}
      />
    </div>
  );
}
