const requestsByKey = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;

export default function whatsappRateLimit(req, res, next) {
  const now = Date.now();
  const key = req.ip || req.socket.remoteAddress || 'unknown';
  let entry = requestsByKey.get(key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    requestsByKey.set(key, entry);
  }

  for (const [entryKey, value] of requestsByKey) {
    if (now >= value.resetAt) requestsByKey.delete(entryKey);
  }

  if (entry.count >= MAX_REQUESTS) {
    res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'Too many messages. Please try again in a minute.' });
  }

  entry.count += 1;
  return next();
}