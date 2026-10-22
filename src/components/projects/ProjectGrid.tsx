import { Reveal } from "@/components/ui/Reveal";
import type { ResolvedProject } from "@/lib/assets";
import { durations, staggers } from "@/lib/motion";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: ResolvedProject[] }) {
  return (
    <ul className="grid gap-5 min-[900px]:grid-cols-2 lg:gap-6">
      {projects.map((project, index) => (
        <Reveal
          as="li"
          key={project.id}
          distance={16}
          duration={durations.card}
          // Adjacent cards in a row stagger slightly.
          delay={(index % 2) * staggers.card}
          className="h-full"
        >
          <ProjectCard project={project} index={index} />
        </Reveal>
      ))}
    </ul>
  );
}
