/**
 * Monetag Advertising & Revenue Optimization Engine for ViewVerse
 *
 * Implements high-CPM, user-friendly frequency capping:
 * - 2-minute cooldown between popunders to maximize unique advertiser CPM
 * - Maximum 3 popunders per user session (further clicks are free & ad-free)
 * - Navigation tabs (Home, Movies, TV Shows, Anime, Search) are strictly ad-exempt
 */

export const MONETAG_DIRECT_LINK = "https://hai8g.com/4/12338691";
const LAST_POPUNDER_KEY = "vv_monetag_last_pop";
const POPUNDER_COUNT_KEY = "vv_monetag_pop_count";

// 2-minute cooldown: maximizes CPM per impression and ensures users are never irritated
const COOLDOWN_MS = 120 * 1000; 
// Max 3 popunders per visit: after 3 high-value impressions, user gets completely uninterrupted streaming
const MAX_SESSION_POPS = 3;

/**
 * Triggers Monetag direct link popunder in a background tab if cooldown and session limits permit.
 * Never interrupts or prevents the user's primary navigation.
 */
export function triggerMonetagPopunder(force: boolean = false): boolean {
  if (typeof window === "undefined") return false;

  const now = Date.now();
  let lastPop = 0;
  let popCount = 0;

  try {
    const storedLast = sessionStorage.getItem(LAST_POPUNDER_KEY);
    if (storedLast) lastPop = Number(storedLast);

    const storedCount = sessionStorage.getItem(POPUNDER_COUNT_KEY);
    if (storedCount) popCount = Number(storedCount);
  } catch {
    lastPop = 0;
    popCount = 0;
  }

  // 1. Session cap: do not spam users after 3 impressions (ad networks pay negligible CPM after 3)
  if (!force && popCount >= MAX_SESSION_POPS) {
    return false;
  }

  // 2. Cooldown check: ensures advertiser receives high-engagement unique visits for max CPM
  if (!force && now - lastPop < COOLDOWN_MS) {
    return false;
  }

  try {
    sessionStorage.setItem(LAST_POPUNDER_KEY, String(now));
    sessionStorage.setItem(POPUNDER_COUNT_KEY, String(popCount + 1));

    // Open direct link smoothly in a new tab without blocking the active page
    window.open(MONETAG_DIRECT_LINK, "_blank", "noopener,noreferrer");
    return true;
  } catch (err) {
    // Suppressed by browser popup blocker or privacy mode
    return false;
  }
}
