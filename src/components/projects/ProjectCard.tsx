import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GitHubIcon } from "@/components/ui/BrandIcons";
import type { ResolvedProject } from "@/lib/assets";
import { pad } from "@/lib/utils";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectTags } from "./ProjectTags";

export function projectHref(project: Pick<ResolvedProject, "id" | "caseStudyUrl">): string {
  return project.caseStudyUrl ?? `/projects/${project.id}`;
}

const secondaryLink =
  "group/link relative z-10 inline-flex items-center gap-1.5 rounded-md text-[13px] text-fg-2 transition-colors duration-[180ms] hover:text-fg";

export function ProjectCard({ project, index }: { project: ResolvedProject; index: number }) {
  const href = projectHref(project);
  const external = href.startsWith("http");
  const titleId = `project-${project.id}-title`;

  return (
    <article
      aria-labelledby={titleId}
      className="group relative flex h-full flex-col rounded-[20px] border border-line bg-surface/40 p-2 shadow-card transition-[transform,border-color,box-shadow,background-color] duration-[220ms] ease-out hover:-translate-y-[3px] hover:border-line-strong hover:bg-surface/70 hover:shadow-card-hover motion-reduce:hover:translate-y-0"
    >
      {/* Sits above the stretched title link but lets clicks through, except on media controls. */}
      <div className="pointer-events-none relative z-[2] aspect-[16/10] overflow-hidden rounded-[14px] border border-line bg-bg-2">
        <div className="absolute inset-0 transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.025] motion-reduce:group-hover:scale-100">
          <ProjectMedia media={project.media} seed={project.id} title={project.title} />
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3 pt-6 pb-4 sm:px-5 sm:pt-7 sm:pb-5">
        <div className="flex items-start justify-between gap-4">
          <p className="font-mono text-[11px] leading-5 tracking-[0.08em] text-fg-muted uppercase">
            <span className="text-fg-2">{pad(index + 1)}</span>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            {project.category}
          </p>
          {project.status ? <ProjectStatus status={project.status} /> : null}
        </div>

        <h3
          id={titleId}
          className="mt-4 text-[1.375rem] leading-tight font-semibold tracking-[-0.025em] text-fg sm:text-2xl"
        >
          <Link
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="transition-colors duration-[220ms] outline-none group-hover:text-accent after:absolute after:inset-0 after:rounded-[20px] after:content-[''] focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-accent"
          >
            {project.title}
            <ArrowUpRight
              size={18}
              aria-hidden="true"
              className="ml-1.5 inline-block align-[-0.08em] text-fg-muted transition-[transform,color] duration-[220ms] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </Link>
        </h3>

        <p className="mt-3 text-[15px] leading-7 text-fg-2">{project.description}</p>

        <ProjectTags tags={project.tags} className="mt-6" />

        <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-2 pt-6">
          <span className="font-mono text-[11px] tracking-[0.08em] text-fg-muted uppercase">
            {external ? "Case study ↗" : "Read case study"}
          </span>
          {project.demoUrl ? (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={secondaryLink}>
              Live demo
              <ArrowUpRight
                size={13}
                aria-hidden="true"
                className="transition-transform duration-[180ms] group-hover/link:translate-x-px group-hover/link:-translate-y-px"
              />
            </a>
          ) : null}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={secondaryLink}
              aria-label={`${project.title} source on GitHub`}
            >
              <GitHubIcon size={13} />
              Source
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
