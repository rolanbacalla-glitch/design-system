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
import FlyonUIExamples from './components/FlyonUIExamples';
import './index.css';
import 'flyonui/flyonui';

const initialDesignSystem: DesignSystem = {
  colours: [
      { name: 'primary', label: 'Primary', value: '#00E5FF', description: 'Main brand colour for directional focus' },
      { name: 'secondary', label: 'Secondary', value: '#9CA3AF', description: 'Secondary accent for structural elements' },
      { name: 'tertiary', label: 'Tertiary', value: '#AA00FF', description: 'Tertiary accent for specialized actions' },
      { name: 'error', label: 'Error', value: '#EF4444', description: 'Critical system exception mapping' },
      { name: 'background', label: 'Background', value: '#08090A', description: 'Overall base foundation' },
      { name: 'surface', label: 'Surface', value: '#121417', description: 'Component container depth' },
      { name: 'onPrimary', label: 'On Primary', value: '#000000', description: 'Contrast mapping for primary' },
      { name: 'onSecondary', label: 'On Secondary', value: '#FFFFFF', description: 'Contrast mapping for secondary' },
      { name: 'onSurface', label: 'On Surface', value: '#F3F4F6', description: 'Contrast mapping for surface' },
  ],
  typography: [
    { name: 'displayLarge', label: 'Display Large', fontFamily: 'Inter', fontWeight: 900, fontSize: 80, lineHeight: 88, letterSpacing: -3 },
    { name: 'headlineLarge', label: 'Headline Large', fontFamily: 'Inter', fontWeight: 800, fontSize: 48, lineHeight: 56, letterSpacing: -1.5 },
    { name: 'headlineSmall', label: 'Headline Small', fontFamily: 'Inter', fontWeight: 700, fontSize: 28, lineHeight: 36, letterSpacing: -0.5 },
    { name: 'titleLarge', label: 'Title Large', fontFamily: 'Inter', fontWeight: 600, fontSize: 20, lineHeight: 28, letterSpacing: -0.2 },
    { name: 'bodyLarge', label: 'Body Large', fontFamily: 'Inter', fontWeight: 400, fontSize: 16, lineHeight: 24, letterSpacing: 0 },
    { name: 'bodySmall', label: 'Body Small', fontFamily: 'Inter', fontWeight: 400, fontSize: 13, lineHeight: 18, letterSpacing: 0 },
    { name: 'labelLarge', label: 'Label Large', fontFamily: 'JetBrains Mono', fontWeight: 700, fontSize: 10, lineHeight: 14, letterSpacing: 1 },
  ],
  spacing: [
    { name: 'xs', value: 4 },
    { name: 's', value: 8 },
    { name: 'm', value: 16 },
    { name: 'l', value: 32 },
    { name: 'xl', value: 64 },
    { name: 'xxl', value: 128 },
  ],
  elevation: [
    { name: 'Flat', level: 0, shadow: 'none' },
    { name: 'Ambient', level: 1, shadow: '0 4px 20px -5px rgba(0, 0, 0, 0.4)' },
    { name: 'Floating', level: 2, shadow: '0 20px 50px -10px rgba(0, 0, 0, 0.6)' },
    { name: 'Projected', level: 3, shadow: '0 40px 100px -20px rgba(0, 0, 0, 0.8)' },
  ],
  iconSizes: [
    { name: 'nano', value: 16, weight: 400 },
    { name: 'standard', value: 24, weight: 400 },
    { name: 'hero', value: 48, weight: 400 },
    { name: 'massive', value: 96, weight: 400 },
  ],
  iconStyle: 'outlined',
  iconWeight: 400,
  gradients: [
    {
      name: 'Cyanide Flux',
      type: 'linear',
      rotation: 135,
      stops: [
        { id: '1', colour: '#00E5FF', position: 0 },
        { id: '2', colour: '#1200FF', position: 100 }
      ]
    },
    {
      name: 'Carbon Plasma',
      type: 'radial',
      rotation: 0,
      stops: [
        { id: '1', colour: '#333333', position: 0 },
        { id: '2', colour: '#000000', position: 100 }
      ]
    }
  ],
  applyTheme: false
};

type View = 'colours' | 'typography' | 'spacing' | 'elevation' | 'icons' | 'gradients' | 'tailwind' | 'flyonui';

const App: React.FC = () => {
  const [designSystem, setDesignSystem] = useState<DesignSystem>(initialDesignSystem);
  const [currentView, setCurrentView] = useState<View>('colours');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  useEffect(() => {
    const fontsToLoad = [...new Set(designSystem.typography.map(t => t.fontFamily as string))]
      .filter((f: string) => !['Inter', 'JetBrains Mono', 'Roboto', 'Outfit', 'Montserrat'].includes(f));
    
    if (fontsToLoad.length > 0 || true) {
      const linkId = 'system-google-fonts';
      let link = document.getElementById(linkId) as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
      const baseFonts = 'Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700';
      const dynamicFonts = (fontsToLoad as string[]).map(f => f.replace(/\s+/g, '+')).join('&family=');
      link.href = `https://fonts.googleapis.com/css2?family=${baseFonts}${dynamicFonts ? `&family=${dynamicFonts}` : ''}&display=swap`;
    }
  }, [designSystem.typography]);

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
      case 'flyonui':
        return <FlyonUIExamples />;
      default:
        return null;
    }
  };

  return (
    <div className={`${theme} min-h-screen relative bg-[var(--ui-bg)] selection:bg-[var(--ui-text)]/[0.3] scroll-smooth transition-colors duration-700`}>
      
      {/* Background Atmosphere */}
      <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] [background-image:linear-gradient(to_right,var(--ui-text)_1px,transparent_1px),linear-gradient(to_bottom,var(--ui-text)_1px,transparent_1px)] [background-size:40px_40px]"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-transparent to-[var(--ui-bg)]"></div>
          <div className={`glow-orb w-[800px] h-[800px] bg-cyan-500/5 top-[-400px] left-[-400px] blur-[100px] transition-colors duration-1000`} />
          <div className={`glow-orb w-[600px] h-[600px] bg-blue-500/5 bottom-[-300px] right-[-300px] blur-[100px] [animation-delay:4s] transition-colors duration-1000`} />
      </div>

      <div className="flex transition-all duration-700 relative z-10">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={setCurrentView} 
          theme={theme} 
          toggleTheme={() => setTheme(prev => prev === 'light' ? 'dark' : 'light')} 
          designSystem={designSystem} 
        />
        
        <main className="flex-1 p-4 md:p-8 lg:p-12">
          <div className="max-w-[1400px] mx-auto min-h-full">
            {renderContent()}
          </div>
        </main>

        {/* Global HUD Decorations */}
        <div className="fixed top-12 right-12 flex flex-col items-end gap-2 opacity-20 pointer-events-none group">
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--ui-text)]">System Status: Nominal</span>
            <div className="flex gap-1">
                {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-[var(--ui-text)]" />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default App;
