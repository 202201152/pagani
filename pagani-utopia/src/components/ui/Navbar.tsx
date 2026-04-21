import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useAppStore } from '../../store/useAppStore';
import { useScramble } from '../../hooks/useScramble';
import { NAVIGATION } from '../../lib/constants';

export function Navbar() {
  const navbarRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const { navbarVisible, setNavbarVisible } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Get active nav item
  useEffect(() => {
    const currentIndex = NAVIGATION.findIndex((nav) => location.pathname === nav.path);
    setActiveIndex(currentIndex >= 0 ? currentIndex : 0);
  }, [location.pathname]);

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
            // Scrolling down - hide navbar
            gsap.to(navbarRef.current, {
              y: -64,
              duration: 0.4,
              ease: 'power3.inOut',
            });
            setNavbarVisible(false);
          } else if (delta < -80) {
            // Scrolling up - show navbar
            gsap.to(navbarRef.current, {
              y: 0,
              duration: 0.4,
              ease: 'power3.inOut',
            });
            setNavbarVisible(true);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [setNavbarVisible]);

  // Mobile menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav ref={navbarRef} className="navbar">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          Pagani
        </Link>

        {/* Navigation Links */}
        <div className="navbar-nav">
          {NAVIGATION.map((nav, index) => (
            <NavItem
              key={nav.path}
              path={nav.path}
              label={nav.label}
              isActive={index === activeIndex}
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
            <Link
              key={nav.path}
              to={nav.path}
              onClick={() => setIsMenuOpen(false)}
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
            </Link>
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

function NavItem({ path, label, isActive }: { path: string; label: string; isActive: boolean }) {
  const elementRef = useRef<HTMLAnchorElement>(null);
  const { displayText, scramble, reset } = useScramble(label);

  const handleMouseEnter = () => {
    scramble(label, { duration: 400, interval: 40 });
  };

  const handleMouseLeave = () => {
    reset(label);
  };

  return (
    <Link
      ref={elementRef}
      to={path}
      className={`navbar-link ${isActive ? 'active' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {displayText}
    </Link>
  );
}
