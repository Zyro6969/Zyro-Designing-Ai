export enum LogoStyle {
  MINIMALIST = 'Minimalist',
  ABSTRACT = 'Abstract',
  MASCOT = 'Mascot',
  VINTAGE = 'Vintage',
  FUTURISTIC = 'Futuristic',
  LUXURY = 'Luxury',
  HAND_DRAWN = 'Hand Drawn',
  GEOMETRIC = 'Geometric'
}

export enum ColorPalette {
  MODERN_DARK = 'Modern Dark (Black/Grey/Gold)',
  VIBRANT = 'Vibrant & Bold',
  PASTEL = 'Soft Pastels',
  EARTHY = 'Earthy Tones',
  MONOCHROME = 'Black & White',
  COOL_BLUES = 'Tech Blues',
  WARM_GRADIENT = 'Warm Gradients'
}

export interface GenerationRequest {
  brandName: string;
  tagline?: string;
  description: string;
  style: LogoStyle;
  colors: ColorPalette;
}

export interface GeneratedLogo {
  id: string;
  imageUrl: string;
  promptUsed: string;
  timestamp: number;
}
