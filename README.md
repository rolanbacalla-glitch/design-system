# Design System Token Builder

An interactive tool to build and visualize a design system inspired by Google's Material Design. Define and customize color palettes, typography scales, spacing, and elevation tokens with smart suggestions powered by AI.

This project is a hybrid application that works as both a **Web Application** and a **Figma Plugin**.

## Features

- **Color Palette:** Generate and customize primary, secondary, and tertiary colors with accessibility checks.
- **Typography Scale:** Define a consistent typography scale with SF Pro as the primary font.
- **Spacing & Elevation:** Manage spacing tokens and elevation styles (shadows).
- **Figma Integration:** Export your design system directly to Figma as variables and styles.
- **AI Suggestions:** Get smart design suggestions for your tokens.

## Getting Started

### Web Application

To run the web application locally:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Start the development server:
    ```bash
    npm run dev
    ```

### Environment Variables

This project uses Google Gemini AI for smart design suggestions. To enable this feature, you need to provide a Gemini API key:

1.  Create a `.env` file in the root directory.
2.  Add your API key:
    ```env
    GEMINI_API_KEY=your_api_key_here
    ```

If the API key is not provided, the application will fall back to mock suggestions.

3.  Build for production:
    ```bash
    npm run build
    ```

### Figma Plugin

To use this as a Figma plugin:

1.  Build the plugin code:
    ```bash
    npm run build:plugin
    ```
2.  In Figma, go to **Plugins > Development > Import plugin from manifest...**
3.  Select the `manifest.json` file in the root of this project.

## Project Structure

- `App.tsx`: Main application component.
- `components/`: Reusable UI components for the design system builder.
- `plugin/`: Contains the Figma plugin logic (`code.ts`).
- `index.html`: Entry point for the web UI.
- `manifest.json`: Figma plugin manifest.

## Technologies Used

- **React 19**
- **Vite**
- **Tailwind CSS 4**
- **Lucide React** (Icons)
- **Figma Plugin API**
- **Google Gemini AI** (for suggestions)
