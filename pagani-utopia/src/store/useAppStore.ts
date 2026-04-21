import { create } from 'zustand';

interface AppState {
  // Loading state
  isLoaded: boolean;
  isPreloaded: boolean;
  setLoaded: () => void;
  setPreloaded: (preloaded: boolean) => void;

  // Scroll state
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Navbar visibility
  navbarVisible: boolean;
  setNavbarVisible: (visible: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Loading state
  isLoaded: false,
  isPreloaded: false,
  setLoaded: () => set({ isLoaded: true }),
  setPreloaded: (preloaded) => set({ isPreloaded: preloaded }),

  // Scroll state
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  // Navbar visibility
  navbarVisible: true,
  setNavbarVisible: (visible) => set({ navbarVisible: visible }),
}));
