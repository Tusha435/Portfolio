export type ProjectStatus = "Production" | "Prototype" | "In Development" | "Concept";

/**
 * Media shown in a project card and on its case-study page.
 * `src` and `poster` are paths relative to /public, e.g. "/projects/revive-demo.gif".
 */
export type ProjectMedia =
  | { type: "image"; src: string; alt: string }
  | { type: "gif"; src: string; alt: string }
  | {
      type: "video";
      src: string;
      /** Optional additional source, e.g. a WebM next to an MP4. */
      altSrc?: string;
      poster?: string;
      alt: string;
    };

/** A titled block of case-study content. Every section is optional. */
export type CaseStudySection = {
  title: string;
  /** One or more paragraphs. */
  body?: string[];
  /** Optional bullet list rendered after the paragraphs. */
  points?: string[];
};

export type CaseStudy = {
  overview?: string[];
  problem?: CaseStudySection;
  architecture?: CaseStudySection;
  decisions?: CaseStudySection;
  challenges?: CaseStudySection;
  /** Only include verified results. */
  results?: CaseStudySection;
  lessons?: CaseStudySection;
};

export type PortfolioProject = {
  /** Used as the URL slug: /projects/[id] */
  id: string;
  title: string;
  category: string;
  status?: ProjectStatus;
  description: string;
  tags: string[];
  media: ProjectMedia;
  /** Short, factual focus areas shown on the case-study page. */
  highlights?: string[];
  featured?: boolean;
  /** External case-study URL. When omitted, the card links to /projects/[id]. */
  caseStudyUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  /** Structured long-form content for /projects/[id]. */
  caseStudy?: CaseStudy;
};
