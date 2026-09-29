import { useState } from 'react';

const supportNumber = (import.meta.env.VITE_WHATSAPP_NUMBER || '18559050875').replace(/\D/g, '');
const message = encodeURIComponent('Hello, I would like help with your products and services.');
const whatsappUrl = `https://wa.me/${supportNumber}?text=${message}`;

export default function WhatsAppButton() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const sendWhatsAppMessage = async (event) => {
    event.preventDefault();
    const trimmedPhoneNumber = phoneNumber.trim();
    const phoneDigits = trimmedPhoneNumber.replace(/\D/g, '');
    if (!/^\+?[0-9\s().-]+$/.test(trimmedPhoneNumber) || !/^[1-9]\d{7,14}$/.test(phoneDigits)) {
      setFeedback({ type: 'error', text: 'Enter a valid phone number with country code.' });
      return;
    }
    if (!messageText.trim()) {
      setFeedback({ type: 'error', text: 'Enter a message before sending.' });
      return;
    }

    setIsSending(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: trimmedPhoneNumber, message: messageText.trim() }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Unable to send the WhatsApp message.');
      }

      setFeedback({ type: 'success', text: result.message || 'WhatsApp message sent.' });
      setMessageText('');
    } catch (error) {
      setFeedback({ type: 'error', text: error.message || 'Unable to send the WhatsApp message.' });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      {isFormOpen && (
        <section className="absolute bottom-16 right-0 w-[min(22rem,calc(100vw-2.5rem))] rounded-lg border border-gray-200 bg-white p-4 text-gray-900 shadow-xl" aria-label="Send a WhatsApp message">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold">Send a WhatsApp message</h2>
            <button type="button" onClick={() => setIsFormOpen(false)} aria-label="Close message form" className="rounded p-1 text-xl leading-none text-gray-500 hover:bg-gray-100">×</button>
          </div>
          <form onSubmit={sendWhatsAppMessage} className="space-y-3">
            <label className="block text-sm font-medium">
              Your phone number
              <input
                type="tel"
                autoComplete="tel"
                required
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
                placeholder="+1 555 123 4567"
                className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-normal focus:border-[#128C7E] focus:outline-none"
              />
            </label>
            <label className="block text-sm font-medium">
              Message
              <textarea
                required
                maxLength={4096}
                rows={3}
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                className="mt-1 w-full resize-y rounded border border-gray-300 px-3 py-2 font-normal focus:border-[#128C7E] focus:outline-none"
              />
            </label>
            {feedback && (
              <p role="status" aria-live="polite" className={`text-sm ${feedback.type === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {feedback.text}
              </p>
            )}
            <button
              type="submit"
              disabled={isSending}
              className="w-full rounded bg-[#128C7E] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e7468] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setIsFormOpen((open) => !open)}
        aria-expanded={isFormOpen}
        aria-label="Send a WhatsApp message"
        title="Send a WhatsApp message"
        className="inline-flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[#128C7E] text-white shadow-lg transition-colors hover:bg-[#0e7468] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </svg>
      </button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat with us on WhatsApp"
        className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#25D366] px-4 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#1DA851] focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-[#128C7E]"
      >
        <svg aria-hidden="true" viewBox="0 0 32 32" className="h-6 w-6 fill-current">
          <path d="M16.04 2.004A13.94 13.94 0 0 0 4.1 23.15L2.25 29.9l6.9-1.81a13.95 13.95 0 1 0 6.89-26.086Zm0 25.37c-2.05 0-4.06-.55-5.82-1.59l-.42-.25-4.1 1.08 1.1-4-.27-.43a11.4 11.4 0 1 1 9.51 5.19Zm6.26-8.54c-.34-.17-2-1-2.3-1.1-.31-.11-.53-.17-.75.17-.23.34-.87 1.1-1.06 1.33-.2.22-.39.25-.73.08-.34-.17-1.44-.53-2.75-1.7-1.02-.9-1.71-2.02-1.91-2.36-.2-.34-.02-.52.15-.69.15-.15.34-.39.51-.59.17-.2.23-.34.34-.56.12-.23.06-.43-.03-.6-.08-.17-.75-1.81-1.03-2.48-.27-.65-.55-.56-.75-.57h-.64c-.23 0-.6.08-.91.42-.31.34-1.2 1.17-1.2 2.85 0 1.68 1.23 3.3 1.4 3.52.17.23 2.42 3.7 5.86 5.19.82.35 1.46.57 1.96.73.82.26 1.56.22 2.14.13.66-.1 2-.82 2.28-1.62.28-.8.28-1.48.2-1.62-.09-.14-.31-.23-.65-.4Z" />
        </svg>
        <span>Chat with us</span>
      </a>
    </div>
  );
}