import type { PortfolioProject } from "@/types/project";

/**
 * Selected Work — the six curated projects shown on the home page.
 *
 * Edit freely: order in this array is the order on the page.
 * Media files live in /public/projects. A missing file renders an
 * elegant placeholder instead of a broken image, so you can add the
 * real asset whenever it is ready.
 */
export const projects: PortfolioProject[] = [
  {
    id: "clearquote-ai-assistant",
    title: "ClearQuote AI Assistant",
    category: "Enterprise Generative AI / Conversational Analytics",
    // Set a status ("Production", "Prototype", …) once you've confirmed it.
    description:
      "An AI-powered analytics assistant that translates natural-language questions into controlled database queries and structured business insights, with context-aware conversations, safeguards, and reporting workflows.",
    tags: ["Python", "FastAPI", "LangChain", "LangGraph", "SQL", "ClickHouse", "Docker", "LLMs"],
    media: {
      type: "video",
      src: "/projects/clearquote-demo.mp4",
      poster: "/projects/clearquote-poster.webp",
      alt: "ClearQuote AI Assistant answering a natural-language analytics question",
    },
    highlights: [
      "LLM orchestration with tool-based agent workflows",
      "Natural language to SQL with query validation",
      "Query safety and scoped, authorized data access",
      "Multi-turn conversation and context management",
      "Structured output for reports and downstream workflows",
    ],
    featured: true,
  },
  {
    id: "revive",
    title: "Revive",
    category: "Computer Vision / Interactive Vehicle Intelligence",
    status: "Prototype",
    description:
      "An interactive vehicle-damage exploration prototype combining 3D visualization, panel-level damage analysis, rule-based repair recommendations, and dynamic before-and-after experiences.",
    tags: ["Computer Vision", "Python", "3D Visualization", "Decision Systems", "Interactive UI"],
    media: {
      type: "gif",
      src: "/projects/revive-demo.gif",
      alt: "Interactive 3D vehicle with highlighted damaged panels",
    },
    highlights: [
      "Visual decision systems for vehicle inspection",
      "Explainable, rule-based repair recommendations",
      "Panel-level damage exploration in an interactive 3D view",
      "Before-and-after repair visualization",
    ],
  },
  {
    id: "codemind-voice",
    title: "CodeMind Voice",
    category: "Developer Tools / Graph Intelligence / Speech Systems",
    status: "Concept",
    description:
      "A proposed voice-driven code intelligence system exploring codebase understanding through static analysis, dependency graphs, graph-based learning, and local speech models — without relying on a frontier LLM.",
    tags: ["PyTorch Geometric", "Python", "AST", "Graph Neural Networks", "STT", "TTS"],
    media: {
      type: "image",
      src: "/projects/codemind-architecture.webp",
      alt: "Architecture diagram of the CodeMind Voice pipeline",
    },
    highlights: [
      "Codebase representation via ASTs and dependency graphs",
      "Graph neural networks for structural code understanding",
      "Fully local speech-to-text and text-to-speech inference",
      "Explainable answers grounded in the code graph",
    ],
  },
  {
    id: "cq-mcp-integration",
    title: "CQ MCP Integration",
    category: "AI Infrastructure / Model Context Protocol",
    // Confirm this matches the project's real stage.
    status: "In Development",
    description:
      "An architecture for exposing authorized enterprise capabilities to compatible AI clients through dynamic tool discovery, scoped authorization, and secure backend integration.",
    tags: ["MCP", "OAuth 2.0", "Python", "FastAPI", "API Security", "Tool Discovery"],
    media: {
      type: "video",
      src: "/projects/mcp-demo.mp4",
      poster: "/projects/mcp-poster.webp",
      alt: "An AI client discovering and calling enterprise tools over MCP",
    },
    highlights: [
      "Dynamic tool discovery for MCP-compatible clients",
      "OAuth 2.0 authentication with scoped authorization",
      "Secure integration with existing backend services",
    ],
  },
  {
    id: "ai-evaluation-observability",
    title: "AI Evaluation & Observability",
    category: "LLM Engineering / Evaluation Systems",
    // Confirm this matches the project's real stage.
    status: "Prototype",
    description:
      "An evaluation and observability workspace for analyzing model outputs, response quality, tool behavior, token usage, and reliability across AI application workflows.",
    tags: ["Python", "LLM Evaluation", "Observability", "Metrics", "Testing", "Analytics"],
    media: {
      type: "gif",
      src: "/projects/evaluation-dashboard.gif",
      alt: "Evaluation dashboard comparing response quality across runs",
    },
    highlights: [
      "Response quality and tool-call behavior analysis",
      "Token usage and latency visibility per workflow",
      "Repeatable evaluation runs for regression testing",
    ],
  },
  {
    id: "featured-project",
    title: "Custom Featured Project",
    category: "Machine Learning / Applied AI",
    description:
      "A fully editable slot for showcasing another meaningful engineering project, model, experiment, or shipped application. Replace this entry in src/data/projects.ts.",
    tags: ["Python", "PyTorch", "Machine Learning", "FastAPI"],
    media: {
      type: "image",
      src: "/projects/project-six.webp",
      alt: "Preview of the featured machine learning project",
    },
  },
];

export function getProject(id: string): PortfolioProject | undefined {
  return projects.find((project) => project.id === id);
}
