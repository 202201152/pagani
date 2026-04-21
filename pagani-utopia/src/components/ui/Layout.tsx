import { useState, useEffect } from 'react';
import { Navbar } from './Navbar';
import { Cursor } from './Cursor';
import { Preloader } from './Preloader';
import { SmoothScroll } from './SmoothScroll';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [isPreloading, setIsPreloading] = useState(
    !sessionStorage.getItem('pagani-preloaded')
  );

  return (
    <>
      {isPreloading && <Preloader onComplete={() => setIsPreloading(false)} />}
      <SmoothScroll>
        <Cursor />
        <Navbar />
        {children}
      </SmoothScroll>
    </>
  );
}
