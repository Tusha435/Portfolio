import Link from "next/link";
import type { ReactNode } from "react";

import { cn, isExternal } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "group/btn inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-[-0.005em] whitespace-nowrap transition-[background-color,border-color,color,transform] duration-[180ms] ease-out active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/88",
  secondary: "border border-line-strong bg-surface/40 text-fg hover:border-fg-muted hover:bg-surface",
  ghost: "text-fg-2 hover:text-fg",
};

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: ReactNode;
  /** Icon nudges on hover. "diagonal" for external, "right" for forward, "down" for downloads. */
  iconMotion?: "right" | "diagonal" | "down" | "none";
  download?: boolean;
  className?: string;
  ariaLabel?: string;
};

const iconMotions = {
  right: "group-hover/btn:translate-x-0.5",
  diagonal: "group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5",
  down: "group-hover/btn:translate-y-0.5",
  none: "",
} as const;

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  iconMotion = "right",
  download,
  className,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className={cn("inline-flex transition-transform duration-[180ms] ease-out", iconMotions[iconMotion])}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (isExternal(href) || download) {
    const newTab = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        download={download || undefined}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
