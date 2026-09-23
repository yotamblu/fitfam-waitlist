"use client";

import { useTransform, type MotionValue } from "framer-motion";

export function useBeat(
  progress: MotionValue<number>,
  index: number,
  total: number,
  yDistance = 32
) {
  const step = 1 / total;
  const start = index * step;
  const end = start + step;
  const eps = step * 0.22;

  const inStart = Math.max(0, start - eps);
  const inEnd = Math.min(1, start + eps);
  const outStart = Math.max(0, end - eps);
  const outEnd = Math.min(1, end + eps);

  // The first beat must render fully visible at rest (progress === 0), and the
  // last must stay visible through progress === 1 — otherwise the page opens
  // blank/drifted until the user nudges the scroll, or the waitlist fades out
  // right as they hit the bottom.
  const isFirst = index === 0;
  const isLast = index === total - 1;

  // Callback-based transforms (rather than the array-keyframe form) force
  // per-frame JS evaluation tied directly to `progress`. The array form can get
  // silently offloaded by the browser into a native scroll-linked animation
  // that free-runs on its own approximated curve and desyncs from real scroll
  // position — which left beat 0 visibly stuck on screen behind later beats.
  const opacity = useTransform(progress, (v) => {
    if (v <= inStart) return isFirst ? 1 : 0;
    if (v < inEnd) return (v - inStart) / (inEnd - inStart);
    if (v <= outStart) return 1;
    if (v < outEnd) return 1 - (v - outStart) / (outEnd - outStart);
    return isLast ? 1 : 0;
  });
  const y = useTransform(progress, (v) => {
    if (v <= inStart) return isFirst ? 0 : yDistance;
    if (v < inEnd) return yDistance * (1 - (v - inStart) / (inEnd - inStart));
    if (v <= outStart) return 0;
    if (v < outEnd) return -yDistance * ((v - outStart) / (outEnd - outStart));
    return isLast ? 0 : -yDistance;
  });
  const pointerEvents = useTransform(progress, (v) =>
    v >= inStart && v <= outEnd ? "auto" : "none"
  );

  return { opacity, y, pointerEvents, start, end };
}
