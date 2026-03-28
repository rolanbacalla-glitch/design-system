
// This is the Figma plugin logic (backend).
// It handles messages from the UI (App.tsx) and interacts with the Figma API.

figma.showUI(__html__, { 
  width: 900, 
  height: 700,
  themeColors: true 
});

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'export-to-figma') {
    const { designSystem } = msg;

    try {
      // 1. Create Color Styles
      for (const color of designSystem.colours) {
        const styleName = `Design System / ${color.label}`;
        let style = (await figma.getLocalPaintStylesAsync()).find(s => s.name === styleName);
        
        if (!style) {
          style = figma.createPaintStyle();
          style.name = styleName;
        }
        
        style.description = color.description;
        const rgb = hexToRgb(color.value);
        if (rgb) {
          style.paints = [{
            type: 'SOLID',
            color: { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 }
          }];
        }
      }

      // 2. Create Typography Styles
      for (const typo of designSystem.typography) {
        const styleName = `Design System / ${typo.label}`;
        let style = (await figma.getLocalTextStylesAsync()).find(s => s.name === styleName);

        if (!style) {
          style = figma.createTextStyle();
          style.name = styleName;
        }

        const fontName = { 
          family: typo.fontFamily === 'SF Pro' ? 'Inter' : typo.fontFamily, // Fallback SF Pro to Inter as SF Pro might not be available
          style: getFontStyle(typo.fontWeight) 
        };

        try {
          await figma.loadFontAsync(fontName);
          style.fontName = fontName;
          style.fontSize = typo.fontSize;
          style.lineHeight = { value: typo.lineHeight, unit: 'PIXELS' };
          style.letterSpacing = { value: typo.letterSpacing, unit: 'PIXELS' };
        } catch (e) {
          console.warn(`Font not found: ${fontName.family} ${fontName.style}. Using default font.`, e);
          // Fallback to Inter Regular if specifically requested font fails
          const fallbackFont = { family: "Inter", style: "Regular" };
          await figma.loadFontAsync(fallbackFont);
          style.fontName = fallbackFont;
        }
      }

      figma.notify('Design System tokens exported to Figma styles! ✨');
    } catch (error) {
      console.error('Error exporting to Figma:', error);
      figma.notify('Error exporting tokens. Check console for details.', { error: true });
    }
  }
};

// Helper to convert hex to RGB
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

// Helper to map numeric weights to Figma font styles
function getFontStyle(weight: number): string {
  if (weight <= 100) return 'Thin';
  if (weight <= 200) return 'ExtraLight';
  if (weight <= 300) return 'Light';
  if (weight <= 400) return 'Regular';
  if (weight <= 500) return 'Medium';
  if (weight <= 600) return 'SemiBold';
  if (weight <= 700) return 'Bold';
  if (weight <= 800) return 'ExtraBold';
  return 'Black';
}
