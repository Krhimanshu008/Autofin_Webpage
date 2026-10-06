// UTM parameter capture and management
// Reads UTM params from URL and stores them for form submissions

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referrer?: string;
  landing_page?: string;
}

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const UTM_STORAGE_KEY = "krhimanshu_utm";

/**
 * Extract UTM parameters from a URL search string.
 */
export function getUTMFromURL(search: string): UTMParams {
  const params = new URLSearchParams(search);
  const utm: UTMParams = {};

  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) {
      utm[key] = value;
    }
  }

  return utm;
}

/**
 * Store UTM params in sessionStorage (persists through the visit).
 * Only overwrites if new UTM params are present (first-touch within session).
 */
export function storeUTM(utmParams: UTMParams): void {
  if (typeof window === "undefined") return;

  const existing = getStoredUTM();
  // Only store if we have new UTM params and none are stored yet
  if (Object.keys(utmParams).length > 0 && Object.keys(existing).length === 0) {
    sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
  }
}

/**
 * Retrieve stored UTM params from sessionStorage.
 */
export function getStoredUTM(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

/**
 * Get full UTM context for form submissions.
 * Combines stored UTMs with current page info.
 */
export function getUTMContext(): UTMParams {
  if (typeof window === "undefined") return {};

  const stored = getStoredUTM();

  return {
    ...stored,
    referrer: document.referrer || undefined,
    landing_page: window.location.pathname,
  };
}

/**
 * Initialize UTM tracking — call this on app mount.
 * Reads UTM params from URL and stores them.
 */
export function initUTMTracking(): void {
  if (typeof window === "undefined") return;

  const utmParams = getUTMFromURL(window.location.search);
  storeUTM(utmParams);
}
