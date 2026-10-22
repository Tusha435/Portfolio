"use client";

import * as m from "motion/react-m";

import type { ApproachStep } from "@/data/experience";
import { EASE_OUT, fadeUp, revealViewport, staggerContainer } from "@/lib/motion";
import { pad } from "@/lib/utils";

const line = {
  hidden: { scaleX: 0, scaleY: 0 },
  visible: { scaleX: 1, scaleY: 1, transition: { duration: 0.9, ease: EASE_OUT } },
};

/** Horizontal on desktop, vertical on mobile. The connecting line draws once. */
export function ApproachTimeline({ steps }: { steps: ApproachStep[] }) {
  return (
    <m.ol
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(0.08, 0.25)}
      className="relative grid gap-10 pl-8 lg:grid-cols-6 lg:gap-6 lg:pt-10 lg:pl-0"
    >
      {/* Vertical line (mobile) */}
      <m.span
        aria-hidden="true"
        variants={line}
        className="absolute top-2 bottom-2 left-[5px] w-px origin-top bg-line-strong lg:hidden"
      />
      {/* Horizontal line (desktop) */}
      <m.span
        aria-hidden="true"
        variants={line}
        className="absolute top-[5px] right-0 left-0 hidden h-px origin-left bg-line-strong lg:block"
      />
      {steps.map((step, i) => (
        <m.li key={step.title} data-reveal="" variants={fadeUp(8, 0.45)} className="relative">
          <span
            aria-hidden="true"
            className="absolute top-1.5 -left-8 size-[11px] rounded-full border border-fg-muted bg-bg lg:-top-10 lg:left-0"
          />
          <p className="font-mono text-[11px] tracking-[0.08em] text-fg-muted">{pad(i + 1)}</p>
          <h3 className="mt-2 text-base font-semibold tracking-[-0.015em] text-fg">{step.title}</h3>
          <p className="mt-2 text-sm leading-6 text-fg-2">{step.description}</p>
        </m.li>
      ))}
    </m.ol>
  );
}
