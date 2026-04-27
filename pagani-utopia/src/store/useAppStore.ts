import { create } from 'zustand';

export interface AppState {
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

  // Route / camera state (used by scroll sections)
  currentCameraPosition: string;
  setCurrentCameraPosition: (position: string) => void;
  activePage: string;
  setActivePage: (page: string) => void;

  // Interaction state
  isInRotationSection: boolean;
  setIsInRotationSection: (value: boolean) => void;

  // Mouse position (normalized -1..1 for 3D)
  mouseX: number;
  mouseY: number;
  setMousePosition: (x: number, y: number) => void;
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

  // Route / camera state
  currentCameraPosition: 'home',
  setCurrentCameraPosition: (position) => set({ currentCameraPosition: position }),
  activePage: 'home',
  setActivePage: (page) => set({ activePage: page }),

  // Interaction state
  isInRotationSection: false,
  setIsInRotationSection: (value) => set({ isInRotationSection: value }),

  // Mouse position
  mouseX: 0,
  mouseY: 0,
  setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),
}));
