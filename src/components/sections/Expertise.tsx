import { Brain, Database, ScanEye, Server, Sparkles, Workflow, type LucideIcon } from "lucide-react";

import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups, type SkillIcon } from "@/data/skills";
import { pad } from "@/lib/utils";

const icons: Record<SkillIcon, LucideIcon> = {
  brain: Brain,
  sparkles: Sparkles,
  workflow: Workflow,
  server: Server,
  database: Database,
  scan: ScanEye,
};

export function Expertise() {
  return (
    <section id="expertise" aria-labelledby="expertise-title" className="scroll-mt-24 border-t border-line bg-bg-2/40">
      <div className="container-page py-24 sm:py-32">
        <SectionHeading
          id="expertise-title"
          index="03"
          label="Expertise"
          title="Engineering Across the AI Stack."
          description="From model development to the services, data and infrastructure that make models useful — the capabilities I bring to intelligent systems."
        />

        <RevealGroup
          as="ul"
          stagger={0.05}
          className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:mt-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, i) => {
            const Icon = icons[group.icon];
            return (
              <RevealItem
                as="li"
                key={group.title}
                distance={0}
                className="flex flex-col bg-bg p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="flex size-9 items-center justify-center rounded-[10px] border border-line bg-surface text-fg-2">
                    <Icon size={17} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-[11px] text-fg-muted">{pad(i + 1)}</span>
                </div>
                <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em] text-fg">{group.title}</h3>
                <p className="mt-2 text-sm leading-6 text-fg-2">{group.summary}</p>
                <ul aria-label={`${group.title} skills`} className="mt-6 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-[6px] border border-line px-2 py-[3px] font-mono text-[11px] leading-[18px] text-fg-2 transition-colors duration-150 hover:border-line-strong hover:bg-surface hover:text-fg"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
