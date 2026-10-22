import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, description, id, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        <span>{label}</span>
      </p>
      <h2
        id={id}
        className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-fg sm:text-[2.5rem] lg:text-[3rem]"
      >
        {title}
      </h2>
      {description ? <p className="mt-5 max-w-2xl text-base leading-7 text-fg-2 sm:text-lg sm:leading-8">{description}</p> : null}
    </Reveal>
  );
}
