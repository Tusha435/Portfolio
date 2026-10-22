export type ExperienceEntry = {
  role: string;
  company: string;
  companyUrl?: string;
  /** e.g. "2024 — Present". Omitted dates are simply not shown. */
  period?: string;
  location?: string;
  summary: string;
  responsibilities: string[];
  stack?: string[];
};

/** Professional experience, most recent first. */
export const experience: ExperienceEntry[] = [
  {
    role: "Machine Learning Engineer",
    company: "ClearQuote",
    summary:
      "Developing AI-powered analytics applications and backend systems, with a focus on conversational AI, intelligent workflows, reliable data access, and scalable service architecture.",
    responsibilities: [
      "Design LLM-powered applications for natural-language analytics.",
      "Implement tool-based orchestration and structured output workflows.",
      "Develop FastAPI backend services and enterprise data integrations.",
      "Build guardrails for safe, authorized data retrieval.",
      "Work on context management and evaluation strategies.",
      "Support containerized deployments and production reliability.",
      "Explore MCP integrations for AI client interoperability.",
    ],
    stack: ["Python", "FastAPI", "LangGraph", "ClickHouse", "Docker", "MCP"],
  },
];

export type ApproachStep = {
  title: string;
  description: string;
};

/** Engineering approach timeline. */
export const approachSteps: ApproachStep[] = [
  {
    title: "Problem Definition",
    description: "Frame the decision the system supports, its users, constraints and what failure costs.",
  },
  {
    title: "Data & Context",
    description: "Establish data quality, access boundaries and the context a model actually needs.",
  },
  {
    title: "Model / Agent Design",
    description: "Choose the simplest model or agent graph that works, with explicit tools and control flow.",
  },
  {
    title: "Evaluation",
    description: "Measure outputs against curated cases and deterministic checks before shipping.",
  },
  {
    title: "Deployment",
    description: "Package as versioned, containerized services with secure, authorized interfaces.",
  },
  {
    title: "Monitoring",
    description: "Trace quality, latency, cost and tool behavior in production — then iterate.",
  },
];

export const approachPrinciples: string[] = [
  "Data quality",
  "Context management",
  "Guardrails",
  "Authorization",
  "Deterministic validation",
  "Latency optimization",
  "Evaluation",
  "Deployment readiness",
  "Observability",
];
