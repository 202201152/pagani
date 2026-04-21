import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useScramble } from '../../hooks/useScramble';

const NAVIGATION = [
  { id: 'design', label: 'DESIGN' },
  { id: 'performance', label: 'PERFORMANCE' },
  { id: 'interior', label: 'INTERIOR' },
];

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll-based active state
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAVIGATION.map((nav) => document.getElementById(nav.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(i);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slide indicator to active item
  useEffect(() => {
    if (!indicatorRef.current) return;

    const navLinks = document.querySelectorAll('.navbar-link');
    const activeLink = navLinks[activeIndex] as HTMLElement;

    if (activeLink) {
      const rect = activeLink.getBoundingClientRect();
      const navbarRect = navbarRef.current?.getBoundingClientRect();

      if (navbarRect) {
        gsap.to(indicatorRef.current, {
          width: rect.width,
          x: rect.left - navbarRect.left,
          duration: 0.5,
          ease: 'power3.inOut',
        });
      }
    }
  }, [activeIndex]);

  // Hide/show navbar on scroll
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY;

          if (delta > 80 && currentScrollY > 100) {
            gsap.to(navbarRef.current, {
              y: -64,
              duration: 0.4,
              ease: 'power3.inOut',
            });
          } else if (delta < -80) {
            gsap.to(navbarRef.current, {
              y: 0,
              duration: 0.4,
              ease: 'power3.inOut',
            });
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav ref={navbarRef} className="navbar">
        {/* Brand */}
        <a href="#" className="navbar-brand" onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}>
          Pagani
        </a>

        {/* Navigation Links */}
        <div className="navbar-nav">
          {NAVIGATION.map((nav, index) => (
            <NavItem
              key={nav.id}
              id={nav.id}
              label={nav.label}
              isActive={index === activeIndex}
              onClick={handleNavClick}
            />
          ))}
        </div>

        {/* Active Indicator */}
        <div
          ref={indicatorRef}
          style={{
            position: 'absolute',
            bottom: '16px',
            left: 0,
            height: '1px',
            background: 'var(--gold)',
            width: 0,
          }}
        />

        {/* Configure Button */}
        <button className="btn-gold cta-btn" style={{ fontSize: '11px', padding: '12px 24px' }}>
          CONFIGURE
        </button>

        {/* Hamburger Menu (Mobile) */}
        <div className="hamburger" onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'var(--void)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={toggleMenu}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: 'var(--cream)',
              fontSize: '32px',
              cursor: 'pointer',
            }}
          >
            ×
          </button>

          {NAVIGATION.map((nav, index) => (
            <a
              key={nav.id}
              href={`#${nav.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(nav.id);
              }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 8vw, 64px)',
                color: index === activeIndex ? 'var(--gold)' : 'var(--cream)',
                textDecoration: 'none',
                marginBottom: '24px',
                opacity: 0,
                transform: 'translateX(40px)',
                animation: `fadeInRight 0.5s ease forwards ${index * 0.1 + 0.3}s`,
              }}
            >
              {nav.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @keyframes fadeInRight {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}

function NavItem({
  id,
  label,
  isActive,
  onClick,
}: {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}) {
  const elementRef = useRef<HTMLAnchorElement>(null);
  const { displayText, scramble, reset } = useScramble(label);

  const handleMouseEnter = () => {
    scramble(label, { duration: 400, interval: 40 });
  };

  const handleMouseLeave = () => {
    reset(label);
  };

  return (
    <a
      ref={elementRef}
      href={`#${id}`}
      className={`navbar-link ${isActive ? 'active' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onClick(id);
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </a>
  );
}
