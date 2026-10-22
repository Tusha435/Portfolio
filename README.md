# AI / Machine Learning Engineer Portfolio

A curated personal portfolio built with Next.js (App Router), React, TypeScript, Tailwind CSS v4 and Motion.

- Dark-first with a light theme (follows the system setting, remembers your choice, no flash on load)
- Six curated project cards with image, animated GIF or video previews
- Case-study pages at `/projects/[slug]`
- Static output: every page is prerendered at build time
- SEO: metadata, Open Graph/Twitter images, sitemap, robots, JSON-LD `Person`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Quality checks:

```bash
npm run lint       # ESLint (next/core-web-vitals + typescript)
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm start          # serve the production build
```

Requires Node.js 20.9 or newer.

## Where content lives

All content is in `src/data`. You don't need to touch any JSX to edit it.

| File | Contents |
| --- | --- |
| `src/data/site.ts` | Name, monogram, role, hero copy, about copy, contact copy, links (email, LinkedIn, GitHub, resume), SEO text |
| `src/data/projects.ts` | The six Selected Work projects |
| `src/data/skills.ts` | Technical expertise groups |
| `src/data/experience.ts` | Professional experience, engineering-approach steps and principles |
| `src/types/project.ts` | The project schema (`PortfolioProject`, `ProjectMedia`, `CaseStudy`) |

**Fill these in first:** `name` and `monogram` in `site.ts`, plus `links.email` and `links.linkedin`. Empty links are hidden everywhere, so nothing broken is ever shown. Set `NEXT_PUBLIC_SITE_URL` (or `site.url`) to your production domain so canonical URLs, the sitemap and OG tags are correct.

**Resume:** put your PDF at `public/resume/resume.pdf`. The Resume / Download Resume buttons appear automatically once the file exists. To use a different filename, change `links.resume`.

## Managing projects

Each project in `src/data/projects.ts` looks like this:

```ts
{
  id: "revive",                       // URL slug → /projects/revive
  title: "Revive",
  category: "Computer Vision / Interactive Vehicle Intelligence",
  status: "Prototype",                // "Production" | "Prototype" | "In Development" | "Concept" (optional)
  description: "…",
  tags: ["Computer Vision", "Python"],
  media: { type: "gif", src: "/projects/revive-demo.gif", alt: "…" },
  highlights: ["…"],                  // optional, shown on the case-study page
  demoUrl: "https://…",               // optional
  githubUrl: "https://github.com/…",  // optional
  caseStudyUrl: "https://…",          // optional: external write-up instead of /projects/[id]
  caseStudy: { … },                   // optional structured long-form content
}
```

Media files go in `public/projects/`. **If a file is missing, the card shows a quiet schematic placeholder instead of a broken image.** In development, the placeholder also shows the path it expects.

1. **Replace a project image:** add e.g. `public/projects/codemind-architecture.webp`, then set `media: { type: "image", src: "/projects/codemind-architecture.webp", alt: "…" }`. PNG, JPG and WebP all work. Images are resized and lazy-loaded with `next/image`. A 16:10 ratio (e.g. 1600×1000) fits the card frame exactly; other ratios are cropped to fill the frame without distortion.
2. **Add a GIF:** `media: { type: "gif", src: "/projects/revive-demo.gif", alt: "…" }`. GIFs are served unmodified, so they keep animating. Large GIFs are heavy; converting to video is usually 5–10× smaller:
   ```bash
   ffmpeg -i demo.gif -movflags +faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" demo.mp4
   ```
3. **Add an MP4 (or WebM) preview:**
   ```ts
   media: {
     type: "video",
     src: "/projects/clearquote-demo.mp4",
     altSrc: "/projects/clearquote-demo.webm", // optional, tried first
     poster: "/projects/clearquote-poster.webp", // recommended
     alt: "…",
   }
   ```
   Keep previews short (5–15 s), silent and compressed. For example:
   ```bash
   ffmpeg -i raw.mov -an -vf "scale=1600:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart clearquote-demo.mp4
   ffmpeg -i raw.mov -an -vf "scale=1600:-2" -c:v libvpx-vp9 -b:v 0 -crf 36 clearquote-demo.webm
   ffmpeg -ss 1 -i clearquote-demo.mp4 -frames:v 1 clearquote-poster.webp
   ```
4. **Edit a description:** change `description`.
5. **Change tags:** edit the `tags` array.
6. **Reorder projects:** reorder the array. Numbering (01–06) follows array order.
7. **Add or remove a project:** add or delete an entry. The grid adapts to any number, though six is the intended layout.
8. **Change status:** set `status`, or remove it to hide the badge.
9. **Add an external demo link:** set `demoUrl` (and/or `githubUrl`).
10. **Add a case study:** fill in `caseStudy`. Every section is optional and only rendered if present:
    ```ts
    caseStudy: {
      overview: ["Paragraph…"],
      problem: { title: "…", body: ["…"] },
      architecture: { title: "…", body: ["…"], points: ["…"] },
      decisions: { title: "…", points: ["…"] },
      challenges: { title: "…", body: ["…"] },
      results: { title: "…", points: ["Only verified results"] },
      lessons: { title: "…", body: ["…"] },
    }
    ```
    To link to a write-up hosted elsewhere, set `caseStudyUrl`. The card then links there and no local page is generated.

Media files are detected at **build time**, so rebuild (or restart `npm run dev`) after adding files.

## Video behavior

- Video files aren't requested until the card is about 400px from the viewport (`preload="none"` before that).
- A video autoplays muted and inline when at least 60% of it is visible. It pauses when it scrolls away.
- Only one project video plays at a time. Pressing play on another one takes over, and pausing hands playback back to the other visible video.
- Every video has an accessible play/pause button. A manual pause is respected and auto-resume stops.
- With `prefers-reduced-motion: reduce`, nothing autoplays; the poster shows until the visitor presses play.
- If the browser can't play any source, the poster is shown (or the placeholder if there is no poster).

## Motion system

Shared easing and timings are defined in `src/lib/motion.ts`, and the reveal helpers are in `src/components/ui/Reveal.tsx`.

| Interaction | Implementation |
| --- | --- |
| Navigation entrance | 450 ms fade + 8 px drop, runs once; becomes more compact after scrolling |
| Hero entrance | eyebrow → headline → description → CTAs, 90 ms stagger, 600 ms, 16 px |
| Section reveal | 500 ms fade + 12 px, once |
| Project card reveal | 500 ms fade + 16 px, 70 ms offset between adjacent cards, once |
| Card hover | −3 px lift, stronger border, soft shadow (220 ms) |
| Media hover | scale 1 → 1.025 (450 ms), clipped to the rounded frame |
| Title arrow | 2 px diagonal shift, accent color |
| Buttons | 180 ms contrast change + small icon nudge |
| Approach timeline | connecting line draws once, labels fade in |
| Theme switch | 220 ms color cross-fade |

Reduced motion: `MotionConfig reducedMotion="user"` removes transforms, CSS transitions collapse, and smooth scrolling is turned off. If JavaScript never runs, a `<noscript>` rule keeps all content visible.

## Project structure

```
src/
  app/                  layout, page, globals.css, sitemap, robots, OG image, /projects/[slug]
  components/
    layout/             Navbar, Footer
    sections/           Hero, About, SelectedWork, Expertise, EngineeringApproach, Experience, Contact
    projects/           ProjectCard, ProjectGrid, ProjectMedia, MediaPlaceholder, ProjectTags, ProjectStatus, ProjectCaseStudy
    ui/                 Button, SectionHeading, Reveal, ThemeToggle, CopyEmail, BrandIcons, MotionProvider
  data/                 site, projects, skills, experience
  lib/                  motion, assets (build-time file checks), video-coordinator, seo, theme, utils
  types/                project
public/
  projects/             project media
  resume/               resume.pdf
```

Client JavaScript is limited to the navigation, theme toggle, reveal animations, video previews and copy-email. Everything else is a Server Component.

## Deployment

**Vercel (recommended):** import the repository, set `NEXT_PUBLIC_SITE_URL=https://your-domain.com`, and deploy. No other configuration is needed.

**Any Node host:**

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://your-domain.com npm run build
npm start   # PORT=3000 by default
```

Optimized images need the Next.js server (or Vercel), so a pure static export would require `images.unoptimized`.
