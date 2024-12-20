const idToRequestCount = new Map<string, number>();
const rateLimiter = {
  windowStart: Date.now(),
  windowSize: 5 * 60 * 1000,
  maxRequests: 5,
};

const limit = (ip: string): boolean => {
  const now = Date.now();
  const isNewWindow = now - rateLimiter.windowStart > rateLimiter.windowSize;

  if (isNewWindow) {
    rateLimiter.windowStart = now;
    idToRequestCount.clear();
  }

  const currentRequestCount = idToRequestCount.get(ip) ?? 0;
  if (currentRequestCount >= rateLimiter.maxRequests) return true;

  idToRequestCount.set(ip, currentRequestCount + 1);
  return false;
};

export default limit;
