import test from 'node:test';
import assert from 'node:assert/strict';
import { sendWhatsAppMessage } from '../controllers/whatsappController.js';

const invokeController = async (body) => {
  const req = { body };
  const res = {
    statusCode: 200,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
  await sendWhatsAppMessage(req, res);
  return res;
};

test('normalizes valid international phone numbers before sending', async (context) => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const originalPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  let requestBody;
  let authorizationHeader;

  process.env.WHATSAPP_ACCESS_TOKEN = 'test-secret-token';
  process.env.WHATSAPP_PHONE_NUMBER_ID = 'test-phone-id';
  globalThis.fetch = async (_url, options) => {
    requestBody = JSON.parse(options.body);
    authorizationHeader = options.headers.Authorization;
    return { ok: true, json: async () => ({ messages: [{ id: 'wamid.test' }] }) };
  };
  context.after(() => {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.WHATSAPP_ACCESS_TOKEN;
    else process.env.WHATSAPP_ACCESS_TOKEN = originalToken;
    if (originalPhoneNumberId === undefined) delete process.env.WHATSAPP_PHONE_NUMBER_ID;
    else process.env.WHATSAPP_PHONE_NUMBER_ID = originalPhoneNumberId;
  });

  const res = await invokeController({ phoneNumber: '+1 (855) 905-0875', message: 'Order update' });

  assert.equal(res.statusCode, 200);
  assert.equal(requestBody.to, '18559050875');
  assert.equal(requestBody.text.body, 'Order update');
  assert.equal(authorizationHeader, 'Bearer test-secret-token');
  assert.equal(JSON.stringify(res.payload).includes('test-secret-token'), false);
});

test('rejects malformed phone numbers before contacting WhatsApp', async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => {
    assert.fail('WhatsApp must not be called for an invalid phone number');
  };
  try {
    const res = await invokeController({ phoneNumber: 'not-a-number', message: 'Hello' });
    assert.equal(res.statusCode, 400);
    assert.match(res.payload.error, /valid phone number/i);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test('does not expose provider errors or credentials to the client', async (context) => {
  const originalFetch = globalThis.fetch;
  const originalToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const originalPhoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  process.env.WHATSAPP_ACCESS_TOKEN = 'test-secret-token';
  process.env.WHATSAPP_PHONE_NUMBER_ID = 'test-phone-id';
  globalThis.fetch = async () => ({ ok: false, status: 401 });
  context.after(() => {
    globalThis.fetch = originalFetch;
    if (originalToken === undefined) delete process.env.WHATSAPP_ACCESS_TOKEN;
    else process.env.WHATSAPP_ACCESS_TOKEN = originalToken;
    if (originalPhoneNumberId === undefined) delete process.env.WHATSAPP_PHONE_NUMBER_ID;
    else process.env.WHATSAPP_PHONE_NUMBER_ID = originalPhoneNumberId;
  });

  const res = await invokeController({ phoneNumber: '18559050875', message: 'Hello' });

  assert.equal(res.statusCode, 502);
  assert.equal(res.payload.error, 'WhatsApp could not send the message. Please try again later.');
  assert.equal(JSON.stringify(res.payload).includes('test-secret-token'), false);
});