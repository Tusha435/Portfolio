import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { GitHubIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { ResolvedProject } from "@/lib/assets";
import { pad } from "@/lib/utils";
import type { CaseStudySection } from "@/types/project";
import { ProjectMedia } from "./ProjectMedia";
import { ProjectStatus } from "./ProjectStatus";
import { ProjectTags } from "./ProjectTags";

type ProjectCaseStudyProps = {
  project: ResolvedProject;
  index: number;
  next: { id: string; title: string; category: string } | null;
};

function Section({ section, label }: { section: CaseStudySection; label: string }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="eyebrow">{label}</p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-fg">{section.title}</h2>
      </div>
      <div className="space-y-5 text-base leading-8 text-fg-2 lg:col-span-8">
        {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.points?.length ? (
          <ul className="space-y-3">
            {section.points.map((point) => (
              <li key={point} className="flex gap-3">
                <span aria-hidden="true" className="mt-[15px] h-px w-3 shrink-0 bg-fg-muted" />
                {point}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </Reveal>
  );
}

const sectionLabels = {
  problem: "Problem",
  architecture: "Architecture",
  decisions: "Engineering decisions",
  challenges: "Challenges",
  results: "Results",
  lessons: "Lessons learned",
} as const;

export function ProjectCaseStudy({ project, index, next }: ProjectCaseStudyProps) {
  const study = project.caseStudy;
  const sections = (Object.keys(sectionLabels) as Array<keyof typeof sectionLabels>)
    .map((key) => ({ key, section: study?.[key] }))
    .filter((entry): entry is { key: keyof typeof sectionLabels; section: CaseStudySection } => Boolean(entry.section));

  return (
    <article className="container-page pt-32 pb-24 sm:pt-40">
      <Reveal>
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 rounded-md text-sm text-fg-2 transition-colors hover:text-fg"
        >
          <ArrowLeft size={15} aria-hidden="true" className="transition-transform duration-[180ms] group-hover:-translate-x-0.5" />
          All work
        </Link>
      </Reveal>

      <header className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-8">
          <div className="flex flex-wrap items-center gap-4">
            <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted uppercase">
              <span className="text-fg-2">{pad(index + 1)}</span>
              <span aria-hidden="true" className="mx-2">
                /
              </span>
              {project.category}
            </p>
            {project.status ? <ProjectStatus status={project.status} /> : null}
          </div>
          <h1 className="mt-6 text-[2.5rem] leading-[1.04] font-semibold tracking-[-0.04em] text-fg sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-2">{project.description}</p>
        </Reveal>
        <Reveal delay={0.08} className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
          {project.demoUrl ? (
            <Button href={project.demoUrl} icon={<ArrowUpRight size={15} />} iconMotion="diagonal">
              Live demo
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button href={project.githubUrl} variant="secondary" icon={<GitHubIcon size={14} />} iconMotion="none">
              Source
            </Button>
          ) : null}
        </Reveal>
      </header>

      <Reveal delay={0.12} distance={16} className="mt-14">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[20px] border border-line bg-bg-2 sm:aspect-[16/9]">
          <ProjectMedia
            media={project.media}
            seed={project.id}
            title={project.title}
            priority
            sizes="(min-width: 1200px) 1120px, 100vw"
          />
        </div>
      </Reveal>

      <div className="mt-16">
        <Reveal as="section" className="grid gap-6 py-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-fg">Technology stack</h2>
          </div>
          <div className="lg:col-span-8">
            {study?.overview?.length ? (
              <div className="mb-8 space-y-5 text-base leading-8 text-fg-2">
                {study.overview.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ) : null}
            <ProjectTags tags={project.tags} />
          </div>
        </Reveal>

        {project.highlights?.length ? (
          <Reveal as="section" className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="eyebrow">Focus</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-fg">Engineering focus</h2>
            </div>
            <ul className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2 lg:col-span-8">
              {project.highlights.map((highlight, i) => (
                <li key={highlight} className="bg-bg p-5">
                  <span className="font-mono text-[11px] text-fg-muted">{pad(i + 1)}</span>
                  <p className="mt-2 text-[15px] leading-6 text-fg">{highlight}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {sections.map(({ key, section }) => (
          <Section key={key} section={section} label={sectionLabels[key]} />
        ))}

        {sections.length === 0 ? (
          <Reveal className="border-t border-line py-12">
            <p className="font-mono text-xs text-fg-muted">A detailed write-up of this project is in progress.</p>
          </Reveal>
        ) : null}
      </div>

      {next ? (
        <Reveal className="mt-8 border-t border-line pt-12">
          <Link
            href={`/projects/${next.id}`}
            className="group flex flex-col gap-3 rounded-[20px] border border-line p-6 transition-[border-color,background-color] duration-[220ms] hover:border-line-strong hover:bg-surface/50 sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div>
              <p className="eyebrow">Next project</p>
              <p className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-fg">{next.title}</p>
              <p className="mt-1 text-sm text-fg-2">{next.category}</p>
            </div>
            <ArrowRight
              size={20}
              aria-hidden="true"
              className="text-fg-muted transition-transform duration-[220ms] group-hover:translate-x-1 group-hover:text-fg"
            />
          </Link>
        </Reveal>
      ) : null}
    </article>
  );
}
