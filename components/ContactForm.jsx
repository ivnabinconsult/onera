"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // NOTE: this currently just shows a confirmation message.
    // To actually receive these messages, wire this up to an email service
    // (e.g. Resend, Postmark) from an /api/contact route — see README.
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5 font-display">First name</label>
          <input required className="w-full px-3.5 py-3 border border-line rounded-lg text-sm focus:border-blue outline-none" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Last name</label>
          <input required className="w-full px-3.5 py-3 border border-line rounded-lg text-sm focus:border-blue outline-none" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Email</label>
        <input type="email" required className="w-full px-3.5 py-3 border border-line rounded-lg text-sm focus:border-blue outline-none" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Message</label>
        <textarea rows={4} className="w-full px-3.5 py-3 border border-line rounded-lg text-sm focus:border-blue outline-none resize-y" />
      </div>
      <button type="submit" className="px-6 py-3 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition w-fit">
        Send message
      </button>
      {sent && <p className="text-blue text-sm font-semibold">Thanks — we'll be in touch within one business day.</p>}
    </form>
  );
}
