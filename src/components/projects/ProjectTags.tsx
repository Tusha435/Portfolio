import { cn } from "@/lib/utils";

export function ProjectTags({ tags, className }: { tags: string[]; className?: string }) {
  return (
    <ul aria-label="Technologies" className={cn("flex flex-wrap gap-1.5", className)}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-[6px] border border-line bg-bg-2/60 px-2 py-[3px] font-mono text-[11px] leading-[18px] text-fg-2 transition-colors duration-150 group-hover:border-line-strong"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
