import type { Transition, Variants } from "motion/react";

/** Shared easing: a soft ease-out with no overshoot. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export const durations = {
  nav: 0.45,
  hero: 0.6,
  section: 0.5,
  card: 0.5,
} as const;

export const staggers = {
  hero: 0.09,
  card: 0.07,
  list: 0.05,
} as const;

export function transition(duration: number, delay = 0): Transition {
  return { duration, delay, ease: EASE_OUT };
}

/** Fade + small upward movement. `distance` is in px. */
export function fadeUp(distance = 12, duration: number = durations.section, delay = 0): Variants {
  return {
    hidden: { opacity: 0, y: distance },
    visible: { opacity: 1, y: 0, transition: transition(duration, delay) },
  };
}

export const fade: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition(durations.section) },
};

export function staggerContainer(stagger: number, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
  };
}

/** Shared viewport config: reveal once, slightly before fully in view. */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;
