import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COMPONENT_REGISTRY,
  COMPONENT_SLUGS,
  type ComponentSlug,
} from "@/lib/component-registry";
import { ComponentPortalClient } from "@/components/portal/component-portal-client";

export function generateStaticParams() {
  return COMPONENT_SLUGS.map((componentName) => ({
    componentName,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ componentName: string }>;
}): Promise<Metadata> {
  const { componentName } = await params;
  const spec = COMPONENT_REGISTRY[componentName as ComponentSlug];
  if (!spec) {
    return {
      title: "Component Not Found — Antigravity Design System",
    };
  }
  return {
    title: `${spec.name} (${spec.slug}) — Antigravity Design System v2.4`,
    description: spec.tagline,
  };
}

export default async function ComponentPortalPage({
  params,
}: {
  params: Promise<{ componentName: string }>;
}) {
  const { componentName } = await params;
  const isKnown = COMPONENT_SLUGS.includes(componentName as ComponentSlug);
  if (!isKnown) {
    notFound();
  }

  return <ComponentPortalClient initialSlug={componentName as ComponentSlug} />;
}
