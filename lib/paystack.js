// Thin wrapper around Paystack's REST API using fetch (no SDK needed).
const PAYSTACK_BASE = "https://api.paystack.co";

export async function paystackInitializeTransaction({ email, amountKobo, plan, cycle, metadata }) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amountKobo, // Paystack expects the smallest currency unit (kobo)
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?paystack=success`,
      metadata: { plan, cycle, ...metadata },
    }),
  });
  return res.json();
}

export async function paystackVerifyTransaction(reference) {
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  return res.json();
}

// Affordable naira pricing for Paystack checkout. Update these as your pricing evolves.
export const PAYSTACK_PLAN_AMOUNTS_KOBO = {
  "starter-monthly": 450000,  // ₦4,500
  "starter-annual": 4500000,  // ₦45,000 (2 months free)
  "growth-monthly": 900000,   // ₦9,000
  "growth-annual": 9000000,   // ₦90,000 (2 months free)
};
