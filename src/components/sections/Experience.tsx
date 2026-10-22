import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 border-t border-line bg-bg-2/40">
      <div className="container-page py-24 sm:py-32">
        <SectionHeading
          id="experience-title"
          index="05"
          label="Experience"
          title="Professional Experience"
          description="Where I apply these ideas day to day."
        />

        <ol className="mt-14 sm:mt-16">
          {experience.map((entry) => (
            <Reveal
              as="li"
              key={`${entry.company}-${entry.role}`}
              className="grid gap-8 border-t border-line py-10 first:border-t-0 first:pt-0 lg:grid-cols-12 lg:gap-10"
            >
              <div className="lg:col-span-4">
                <h3 className="text-xl font-semibold tracking-[-0.02em] text-fg">{entry.role}</h3>
                <p className="mt-1.5 text-[15px] text-fg-2">
                  {entry.companyUrl ? (
                    <a
                      href={entry.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 hover:text-fg"
                    >
                      {entry.company}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ) : (
                    entry.company
                  )}
                </p>
                {entry.period || entry.location ? (
                  <p className="mt-4 font-mono text-xs text-fg-muted">
                    {[entry.period, entry.location].filter(Boolean).join(" · ")}
                  </p>
                ) : null}
                {entry.stack?.length ? (
                  <ul aria-label="Primary stack" className="mt-6 flex flex-wrap gap-1.5">
                    {entry.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-[6px] border border-line px-2 py-[3px] font-mono text-[11px] leading-[18px] text-fg-2"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="lg:col-span-8">
                <p className="text-base leading-7 text-fg sm:text-[1.0625rem] sm:leading-8">{entry.summary}</p>
                <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
                  {entry.responsibilities.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-7 text-fg-2">
                      <span aria-hidden="true" className="mt-[13px] h-px w-3 shrink-0 bg-fg-muted" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
