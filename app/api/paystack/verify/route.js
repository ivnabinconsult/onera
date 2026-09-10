import { NextResponse } from "next/server";
import { paystackVerifyTransaction } from "@/lib/paystack";
import { createClient as createServiceClient } from "@supabase/supabase-js";

const supabaseAdmin = createServiceClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Called from the dashboard after a user is redirected back from Paystack,
// as a backup to the webhook (in case the webhook hasn't fired yet).
export async function POST(request) {
  const { reference } = await request.json();
  const result = await paystackVerifyTransaction(reference);

  if (result.data?.status === "success") {
    const { plan, cycle, user_id } = result.data.metadata;
    await supabaseAdmin.from("subscriptions").upsert({
      user_id,
      provider: "paystack",
      provider_customer_id: String(result.data.customer.id),
      provider_subscription_id: result.data.reference,
      plan,
      billing_cycle: cycle,
      status: "active",
      updated_at: new Date().toISOString(),
    });
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ success: false }, { status: 400 });
}
