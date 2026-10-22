import "server-only";

import fs from "node:fs";
import path from "node:path";

import { site } from "@/data/site";
import type { PortfolioProject, ProjectMedia } from "@/types/project";

const publicDir = path.join(process.cwd(), "public");

/**
 * Checks whether a /public asset exists. Runs on the server at build time,
 * so missing media never produces a broken request in the browser.
 */
export function publicFileExists(src: string | undefined): boolean {
  if (!src || /^https?:\/\//.test(src)) return Boolean(src);
  const resolved = path.join(publicDir, src);
  if (!resolved.startsWith(publicDir)) return false;
  try {
    return fs.statSync(resolved).isFile();
  } catch {
    return false;
  }
}

/** Media as rendered by the client, with missing files removed. */
export type ResolvedMedia = ProjectMedia & { available: boolean };

export function resolveMedia(media: ProjectMedia): ResolvedMedia {
  if (media.type === "video") {
    const altSrc = publicFileExists(media.altSrc) ? media.altSrc : undefined;
    const poster = publicFileExists(media.poster) ? media.poster : undefined;
    const available = publicFileExists(media.src) || Boolean(altSrc);
    return { ...media, altSrc, poster, available };
  }
  return { ...media, available: publicFileExists(media.src) };
}

export type ResolvedProject = Omit<PortfolioProject, "media"> & { media: ResolvedMedia };

export function resolveProject(project: PortfolioProject): ResolvedProject {
  return { ...project, media: resolveMedia(project.media) };
}

/** The resume URL, or null when the file has not been added yet. */
export function getResumeUrl(): string | null {
  const resume = site.links.resume;
  return resume && publicFileExists(resume) ? resume : null;
}
