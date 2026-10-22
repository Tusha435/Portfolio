import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Experience } from "@/components/sections/Experience";
import { Expertise } from "@/components/sections/Expertise";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { getResumeUrl } from "@/lib/assets";

export default function HomePage() {
  const resumeUrl = getResumeUrl();
  return (
    <>
      <Hero resumeUrl={resumeUrl} />
      <About />
      <SelectedWork />
      <Expertise />
      <EngineeringApproach />
      <Experience />
      <Contact resumeUrl={resumeUrl} />
    </>
  );
}
