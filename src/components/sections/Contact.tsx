import { ArrowDown, Mail } from "lucide-react";

import { GitHubIcon, LinkedInIcon } from "@/components/ui/BrandIcons";
import { Button } from "@/components/ui/Button";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/data/site";

export function Contact({ resumeUrl }: { resumeUrl: string | null }) {
  const { contact, links } = site;
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative scroll-mt-24 overflow-hidden border-t border-line">
      <div
        aria-hidden="true"
        className="bg-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_90%_90%_at_70%_110%,black,transparent_70%)]"
      />
      <div className="container-page relative py-28 sm:py-36">
        <Reveal className="max-w-4xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-accent">06</span>
            <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
            <span>Contact</span>
          </p>
          <h2
            id="contact-title"
            className="mt-6 text-[2.5rem] leading-[1.02] font-semibold tracking-[-0.045em] text-fg sm:text-[3.75rem] lg:text-[4.5rem]"
          >
            {contact.title}
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-7 text-fg-2 sm:text-lg sm:leading-8">{contact.description}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 flex flex-wrap items-center gap-3">
          {links.email ? (
            <Button href={`mailto:${links.email}`} icon={<Mail size={15} />} iconMotion="none">
              Email Me
            </Button>
          ) : null}
          {links.linkedin ? (
            <Button
              href={links.linkedin}
              variant="secondary"
              icon={<LinkedInIcon size={14} />}
              iconMotion="none"
              ariaLabel="LinkedIn profile (opens in a new tab)"
            >
              LinkedIn
            </Button>
          ) : null}
          {links.github ? (
            <Button
              href={links.github}
              variant={links.email ? "secondary" : "primary"}
              icon={<GitHubIcon size={14} />}
              iconMotion="none"
              ariaLabel="GitHub profile (opens in a new tab)"
            >
              GitHub
            </Button>
          ) : null}
          {resumeUrl ? (
            <Button href={resumeUrl} variant="ghost" download icon={<ArrowDown size={15} />} iconMotion="down">
              Download Resume
            </Button>
          ) : null}
        </Reveal>

        {links.email ? (
          <Reveal delay={0.14} className="mt-6 -ml-4">
            <CopyEmail email={links.email} />
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
