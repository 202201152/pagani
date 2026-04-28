// TypeScript wrapper for the LogoLoop JSX component (React Bits)
// Provides type safety without modifying the upstream component.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _LogoLoop from './LogoLoop';
import type { ComponentType } from 'react';

interface LogoItem {
  src: string;
  alt: string;
  href?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  ariaLabel?: string;
}

const LogoLoop = _LogoLoop as ComponentType<LogoLoopProps>;
export default LogoLoop;
