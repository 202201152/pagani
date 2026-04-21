import { useEffect, useState } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollProgress<T extends HTMLElement>(
  targetRef: React.RefObject<T>,
  options?: {
    start?: string;
    end?: string;
    scrub?: number | boolean;
    pin?: boolean;
    onUpdate?: (progress: number) => void;
  }
) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const scrollTrigger = ScrollTrigger.create({
        trigger: element,
        start: options?.start ?? 'top top',
        end: options?.end ?? 'bottom bottom',
        scrub: options?.scrub ?? true,
        pin: options?.pin ?? false,
        onUpdate: (self) => {
          const newProgress = self.progress;
          setProgress(newProgress);
          options?.onUpdate?.(newProgress);
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    });

    return () => ctx.revert();
  }, [targetRef, options?.start, options?.end, options?.scrub, options?.pin]);

  return progress;
}

export function useScrollToTrigger<T extends HTMLElement>(
  targetRef: React.RefObject<T>,
  animation: (tl: gsap.core.Timeline, progress: number) => void
) {
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          pin: true,
        },
      });

      animation(tl, 1);
      setTimeline(tl);
    });

    return () => ctx.revert();
  }, [targetRef]);

  return timeline;
}
