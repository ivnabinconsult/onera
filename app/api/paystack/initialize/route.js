import { NextResponse } from "next/server";
import { paystackInitializeTransaction, PAYSTACK_PLAN_AMOUNTS_KOBO } from "@/lib/paystack";
import { createClient } from "@/lib/supabase/server";

// Called from the pricing page when a signed-in user picks "Pay with Paystack".
export async function POST(request) {
  const { plan, cycle } = await request.json();
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }

  const amountKobo = PAYSTACK_PLAN_AMOUNTS_KOBO[`${plan}-${cycle}`];
  if (!amountKobo) {
    return NextResponse.json({ error: "Unknown plan" }, { status: 400 });
  }

  const result = await paystackInitializeTransaction({
    email: user.email,
    amountKobo,
    plan,
    cycle,
    metadata: { user_id: user.id },
  });

  if (!result.status) {
    return NextResponse.json({ error: result.message || "Paystack error" }, { status: 400 });
  }

  return NextResponse.json({ url: result.data.authorization_url });
}
