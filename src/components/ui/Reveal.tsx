"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

import { durations, fadeUp, revealViewport, staggerContainer } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Upward travel in px. */
  distance?: number;
  duration?: number;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/** Fades content in once when it scrolls into view. */
export function Reveal({
  children,
  className,
  distance = 12,
  duration = durations.section,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = m[as];
  const variants = fadeUp(distance, duration, delay);
  return (
    <Component
      data-reveal=""
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={variants}
    >
      {children}
    </Component>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
};

/** Parent that staggers its <RevealItem> children once in view. */
export function RevealGroup({ children, className, stagger = 0.06, delay = 0, as = "div" }: RevealGroupProps) {
  const Component = m[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={revealViewport}
      variants={staggerContainer(stagger, delay)}
    >
      {children}
    </Component>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
  as?: "div" | "li" | "article";
};

export function RevealItem({
  children,
  className,
  distance = 12,
  duration = durations.section,
  as = "div",
}: RevealItemProps) {
  const Component = m[as];
  return (
    <Component data-reveal="" className={className} variants={fadeUp(distance, duration)}>
      {children}
    </Component>
  );
}

type EntranceProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
};

/** Plays a staggered entrance once on mount (used above the fold). */
export function Entrance({ children, className, stagger = 0.09, delay = 0 }: EntranceProps) {
  return (
    <m.div className={className} initial="hidden" animate="visible" variants={staggerContainer(stagger, delay)}>
      {children}
    </m.div>
  );
}

export function EntranceItem({
  children,
  className,
  distance = 16,
  duration = durations.hero,
}: Omit<RevealItemProps, "as">) {
  return (
    <m.div data-reveal="" className={className} variants={fadeUp(distance, duration)}>
      {children}
    </m.div>
  );
}
