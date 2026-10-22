import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { approachPrinciples, approachSteps } from "@/data/experience";
import { ApproachTimeline } from "./ApproachTimeline";

export function EngineeringApproach() {
  return (
    <section id="approach" aria-labelledby="approach-title" className="scroll-mt-24 border-t border-line">
      <div className="container-page py-24 sm:py-32">
        <SectionHeading
          id="approach-title"
          index="04"
          label="Approach"
          title="From Intelligence to Reliable Systems."
          description="Engineering AI is not only about calling model APIs. A useful system is defined as much by its data, constraints and feedback loops as by the model at its center."
        />

        <div className="mt-16 sm:mt-20">
          <ApproachTimeline steps={approachSteps} />
        </div>

        <Reveal className="mt-20 grid gap-8 rounded-[20px] border border-line bg-bg-2/50 p-6 sm:p-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-4">
            <p className="eyebrow">Beyond the model call</p>
            <p className="mt-3 text-[15px] leading-7 text-fg-2">
              What it takes for an intelligent feature to be trusted in production.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2 lg:col-span-8">
            {approachPrinciples.map((principle) => (
              <li
                key={principle}
                className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-[13px] text-fg transition-colors duration-150 hover:border-line-strong"
              >
                {principle}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
