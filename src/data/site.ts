/**
 * Central site configuration. Every personal detail and external link
 * lives here — components never hard-code them.
 *
 * Leave a link as an empty string ("") to hide it everywhere it appears.
 */
export const site = {
  /** Your full name. Shown in the navigation, footer, metadata and JSON-LD. */
  name: "Your Name",
  /** Short initials used for the monogram in the navigation. */
  monogram: "ML",
  role: "Machine Learning Engineer",
  /** Production URL, used for canonical links, Open Graph and the sitemap. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",
  /** Optional location, e.g. "Bengaluru, India". Leave empty to hide. */
  location: "",

  seo: {
    title: "Machine Learning Engineer — Generative AI & Intelligent Systems",
    description:
      "Machine Learning Engineer building Generative AI applications, agentic systems, computer vision, and production-ready AI infrastructure.",
    keywords: [
      "Machine Learning Engineer",
      "Generative AI",
      "LLM Engineering",
      "Agentic Systems",
      "LangGraph",
      "Computer Vision",
      "FastAPI",
      "MCP",
    ],
  },

  hero: {
    eyebrow: "Machine Learning Engineer / AI Systems Builder",
    headline: ["Engineering Intelligent Systems.", "From Research to Production."],
    description:
      "I design and build intelligent applications across Generative AI, machine learning, computer vision, and scalable backend systems — turning complex ideas into practical, production-oriented solutions.",
    focusAreas: ["Generative AI", "Machine Learning", "Computer Vision", "AI Infrastructure"],
  },

  about: {
    title: "Building AI That Works Beyond the Demo.",
    paragraphs: [
      "My work focuses on the engineering required to turn machine learning capabilities into useful software. From retrieval systems and AI agents to computer vision applications and production APIs, I care about reliability, explainability, performance, and maintainable architecture.",
      "A model is only one component of an intelligent system. The rest is data access, context, validation, authorization, evaluation and the infrastructure that keeps it all dependable once real users arrive.",
    ],
  },

  contact: {
    title: "Let's Build Something Intelligent.",
    description:
      "I'm interested in challenging problems involving AI systems, machine learning, intelligent applications, and engineering at scale.",
  },

  links: {
    /** e.g. "you@domain.com" */
    email: "",
    /** e.g. "https://www.linkedin.com/in/your-handle" */
    linkedin: "",
    github: "https://github.com/Tusha435",
    /**
     * Path to your resume inside /public. Resume buttons are hidden
     * automatically until this file exists.
     */
    resume: "/resume/resume.pdf",
  },
} as const;

export const navItems = [
  { label: "Work", href: "#work" },
  { label: "Expertise", href: "#expertise" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;
