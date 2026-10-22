import { ImageIcon, Play } from "lucide-react";

import type { ProjectMedia } from "@/types/project";

/** Small deterministic PRNG so each project gets a stable, unique composition. */
function seededRandom(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number };

function buildGraph(seed: string) {
  const random = seededRandom(seed);
  const width = 400;
  const height = 250;
  const columns = 5;
  const nodes: Node[] = [];
  // One or two nodes per column keeps the layout balanced and left-to-right, like a pipeline.
  for (let c = 0; c < columns; c++) {
    const count = c === 0 || c === columns - 1 ? 1 : 1 + Math.round(random());
    for (let k = 0; k < count; k++) {
      const x = 60 + (c * (width - 120)) / (columns - 1) + (random() - 0.5) * 18;
      const band = (height - 100) / count;
      const y = 50 + band * k + band / 2 + (random() - 0.5) * band * 0.5;
      nodes.push({ x: Math.round(x), y: Math.round(y) });
    }
  }
  const edges: Array<[Node, Node]> = [];
  for (const a of nodes) {
    const next = nodes
      .filter((b) => b.x > a.x + 20)
      .sort((p, q) => Math.hypot(p.x - a.x, p.y - a.y) - Math.hypot(q.x - a.x, q.y - a.y))
      .slice(0, 2);
    for (const b of next) edges.push([a, b]);
  }
  const accent = 1 + Math.floor(random() * (nodes.length - 2));
  return { nodes, edges, accent, width, height };
}

type MediaPlaceholderProps = {
  seed: string;
  label: string;
  media: ProjectMedia;
};

/**
 * Shown when a project's media file has not been added yet (or fails to load).
 * A quiet, pipeline-like schematic rather than a broken image.
 */
export function MediaPlaceholder({ seed, label, media }: MediaPlaceholderProps) {
  const { nodes, edges, accent, width, height } = buildGraph(seed);
  const Icon = media.type === "video" ? Play : ImageIcon;
  const showPath = process.env.NODE_ENV !== "production";

  return (
    <div role="img" aria-label={`${label} — preview coming soon`} className="absolute inset-0 bg-bg-2">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
      />
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        className="absolute inset-0 size-full"
      >
        {edges.map(([a, b], i) => (
          <path
            key={i}
            d={`M ${a.x} ${a.y} C ${(a.x + b.x) / 2} ${a.y}, ${(a.x + b.x) / 2} ${b.y}, ${b.x} ${b.y}`}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
        ))}
        {nodes.map((node, i) => (
          <g key={i}>
            {i === accent ? <circle cx={node.x} cy={node.y} r="10" fill="var(--accent-soft)" /> : null}
            <circle
              cx={node.x}
              cy={node.y}
              r={i === accent ? 4 : 3.5}
              fill={i === accent ? "var(--accent)" : "var(--bg-2)"}
              stroke={i === accent ? "none" : "var(--fg-muted)"}
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 font-mono text-[11px] text-fg-muted">
        <span className="flex items-center gap-2">
          <Icon size={12} aria-hidden="true" />
          Preview coming soon
        </span>
        {showPath ? <span className="truncate opacity-70">{media.src}</span> : null}
      </div>
    </div>
  );
}
