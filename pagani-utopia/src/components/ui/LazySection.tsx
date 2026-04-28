import { useRef, useState, useEffect, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** How far before the section enters the viewport to start loading (px) */
  rootMargin?: string;
  /** Minimum height placeholder to prevent layout shift */
  minHeight?: string;
  /** Keep rendered once visible (default true) */
  keepMounted?: boolean;
}

/**
 * Delays mounting children until the placeholder scrolls near the viewport.
 * Uses IntersectionObserver for zero-cost idle tracking.
 */
export function LazySection({
  children,
  rootMargin = '400px',
  minHeight = '200px',
  keepMounted = true,
}: LazySectionProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (keepMounted) observer.disconnect();
        } else if (!keepMounted) {
          setIsVisible(false);
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin, keepMounted]);

  return (
    <div ref={sentinelRef} style={{ minHeight: isVisible ? undefined : minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}
