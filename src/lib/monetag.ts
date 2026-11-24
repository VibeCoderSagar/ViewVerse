/**
 * Monetag Advertising Utility for ViewVerse
 * Handles optimized popunder / direct-link triggers with frequency capping.
 */

export const MONETAG_DIRECT_LINK = "https://hai8g.com/4/12338691";
const LAST_POPUNDER_KEY = "vv_monetag_last_pop";
const COOLDOWN_MS = 45 * 1000; // 45 seconds cooldown between popunders for high CPM & happy users

/**
 * Triggers Monetag direct-link popunder in a background tab if cooldown has passed.
 * Does not block primary application navigation.
 */
export function triggerMonetagPopunder(force: boolean = false): boolean {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  let lastPop = 0;

  try {
    const stored = sessionStorage.getItem(LAST_POPUNDER_KEY);
    if (stored) lastPop = Number(stored);
  } catch {
    lastPop = 0;
  }

  // If within cooldown and not forced, don't spam the user
  if (!force && now - lastPop < COOLDOWN_MS) {
    return false;
  }

  try {
    sessionStorage.setItem(LAST_POPUNDER_KEY, String(now));
    window.open(MONETAG_DIRECT_LINK, "_blank", "noopener,noreferrer");
    return true;
  } catch (err) {
    // Popup blockers or privacy mode
    return false;
  }
}
