import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.035em] text-fg sm:text-5xl">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-md text-fg-2">The link may be outdated, or the project may have moved.</p>
      <div className="mt-10">
        <Button href="/" variant="secondary" icon={<ArrowLeft size={15} />} iconMotion="none">
          Back home
        </Button>
      </div>
    </section>
  );
}
