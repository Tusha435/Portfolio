import { site } from "@/data/site";

/** JSON-LD Person schema built only from configured, verified details. */
export function personJsonLd() {
  const sameAs = [site.links.github, site.links.linkedin].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    ...(site.links.email ? { email: `mailto:${site.links.email}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
    knowsAbout: ["Machine Learning", "Generative AI", "Agentic Systems", "Computer Vision", "Backend Engineering"],
  };
}
