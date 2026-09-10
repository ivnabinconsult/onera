import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Paystack calls this URL directly. We verify the signature so nobody can fake a payment.
export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature");

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const { plan, cycle, user_id } = event.data.metadata;
    await supabaseAdmin.from("subscriptions").upsert({
      user_id,
      provider: "paystack",
      provider_customer_id: String(event.data.customer.id),
      provider_subscription_id: event.data.reference,
      plan,
      billing_cycle: cycle,
      status: "active",
      updated_at: new Date().toISOString(),
    });
  }

  return NextResponse.json({ received: true });
}
