/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Antigravity Design System — Perceptual & Spatial Workbench (v2.4)",
  description:
    "A three-tier OKLCH token architecture, tonal surface hierarchy, and optical Liquid Glass design system workbench bridging Figma, Google Stitch, Google Antigravity, Cursor, and Next.js 16.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className="dark h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-full bg-[var(--sys-surface-canvas)] text-[var(--sys-on-surface)] font-sans selection:bg-[var(--sys-primary)]/25 selection:text-[var(--sys-on-surface)]">
        {children}
      </body>
    </html>
  );
}
