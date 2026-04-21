import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function useMousePosition() {
  const setMousePosition = useAppStore((state) => state.setMousePosition);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition(x, y);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [setMousePosition]);
}

export function useMousePositionRaw() {
  const { mouseX, mouseY } = useAppStore();
  return { mouseX, mouseY };
}
