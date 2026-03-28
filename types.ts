
export interface ColourToken {
  name: string;
  label: string;
  value: string;
  description: string;
}

export interface TypographyToken {
  name: string;
  label: string;
  fontFamily: string;
  fontWeight: number;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface SpacingToken {
  name: string;
  value: number;
}

export interface ElevationToken {
  name: string;
  level: number;
  shadow: string;
}

export interface IconSizeToken {
  name: string;
  value: number;
  weight?: number;
}

export interface GradientStop {
  id: string;
  colour: string;
  position: number; // 0 to 100
}

export interface GradientToken {
  name: string;
  type: 'linear' | 'radial';
  rotation: number;
  stops: GradientStop[];
}

export interface DesignSystem {
  colours: ColourToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  elevation: ElevationToken[];
  iconSizes: IconSizeToken[];
  iconStyle: 'filled' | 'outlined';
  iconWeight: number;
  gradients: GradientToken[];
  applyTheme: boolean;
}