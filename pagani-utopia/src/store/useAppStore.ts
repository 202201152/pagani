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

  // Page state
  activePage: string;
  setActivePage: (page: string) => void;

  // 3D model state
  currentCameraPosition: 'home' | 'design' | 'performance' | 'interior' | 'outro';
  setCurrentCameraPosition: (
    pos: 'home' | 'design' | 'performance' | 'interior' | 'outro'
  ) => void;

  // Rotation section state
  isInRotationSection: boolean;
  setIsInRotationSection: (inSection: boolean) => void;
  rotationProgress: number;
  setRotationProgress: (progress: number) => void;

  // Mouse position
  mouseX: number;
  mouseY: number;
  setMousePosition: (x: number, y: number) => void;

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

  // Page state
  activePage: '/',
  setActivePage: (page) => set({ activePage: page }),

  // 3D model state
  currentCameraPosition: 'home',
  setCurrentCameraPosition: (pos) => set({ currentCameraPosition: pos }),

  // Rotation section state
  isInRotationSection: false,
  setIsInRotationSection: (inSection) => set({ isInRotationSection: inSection }),
  rotationProgress: 0,
  setRotationProgress: (progress) => set({ rotationProgress: progress }),

  // Mouse position
  mouseX: 0,
  mouseY: 0,
  setMousePosition: (x, y) => set({ mouseX: x, mouseY: y }),

  // Navbar visibility
  navbarVisible: true,
  setNavbarVisible: (visible) => set({ navbarVisible: visible }),
}));
