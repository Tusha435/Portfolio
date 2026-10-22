import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { pad } from "@/lib/utils";

const specializations = [
  { title: "AI-powered applications", detail: "LLM products designed around real user workflows." },
  { title: "Intelligent agent workflows", detail: "Explicit graphs, tool calling and recoverable state." },
  { title: "LLMs × structured data", detail: "Grounding models in enterprise databases, safely." },
  { title: "API-first backend services", detail: "Typed, asynchronous services built to integrate." },
  { title: "Computer vision applications", detail: "Visual analysis feeding explainable decisions." },
  { title: "Evaluation & guardrails", detail: "Deterministic checks and measurable quality." },
  { title: "Deployable AI systems", detail: "Containerized, observable and production-ready." },
];

export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 border-t border-line">
      <div className="container-page grid gap-14 py-24 sm:py-32 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">01</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span>About</span>
          </p>
          <h2
            id="about-title"
            className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-fg sm:text-[2.5rem] lg:text-[2.75rem]"
          >
            {about.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-7 text-fg-2 sm:text-[1.0625rem] sm:leading-8">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow mb-5 lg:mt-1">Focus areas</p>
          <RevealGroup as="ul" stagger={0.05} className="grid gap-px overflow-hidden rounded-[14px] border border-line bg-line sm:grid-cols-2">
            {specializations.map((item, i) => (
              <RevealItem
                as="li"
                key={item.title}
                distance={8}
                className="bg-bg p-5 sm:p-6 sm:last:col-span-2"
              >
                <span className="font-mono text-[11px] text-fg-muted">{pad(i + 1)}</span>
                <h3 className="mt-3 text-[15px] font-medium tracking-[-0.01em] text-fg">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-fg-2">{item.detail}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
