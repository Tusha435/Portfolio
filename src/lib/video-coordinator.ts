/**
 * Ensures at most one project video plays at a time.
 *
 * Each preview registers itself. Autoplay is only granted when no other
 * video is playing; a manual play always takes over. When the playing
 * video stops, the next visible candidate is offered the slot.
 */
type Candidate = {
  video: HTMLVideoElement;
  /** Whether this preview is currently eligible to autoplay. */
  canAutoplay: () => boolean;
  autoplay: () => void;
};

const candidates = new Set<Candidate>();
let current: HTMLVideoElement | null = null;

export function register(candidate: Candidate): () => void {
  candidates.add(candidate);
  return () => {
    candidates.delete(candidate);
    if (current === candidate.video) release(candidate.video);
  };
}

/** Claim playback for `video`, pausing whichever video held it. */
export function claim(video: HTMLVideoElement): void {
  if (current && current !== video && !current.paused) current.pause();
  current = video;
}

/** Whether `video` may start automatically right now. */
export function isSlotFree(video: HTMLVideoElement): boolean {
  return current === null || current === video || current.paused;
}

/** Called when `video` pauses or ends; offers the slot to another visible preview. */
export function release(video: HTMLVideoElement): void {
  if (current !== video) return;
  current = null;
  for (const candidate of candidates) {
    if (candidate.video !== video && candidate.canAutoplay()) {
      candidate.autoplay();
      return;
    }
  }
}
