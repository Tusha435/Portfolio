"use client";

import { useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { ResolvedMedia } from "@/lib/assets";
import { cn } from "@/lib/utils";
import { claim, isSlotFree, register, release } from "@/lib/video-coordinator";
import { MediaPlaceholder } from "./MediaPlaceholder";

type ProjectMediaProps = {
  media: ResolvedMedia;
  seed: string;
  title: string;
  /** Load eagerly (e.g. above the fold on a case-study page). */
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Renders a project's image, animated GIF or video inside a fixed-ratio
 * frame. The parent decides the aspect ratio; this fills it.
 */
export function ProjectMedia({
  media,
  seed,
  title,
  priority = false,
  sizes = "(min-width: 1200px) 560px, (min-width: 900px) 46vw, 100vw",
  className,
}: ProjectMediaProps) {
  const [failed, setFailed] = useState(false);

  // Unsupported or broken video: fall back to its poster when one exists.
  if (failed && media.type === "video" && media.poster) {
    return (
      <Image src={media.poster} alt={media.alt} fill sizes={sizes} className={cn("object-cover", className)} />
    );
  }

  if (!media.available || failed) {
    return <MediaPlaceholder seed={seed} label={title} media={media} />;
  }

  if (media.type === "video") {
    return <VideoPreview media={media} title={title} className={className} onFail={() => setFailed(true)} />;
  }

  return (
    <Image
      src={media.src}
      alt={media.alt}
      fill
      sizes={sizes}
      priority={priority}
      // Animated GIFs are served untouched so their animation is preserved.
      unoptimized={media.type === "gif"}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}

type VideoMedia = Extract<ResolvedMedia, { type: "video" }>;

function sourceType(src: string): string | undefined {
  if (src.endsWith(".mp4")) return "video/mp4";
  if (src.endsWith(".webm")) return "video/webm";
  if (src.endsWith(".mov")) return "video/quicktime";
  return undefined;
}

/**
 * Muted inline video preview.
 * - Sources attach only when the card nears the viewport (no upfront download).
 * - Autoplays when ≥60% visible, unless the user prefers reduced motion or paused it.
 * - Pauses off-screen; only one project video plays at a time.
 */
function VideoPreview({
  media,
  title,
  className,
  onFail,
}: {
  media: VideoMedia;
  title: string;
  className?: string;
  onFail: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [playing, setPlaying] = useState(false);
  const prefersReduced = useReducedMotion();

  const visible = useRef(false);
  const userPaused = useRef(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = Boolean(prefersReduced);
    if (prefersReduced && videoRef.current && !videoRef.current.paused && !userPaused.current) {
      videoRef.current.pause();
    }
  }, [prefersReduced]);

  const canAutoplay = useCallback(
    () => visible.current && !userPaused.current && !reduced.current,
    [],
  );

  const autoplay = useCallback(() => {
    const video = videoRef.current;
    if (!video || !canAutoplay() || !isSlotFree(video)) return;
    claim(video);
    video.play().catch(() => {
      // Autoplay can be blocked (e.g. low-power mode); the poster remains and the button still works.
      release(video);
    });
  }, [canAutoplay]);

  // Attach sources shortly before the video scrolls into view.
  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldLoad) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    if (shouldLoad) {
      videoRef.current?.load();
      autoplay();
    }
  }, [shouldLoad, autoplay]);

  // Play when sufficiently visible, pause when it leaves.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const unregister = register({ video, canAutoplay, autoplay });
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        visible.current = entry.intersectionRatio >= 0.6;
        if (visible.current) autoplay();
        else if (!video.paused) video.pause();
      },
      { threshold: [0, 0.6] },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      unregister();
      video.pause();
    };
  }, [autoplay, canAutoplay]);

  function toggle() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      if (!shouldLoad) setShouldLoad(true);
      claim(video);
      video.play().catch(() => release(video));
    } else {
      userPaused.current = true;
      video.pause();
    }
  }

  return (
    <>
      <video
        ref={videoRef}
        className={cn("absolute inset-0 size-full object-cover", className)}
        poster={media.poster}
        preload={shouldLoad ? "metadata" : "none"}
        muted
        loop
        playsInline
        disablePictureInPicture
        aria-label={media.alt}
        onPlay={() => setPlaying(true)}
        onPause={() => {
          setPlaying(false);
          if (videoRef.current) release(videoRef.current);
        }}
      >
        {shouldLoad && media.altSrc ? <source src={media.altSrc} type={sourceType(media.altSrc)} /> : null}
        {shouldLoad ? <source src={media.src} type={sourceType(media.src)} onError={onFail} /> : null}
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={`${playing ? "Pause" : "Play"} ${title} preview`}
        className="pointer-events-auto absolute right-3 bottom-3 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white backdrop-blur-md transition-[background-color,opacity] duration-200 hover:bg-black/75"
      >
        {playing ? (
          <Pause size={14} aria-hidden="true" fill="currentColor" />
        ) : (
          <Play size={14} aria-hidden="true" fill="currentColor" className="translate-x-px" />
        )}
      </button>
    </>
  );
}
