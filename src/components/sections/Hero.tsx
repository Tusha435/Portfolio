import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Entrance, EntranceItem } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { staggers } from "@/lib/motion";

const lifecycle = [
  { step: "intent", detail: "parse & route" },
  { step: "context", detail: "retrieve, scope" },
  { step: "reason", detail: "plan tool calls" },
  { step: "guard", detail: "validate, authorize" },
  { step: "respond", detail: "structured output" },
];

export function Hero({ resumeUrl }: { resumeUrl: string | null }) {
  const { hero } = site;
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_30%_35%,black,transparent_75%)]"
      />
      <div className="container-page relative pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-48 lg:pb-32">
        <Entrance stagger={staggers.hero} className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-12">
            <EntranceItem>
              <p className="eyebrow flex items-center gap-2.5">
                <span aria-hidden="true" className="size-1.5 rounded-full bg-accent" />
                {hero.eyebrow}
              </p>
            </EntranceItem>

            <EntranceItem>
              <h1
                id="hero-title"
                className="mt-7 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg sm:text-[3.75rem] lg:text-[4.5rem] xl:text-[5rem]"
              >
                <span className="block">{hero.headline[0]}</span>
                <span className="block text-fg-muted">{hero.headline[1]}</span>
              </h1>
            </EntranceItem>
          </div>

          <div className="-mt-6 lg:col-span-7">
            <EntranceItem>
              <p className="max-w-[38rem] text-[1.0625rem] leading-[1.7] text-fg-2 sm:text-lg sm:leading-8">
                {hero.description}
              </p>
            </EntranceItem>

            <EntranceItem>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button href="#work" icon={<ArrowRight size={15} />}>
                  Explore My Work
                </Button>
                {resumeUrl ? (
                  <Button
                    href={resumeUrl}
                    variant="secondary"
                    download
                    icon={<ArrowDown size={15} />}
                    iconMotion="down"
                  >
                    Download Resume
                  </Button>
                ) : null}
                <Button
                  href="#contact"
                  variant={resumeUrl ? "ghost" : "secondary"}
                  icon={<ArrowUpRight size={15} />}
                  iconMotion="diagonal"
                >
                  Get in Touch
                </Button>
              </div>
            </EntranceItem>
          </div>

          <EntranceItem className="lg:col-span-4 lg:col-start-9">
            <figure
              aria-label="Illustration: the lifecycle of a request through an AI system"
              className="rounded-[14px] border border-line bg-bg-2/70 font-mono text-[12px] shadow-card backdrop-blur-sm"
            >
              <figcaption className="flex items-center justify-between border-b border-line px-4 py-3 text-fg-muted">
                <span>request.lifecycle</span>
                <span className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-accent-2" />
                  agentic
                </span>
              </figcaption>
              <ol className="space-y-0.5 px-2 py-2.5">
                {lifecycle.map((item, i) => (
                  <li key={item.step} className="grid grid-cols-[2rem_5rem_1fr] items-center rounded-md px-2 py-1.5">
                    <span className="text-fg-muted">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-fg">{item.step}</span>
                    <span className="truncate text-fg-2">
                      <span aria-hidden="true" className="text-fg-muted">
                        →{" "}
                      </span>
                      {item.detail}
                    </span>
                  </li>
                ))}
              </ol>
            </figure>
          </EntranceItem>
        </Entrance>

        <Entrance delay={0.55} className="mt-16 sm:mt-20">
          <EntranceItem distance={0}>
            <ul
              aria-label="Primary technical areas"
              className="flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-line pt-6 font-mono text-xs text-fg-2"
            >
              {hero.focusAreas.map((area, i) => (
                <li key={area} className="flex items-center gap-3">
                  {i > 0 ? (
                    <span aria-hidden="true" className="text-fg-muted">
                      •
                    </span>
                  ) : null}
                  {area}
                </li>
              ))}
            </ul>
          </EntranceItem>
        </Entrance>
      </div>
    </section>
  );
}
