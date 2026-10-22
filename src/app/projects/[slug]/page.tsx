import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";
import { projects } from "@/data/projects";
import { resolveProject } from "@/lib/assets";

type Params = { slug: string };

const internalProjects = projects.filter((project) => !project.caseStudyUrl);

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return internalProjects.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.id === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: project.title,
      description: project.description,
      url: `/projects/${project.id}`,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.id === slug);
  const project = projects[index];
  if (!project || project.caseStudyUrl) notFound();

  const position = internalProjects.findIndex((item) => item.id === slug);
  const nextProject = internalProjects[(position + 1) % internalProjects.length];
  const next =
    nextProject && nextProject.id !== project.id
      ? { id: nextProject.id, title: nextProject.title, category: nextProject.category }
      : null;

  return <ProjectCaseStudy project={resolveProject(project)} index={index} next={next} />;
}
