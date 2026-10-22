import type { ProjectStatus as Status } from "@/types/project";
import { cn } from "@/lib/utils";

const dot: Record<Status, string> = {
  Production: "bg-[#6fcf97]",
  Prototype: "bg-accent",
  "In Development": "bg-accent-2",
  Concept: "bg-fg-muted",
};

export function ProjectStatus({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px] leading-none tracking-wide text-fg-2 uppercase",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[status])} />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}
