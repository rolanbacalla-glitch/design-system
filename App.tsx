
import React, { useState, useEffect } from 'react';
import { DesignSystem } from './types';
import Sidebar from './components/Sidebar';
import ColourPalette from './components/ColourPalette';
import TypographyScale from './components/TypographyScale';
import SpacingSystem from './components/SpacingSystem';
import ElevationStyles from './components/ElevationStyles';
import Iconography from './components/Iconography';
import GradientGenerator from './components/GradientGenerator';
import TailwindPalette from './components/TailwindPalette';
import { hexToRgb, getLuminance } from './utils';
import './index.css';

const initialDesignSystem: DesignSystem = {
  colours: [
      { name: 'primary', label: 'Primary', value: '#404040', description: 'Main brand colour' },
      { name: 'secondary', label: 'Secondary', value: '#737373', description: 'Secondary accent colour' },
      { name: 'tertiary', label: 'Tertiary', value: '#FF5733', description: 'Tertiary accent colour' },
      { name: 'error', label: 'Error', value: '#EF4444', description: 'Colour for errors' },
      { name: 'background', label: 'Background', value: '#FAFAFA', description: 'Overall page background' },
      { name: 'surface', label: 'Surface', value: '#FFFFFF', description: 'Component backgrounds' },
      { name: 'onPrimary', label: 'On Primary', value: '#FFFFFF', description: 'Text/icons on primary colour' },
      { name: 'onSecondary', label: 'On Secondary', value: '#FFFFFF', description: 'Text/icons on secondary colour' },
      { name: 'onSurface', label: 'On Surface', value: '#111111', description: 'Text/icons on surface colour' },
  ],
  typography: [
    { name: 'displayLarge', label: 'Display Large', fontFamily: 'SF Pro', fontWeight: 500, fontSize: 57, lineHeight: 64, letterSpacing: -0.25 },
    { name: 'headlineLarge', label: 'Headline Large', fontFamily: 'SF Pro', fontWeight: 500, fontSize: 32, lineHeight: 40, letterSpacing: 0 },
    { name: 'headlineSmall', label: 'Headline Small', fontFamily: 'SF Pro', fontWeight: 500, fontSize: 24, lineHeight: 32, letterSpacing: 0 },
    { name: 'titleLarge', label: 'Title Large', fontFamily: 'SF Pro', fontWeight: 500, fontSize: 22, lineHeight: 28, letterSpacing: 0 },
    { name: 'bodyLarge', label: 'Body Large', fontFamily: 'SF Pro', fontWeight: 400, fontSize: 16, lineHeight: 24, letterSpacing: 0.5 },
    { name: 'bodySmall', label: 'Body Small', fontFamily: 'SF Pro', fontWeight: 400, fontSize: 12, lineHeight: 16, letterSpacing: 0.4 },
    { name: 'labelLarge', label: 'Label Large', fontFamily: 'SF Pro', fontWeight: 500, fontSize: 14, lineHeight: 20, letterSpacing: 0.1 },
  ],
  spacing: [
    { name: 'xs', value: 4 },
    { name: 's', value: 8 },
    { name: 'm', value: 16 },
    { name: 'l', value: 24 },
    { name: 'xl', value: 32 },
    { name: 'xxl', value: 64 },
  ],
  elevation: [
    { name: 'level0', level: 0, shadow: 'none' },
    { name: 'level1', level: 1, shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)' },
    { name: 'level2', level: 2, shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' },
    { name: 'level3', level: 3, shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' },
  ],
  iconSizes: [
    { name: 'small', value: 18, weight: 300 },
    { name: 'medium', value: 24, weight: 300 },
    { name: 'large', value: 32, weight: 300 },
    { name: 'extraLarge', value: 48, weight: 300 },
  ],
  iconStyle: 'outlined',
  iconWeight: 300,
  gradients: [
    {
      name: 'Neon Lagoon',
      type: 'linear',
      rotation: 90,
      stops: [
        { id: '1', colour: '#00F260', position: 0 },
        { id: '2', colour: '#0575E6', position: 100 }
      ]
    },
    {
      name: 'Synthwave',
      type: 'linear',
      rotation: 135,
      stops: [
        { id: '1', colour: '#FF3CAC', position: 0 },
        { id: '2', colour: '#784BA0', position: 50 },
        { id: '3', colour: '#2B86C5', position: 100 }
      ]
    }
  ],
  applyTheme: false
};

type View = 'colours' | 'typography' | 'spacing' | 'elevation' | 'icons' | 'gradients' | 'tailwind';

const App: React.FC = () => {
  const [designSystem, setDesignSystem] = useState<DesignSystem>(initialDesignSystem);
  const [currentView, setCurrentView] = useState<View>('colours');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Dynamically load Google Fonts when they are selected in the typography scale
  useEffect(() => {
    const fontsToLoad = [...new Set(designSystem.typography.map(t => t.fontFamily))]
      .filter(f => f !== 'SF Pro' && f !== 'Inter' && f !== 'Outfit' && f !== 'JetBrains Mono');
    
    if (fontsToLoad.length > 0) {
      const linkId = 'dynamic-google-fonts';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      
      const fontQuery = (fontsToLoad as string[]).map(f => f.replace(/\s+/g, '+')).join('&family=');
      link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@300;400;500;600;700;800;900&display=swap`;
    }
  }, [designSystem.typography]);

  // Generate CSS Variables based on current design system or defaults
  const getColorValue = (name: string) => designSystem.colours.find(c => c.name === name)?.value;
  
  // Calculate appropriate color-scheme for native inputs (like scrollbars, spin buttons)
  const bgHex = designSystem.applyTheme ? getColorValue('background') : (theme === 'dark' ? '#050505' : '#F8FAFC');
  let colorScheme = theme;
  if (designSystem.applyTheme && bgHex) {
    const rgb = hexToRgb(bgHex);
    if (rgb) {
      const lum = getLuminance(rgb.r, rgb.g, rgb.b);
      colorScheme = lum < 0.5 ? 'dark' : 'light';
    }
  }

  const themeStyles = `
    :root {
      color-scheme: ${colorScheme};
      
      /* Design System Tokens (Dynamic) */
      --app-primary: ${designSystem.applyTheme ? getColorValue('primary') : 'var(--ui-accent)'};
      --app-on-primary: ${designSystem.applyTheme ? getColorValue('onPrimary') : 'var(--ui-accent-on)'};
      --app-secondary: ${designSystem.applyTheme ? getColorValue('secondary') : 'var(--ui-text-muted)'};
      --app-background: ${designSystem.applyTheme ? getColorValue('background') : 'var(--ui-bg)'};
      --app-surface: ${designSystem.applyTheme ? getColorValue('surface') : 'var(--ui-surface)'};
      --app-text: ${designSystem.applyTheme ? getColorValue('onSurface') : 'var(--ui-text)'};
      --app-font-family: ${designSystem.applyTheme ? `"${designSystem.typography.find(t => t.name === 'bodyLarge')?.fontFamily || 'Outfit'}", var(--font-sans)` : 'var(--font-sans)'};
    }
  `;

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    switch (currentView) {
      case 'colours':
        return (
          <ColourPalette 
            colours={designSystem.colours} 
            setColours={(newColours) => setDesignSystem(ds => ({ ...ds, colours: newColours }))} 
            applyTheme={designSystem.applyTheme}
            setApplyTheme={(val) => setDesignSystem(ds => ({ ...ds, applyTheme: val }))}
          />
        );
      case 'typography':
        return <TypographyScale typography={designSystem.typography} setTypography={(newTypography) => setDesignSystem(ds => ({ ...ds, typography: newTypography }))} />;
      case 'spacing':
        return <SpacingSystem spacing={designSystem.spacing} setSpacing={(newSpacing) => setDesignSystem(ds => ({ ...ds, spacing: newSpacing }))} />;
      case 'elevation':
        return <ElevationStyles elevation={designSystem.elevation} setElevation={(newElevation) => setDesignSystem(ds => ({ ...ds, elevation: newElevation }))} />;
      case 'icons':
        return (
          <Iconography 
            iconSizes={designSystem.iconSizes} 
            setIconSizes={(newSizes) => setDesignSystem(ds => ({ ...ds, iconSizes: newSizes }))} 
            iconStyle={designSystem.iconStyle}
            setIconStyle={(style) => setDesignSystem(ds => ({ ...ds, iconStyle: style }))}
            iconWeight={designSystem.iconWeight}
            setIconWeight={(weight) => setDesignSystem(ds => ({ ...ds, iconWeight: weight }))}
            colours={designSystem.colours} 
          />
        );
      case 'gradients':
        return (
          <GradientGenerator 
            savedGradients={designSystem.gradients}
            onSave={(gradient) => setDesignSystem(ds => ({ ...ds, gradients: [...ds.gradients, gradient] }))}
          />
        );
      case 'tailwind':
        return <TailwindPalette />;
      default:
        return null;
    }
  };

  return (
    <div className={theme}>
      <style>{themeStyles}</style>
      <div className="flex h-[100dvh] text-[var(--ui-text)] bg-[var(--ui-bg)] transition-colors duration-300 glow-bg overflow-hidden">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} theme={theme} toggleTheme={toggleTheme} designSystem={designSystem} />
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
