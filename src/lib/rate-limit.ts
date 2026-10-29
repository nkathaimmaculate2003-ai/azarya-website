import "server-only";

/**
 * A simple in-memory rate limiter for the contact form.
 *
 * It is a basic first line of defence against repeated submissions. On
 * serverless hosts (such as Vercel) memory is not shared between instances, so
 * for stronger protection add a CAPTCHA such as Cloudflare Turnstile, or a
 * shared store such as Upstash Redis. See the README.
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Prevent unbounded growth.
  if (hits.size > 5000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_REQUESTS;
}
