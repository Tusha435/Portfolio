"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (insecure context); fall back to selecting via prompt.
      window.prompt("Copy email address", email);
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group inline-flex h-11 items-center gap-2 rounded-full px-4 font-mono text-[13px] text-fg-2 transition-colors duration-[180ms] hover:bg-surface hover:text-fg"
    >
      {copied ? <Check size={14} aria-hidden="true" className="text-accent" /> : <Copy size={14} aria-hidden="true" />}
      <span>{email}</span>
      <span className="sr-only">{copied ? "" : "— copy to clipboard"}</span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied to clipboard" : ""}
      </span>
    </button>
  );
}
