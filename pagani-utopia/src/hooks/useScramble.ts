import { useState, useCallback, useRef } from 'react';
import gsap from 'gsap';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

interface ScrambleOptions {
  duration?: number;
  interval?: number;
  iterations?: number;
}

export function useScramble(initialText: string = '') {
  const [displayText, setDisplayText] = useState(initialText);
  const isScrambling = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = useCallback(
    (finalText: string, options: ScrambleOptions = {}) => {
      const {
        duration = 400,
        interval = 40,
        iterations = 10,
      } = options;

      if (isScrambling.current) return;
      isScrambling.current = true;

      const chars = finalText.split('');
      const totalSteps = Math.floor(duration / interval);
      let currentStep = 0;

      const animate = () => {
        if (currentStep >= totalSteps) {
          setDisplayText(finalText);
          isScrambling.current = false;
          return;
        }

        const scrambled = chars
          .map((char, index) => {
            if (char === ' ') return ' ';

            // Characters that have been "revealed" stay revealed
            const revealProgress = currentStep / totalSteps;
            const charRevealPoint = index / chars.length;

            if (revealProgress >= charRevealPoint + Math.random() * 0.3) {
              return char;
            }

            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplayText(scrambled);
        currentStep++;
        timeoutRef.current = setTimeout(animate, interval);
      };

      animate();
    },
    []
  );

  const reset = useCallback((text: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    isScrambling.current = false;
    setDisplayText(text);
  }, []);

  return { displayText, scramble, reset, isScrambling: isScrambling.current };
}

// Hook for element-based scramble on hover
export function useScrambleText(
  elementRef: React.RefObject<HTMLElement>,
  options?: ScrambleOptions
) {
  const { scramble } = useScramble();

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const originalText = element.textContent || '';
    let isHovering = false;

    const handleMouseEnter = () => {
      if (!isHovering) {
        isHovering = true;
        scramble(originalText, options);
      }
    };

    const handleMouseLeave = () => {
      isHovering = false;
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [elementRef, scramble, options]);
}
