import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectPages = projects
    .filter((project) => !project.caseStudyUrl)
    .map((project) => ({
      url: `${site.url}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }, ...projectPages];
}
