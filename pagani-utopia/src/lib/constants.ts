// Pagani Utopia - Constants and Content

export const SPECS = {
  engine: 'AMG M158 6.0L V12 Biturbo',
  power: '852 HP (628 kW)',
  powerRpm: '6,000 RPM',
  torque: '1,100 Nm',
  torqueRpm: '2,000 RPM',
  transmission: '7-speed manual (Pagani/Xtrac)',
  acceleration: '2.5 seconds',
  topSpeed: '355 km/h',
  weight: '1,280 kg (dry)',
  chassis: 'Carbo-Titanium HP62 G2',
  production: '99 units worldwide',
  origin: 'Modena, Italy',
};

export const SPECS_GRID = [
  { value: '852', unit: 'HP', label: 'Engine Power' },
  { value: '6.0', unit: 'L', label: 'Displacement' },
  { value: '1,280', unit: 'KG', label: 'Dry Weight' },
  { value: '2.5', unit: 's', label: '0–100 km/h' },
  { value: '355', unit: 'km/h', label: 'Top Speed' },
  { value: '99', unit: '', label: 'Units Built' },
  { value: '7', unit: 'Speed', label: 'Manual' },
  { value: 'Carbon', unit: 'Ti', label: 'Monocoque' },
  { value: 'Pushrod', unit: '', label: 'Suspension' },
];

export const TEASER_SPECS = [
  { value: 852, label: 'HP', sublabel: 'V12' },
  { value: 6.0, label: 'L', sublabel: '' },
  { value: 1280, label: 'KG', sublabel: '' },
  { value: 2.5, label: 's', sublabel: '0–100 KM/H' },
];

export const PAGE_TAGLINES = {
  home: 'Born from obsession.',
  design: 'Where art ends, engineering begins.',
  performance: '852 reasons to believe.',
  interior: 'Every detail, handmade.',
  outro: 'Only 99. Each one different. Each one final.',
};

export const HORACIO_QUOTE = {
  text: 'Every single Utopia is unique. We don\'t want to make machines, we want to make dreams.',
  author: 'Horacio Pagani',
  role: 'Founder',
};

export const NAVIGATION = [
  { path: '/design', label: 'DESIGN' },
  { path: '/performance', label: 'PERFORMANCE' },
  { path: '/interior', label: 'INTERIOR' },
  { path: '#contact', label: 'CONTACT' },
];

export const CAMERA_POSITIONS = {
  home: { position: [2, 1.5, 5], lookAt: [0, 0.5, 0] },
  design: { position: [0, 3, 0.1], lookAt: [0, 0, 0] },
  performance: { position: [-3, 0.5, 3], lookAt: [0, 0.5, 0] },
  interior: { position: [0, 0.8, 4], lookAt: [0, 0.5, 0] },
  outro: { position: [0, 6, 0.1], lookAt: [0, 0, 0] },
};

export const IMAGES = {
  st_front: '/assets/img/st_front.jpg',
  st_back: '/assets/img/st_back.jpg',
  ct_top: '/assets/img/ct_top.jpg',
  ut1: '/assets/img/ut1.jpg',
  sty_int: '/assets/img/sty_int.jpg',
  ct_gear_7: '/assets/img/ct_gear_7.jpg',
  ct_engine: '/assets/img/ct_engine.jpg',
};

export const MODEL_PATH = '/assets/model/utopia.glb';

export const ANIMATION_DURATIONS = {
  preloader: 1.4,
  preloaderPause: 0.3,
  preloaderReveal: 0.7,
  pageTransition: 0.5,
  cameraTransition: 0.7,
  textScramble: 0.4,
};

export const SCROLL_CONFIG = {
  lenisLerp: 0.1,
  lenisSmoothWheel: true,
  lenisWheelMultiplier: 0.9,
  mouseLerp: 0.05,
  mouseParallaxX: 0.08,
  mouseParallaxY: 0.08,
  floatAmplitude: 0.015,
  floatFrequency: 0.4,
};

export const ROTATION_SECTION = {
  height: '300vh',
  totalRotation: Math.PI * 2,
  startElevation: 15,
  endElevation: 5,
  azimuthOrbit: 30,
};
