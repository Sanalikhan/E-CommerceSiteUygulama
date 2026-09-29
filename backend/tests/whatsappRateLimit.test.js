import test from 'node:test';
import assert from 'node:assert/strict';
import whatsappRateLimit from '../middleware/whatsappRateLimit.js';

test('allows five requests per IP per minute and rejects the sixth', () => {
  const originalNow = Date.now;
  Date.now = () => 1000;
  const req = { ip: `whatsapp-rate-limit-test-${Math.random()}` };
  const res = {
    headers: {},
    set(name, value) { this.headers[name] = value; return this; },
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
  let nextCalls = 0;

  try {
    for (let requestCount = 0; requestCount < 5; requestCount += 1) {
      whatsappRateLimit(req, res, () => { nextCalls += 1; });
    }
    whatsappRateLimit(req, res, () => { nextCalls += 1; });

    assert.equal(nextCalls, 5);
    assert.equal(res.statusCode, 429);
    assert.equal(res.headers['Retry-After'], '60');
    assert.match(res.payload.error, /too many/i);
  } finally {
    Date.now = originalNow;
  }
});