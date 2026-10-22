import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { resolveProject } from "@/lib/assets";

export function SelectedWork() {
  const resolved = projects.map(resolveProject);
  return (
    <section id="work" aria-labelledby="work-title" className="scroll-mt-24 border-t border-line">
      <div className="container-page py-24 sm:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="work-title"
            index="02"
            label="Selected Work"
            title="Selected Work"
            description="A collection of intelligent systems, AI experiments, and engineering projects exploring how machine learning can solve real-world problems."
          />
          <p className="shrink-0 font-mono text-xs text-fg-muted lg:pb-2">
            {String(resolved.length).padStart(2, "0")} projects
          </p>
        </div>
        <div className="mt-14 sm:mt-16">
          <ProjectGrid projects={resolved} />
        </div>
      </div>
    </section>
  );
}
