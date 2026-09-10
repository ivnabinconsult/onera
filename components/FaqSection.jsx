"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to buy each module separately?",
    a: "No. Every On3ra plan includes all four modules — Projects, Content, Analytics, and Sites — from the Starter tier up.",
  },
  {
    q: "Can I pay in naira?",
    a: "Yes. Checkout runs through Paystack, so you can pay in naira with your local card, bank transfer, or USSD. International cards are also accepted.",
  },
  {
    q: "Is there a free trial?",
    a: "Every plan starts with a 14-day free trial, full access, no card required to sign up.",
  },
  {
    q: "What happens to my site if I cancel?",
    a: "You can export your website content and project data at any time. Published sites stay live for 30 days after cancellation.",
  },
  {
    q: "Do you offer discounts for annual billing?",
    a: "Yes — paying annually gives you 2 months free compared to paying monthly.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-16">
      <div className="max-w-2xl mx-auto px-8">
        {faqs.map((item, i) => (
          <div key={item.q} className="border-b border-line py-5">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center text-left font-display font-semibold text-[17px] text-navy"
            >
              <span>{item.q}</span>
              <span className={`text-blue text-xl ml-4 flex-shrink-0 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            {open === i && <p className="text-slate text-[15px] pt-3">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
