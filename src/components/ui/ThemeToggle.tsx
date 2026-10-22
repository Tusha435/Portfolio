"use client";

import { Moon, Sun } from "lucide-react";

import { THEME_STORAGE_KEY } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      root.classList.add("theme-transition");
      window.setTimeout(() => root.classList.remove("theme-transition"), 260);
    }
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage may be unavailable (private mode); the theme still applies.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full text-fg-2 transition-colors duration-[180ms] hover:bg-surface hover:text-fg",
        className,
      )}
    >
      <Sun size={16} strokeWidth={1.75} aria-hidden="true" className="only-dark" />
      <Moon size={16} strokeWidth={1.75} aria-hidden="true" className="only-light" />
      <span className="sr-only only-dark">Switch to light theme</span>
      <span className="sr-only only-light">Switch to dark theme</span>
    </button>
  );
}
