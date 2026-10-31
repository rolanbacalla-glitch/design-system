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
      <body className="min-h-full bg-[var(--sys-surface-canvas)] text-[var(--sys-on-surface)] font-sans selection:bg-[var(--sys-primary)]/25 selection:text-[var(--sys-on-surface)]">
        {children}
      </body>
    </html>
  );
}
