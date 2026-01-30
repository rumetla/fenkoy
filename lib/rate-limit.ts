/**
 * Basit in-memory rate limiting (MVP).
 * Production'da Redis veya benzeri kullanılabilir.
 */
const store = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_MAX = 3;
const WINDOW_MS = 60_000;

export function checkRateLimit(identifier: string): { ok: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: RATE_LIMIT_MAX - 1 };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return { ok: false, remaining: 0 };
  }

  entry.count += 1;
  return { ok: true, remaining: RATE_LIMIT_MAX - entry.count };
}

export function getClientIdentifier(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (realIp) return realIp;
  return "unknown";
}
