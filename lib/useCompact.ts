"use client";

import { useSyncExternalStore } from "react";

// Shared "small or coarse-pointer device" signal. Using matchMedia instead of
// only the width also catches phones in landscape, where `width < 768` is
// false even though the screen is still small.
const COMPACT_QUERY =
  "(max-width: 767px), ((pointer: coarse) and (max-width: 1024px))";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mql = window.matchMedia(COMPACT_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

const getSnapshot = () =>
  typeof window !== "undefined" && window.matchMedia(COMPACT_QUERY).matches;

const getServerSnapshot = () => false;

export function useIsCompact() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
