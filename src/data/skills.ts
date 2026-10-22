export type SkillIcon = "brain" | "sparkles" | "workflow" | "server" | "database" | "scan";

export type SkillGroup = {
  title: string;
  icon: SkillIcon;
  summary: string;
  skills: string[];
};

/** Technical expertise. Keep this aligned with your resume. */
export const skillGroups: SkillGroup[] = [
  {
    title: "Machine Learning",
    icon: "brain",
    summary: "Modeling fundamentals, from features to rigorous evaluation.",
    skills: ["Python", "PyTorch", "TensorFlow", "scikit-learn", "Model evaluation", "Feature engineering"],
  },
  {
    title: "Generative AI",
    icon: "sparkles",
    summary: "LLM applications grounded in real data and constrained outputs.",
    skills: ["LLMs", "Prompt engineering", "RAG", "CAG", "Structured generation", "Model evaluation"],
  },
  {
    title: "Agentic Systems",
    icon: "workflow",
    summary: "Multi-step agents with explicit control flow and tool use.",
    skills: ["LangChain", "LangGraph", "ReAct", "Orchestration", "Tool calling", "MCP"],
  },
  {
    title: "Backend Engineering",
    icon: "server",
    summary: "API-first services built for correctness and concurrency.",
    skills: ["FastAPI", "REST APIs", "Async Python", "SQL", "API security"],
  },
  {
    title: "Data & Infrastructure",
    icon: "database",
    summary: "Analytical stores, containers, and repeatable delivery.",
    skills: ["PostgreSQL", "ClickHouse", "Docker", "CI/CD", "Azure"],
  },
  {
    title: "Computer Vision",
    icon: "scan",
    summary: "Image understanding that feeds clear, explainable decisions.",
    skills: ["Image processing", "OpenCV", "Image analysis", "Visual decision workflows"],
  },
];
