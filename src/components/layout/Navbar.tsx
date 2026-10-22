"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

import { navItems, site } from "@/data/site";
import { EASE_OUT, durations } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const sectionIds = navItems.map((item) => item.href.slice(1));

export function Navbar({ resumeUrl }: { resumeUrl: string | null }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Compact state after a small scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section: whichever tracked section crosses the middle band of the viewport.
  useEffect(() => {
    if (!isHome) return;
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const close = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Mobile panel: Escape closes, focus moves into the panel on open.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close(true);
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  return (
    <m.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: durations.nav, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4"
    >
      <div
        className={cn(
          "mx-auto max-w-[1200px] rounded-[18px] border backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color,box-shadow] duration-300 ease-out",
          scrolled || open
            ? "border-line-strong bg-[var(--nav-bg)] shadow-[0_8px_24px_-12px_rgb(0_0_0/0.35)]"
            : "border-transparent bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between gap-4 pr-2 pl-4 transition-[height] duration-300 ease-out sm:pl-5",
            scrolled ? "h-[52px]" : "h-[60px]",
          )}
        >
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-md text-sm font-medium tracking-[-0.01em] text-fg"
            aria-label={`${site.name} — home`}
            onClick={() => close()}
          >
            <span
              aria-hidden="true"
              className="flex size-7 items-center justify-center rounded-[8px] border border-line-strong bg-surface font-mono text-[11px] font-medium tracking-tight text-fg transition-colors duration-200 group-hover:border-fg-muted"
            >
              {site.monogram}
            </span>
            <span className="hidden sm:inline">{site.name}</span>
          </Link>

          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={hrefFor(item.href)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative inline-flex h-9 items-center rounded-full px-3.5 text-[13px] transition-colors duration-[180ms]",
                        isActive ? "text-fg" : "text-fg-2 hover:text-fg",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute bottom-1.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-accent transition-opacity duration-200",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </a>
                  </li>
                );
              })}
            </ul>

            <span aria-hidden="true" className="mx-2 hidden h-4 w-px bg-line-strong md:block" />

            {resumeUrl ? (
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group hidden h-9 items-center gap-1.5 rounded-full border border-line-strong px-3.5 text-[13px] text-fg transition-colors duration-[180ms] hover:border-fg-muted hover:bg-surface sm:inline-flex"
              >
                Resume
                <ArrowUpRight
                  size={13}
                  aria-hidden="true"
                  className="text-fg-muted transition-transform duration-[180ms] group-hover:translate-x-px group-hover:-translate-y-px"
                />
              </a>
            ) : null}

            <ThemeToggle />

            <button
              ref={toggleRef}
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-surface md:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <AnimatePresence initial={false}>
          {open ? (
            <m.div
              ref={panelRef}
              id="mobile-nav"
              key="mobile-nav"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: EASE_OUT }}
              className="overflow-hidden md:hidden"
            >
              <ul className="flex flex-col border-t border-line px-2 py-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={hrefFor(item.href)}
                      onClick={() => close()}
                      className={cn(
                        "flex h-12 items-center justify-between rounded-[10px] px-3 text-[15px] transition-colors",
                        active === item.href.slice(1) ? "text-fg" : "text-fg-2 hover:bg-surface hover:text-fg",
                      )}
                    >
                      {item.label}
                      <span aria-hidden="true" className="font-mono text-[11px] text-fg-muted">
                        {item.href.slice(1)}
                      </span>
                    </a>
                  </li>
                ))}
                {resumeUrl ? (
                  <li>
                    <a
                      href={resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => close()}
                      className="flex h-12 items-center justify-between rounded-[10px] px-3 text-[15px] text-fg-2 transition-colors hover:bg-surface hover:text-fg"
                    >
                      Resume
                      <ArrowUpRight size={14} aria-hidden="true" className="text-fg-muted" />
                    </a>
                  </li>
                ) : null}
              </ul>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </m.header>
  );
}
