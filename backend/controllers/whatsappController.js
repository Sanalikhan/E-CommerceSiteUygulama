const MAX_MESSAGE_LENGTH = 4096;

export const normalizePhoneNumber = (value) => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!/^\+?[0-9\s().-]+$/.test(trimmed)) return null;

  const digits = trimmed.replace(/\D/g, '');
  return /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
};

const sanitizeMessage = (value) => {
  if (typeof value !== 'string') return null;
  const message = value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim();
  return message.length > 0 && message.length <= MAX_MESSAGE_LENGTH ? message : null;
};

export const sendWhatsAppMessage = async (req, res) => {
  const to = normalizePhoneNumber(req.body?.phoneNumber);
  const message = sanitizeMessage(req.body?.message);

  if (!to) {
    return res.status(400).json({ error: 'Enter a valid phone number with country code.' });
  }
  if (!message) {
    return res.status(400).json({ error: `Message must be between 1 and ${MAX_MESSAGE_LENGTH} characters.` });
  }

  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!accessToken || !phoneNumberId) {
    return res.status(503).json({ error: 'WhatsApp messaging is not configured.' });
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v22.0/${encodeURIComponent(phoneNumberId)}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to,
        type: 'text',
        text: { body: message },
      }),
    });

    if (!response.ok) {
      console.error('WhatsApp Cloud API rejected a message', {
        status: response.status,
      });
      return res.status(502).json({ error: 'WhatsApp could not send the message. Please try again later.' });
    }

    const result = await response.json();
    return res.status(200).json({
      message: 'WhatsApp message sent successfully.',
      messageId: result.messages?.[0]?.id,
    });
  } catch (error) {
    console.error('WhatsApp Cloud API request failed', {
      errorName: error?.name || 'Error',
    });
    return res.status(502).json({ error: 'WhatsApp could not send the message. Please try again later.' });
  }
};