"use client";

import { useEffect } from "react";
import { initUTMTracking } from "@/lib/utm";

/**
 * Initializes UTM tracking on mount.
 * Place this component once in the root layout.
 */
export function UTMTracker() {
  useEffect(() => {
    initUTMTracking();
  }, []);

  return null;
}
