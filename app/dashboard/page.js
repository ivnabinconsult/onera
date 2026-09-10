"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // If redirected back from Paystack, verify the transaction as a backup to the webhook.
      const reference = searchParams.get("reference") || searchParams.get("trxref");
      if (reference) {
        await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });
      }

      const { data } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setSubscription(data);
      setLoading(false);
    }
    load();
  }, [searchParams]);

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-navy mb-1">Welcome back</h1>
      <p className="text-slate mb-8">Here's an overview of your On3ra workspace.</p>

      <div className="bg-white border border-line rounded-xl p-6 max-w-lg">
        <h2 className="font-display font-semibold text-navy mb-4">Subscription</h2>
        {loading ? (
          <p className="text-slate text-sm">Loading…</p>
        ) : subscription ? (
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between"><span className="text-slate">Plan</span><span className="font-semibold text-navy capitalize">{subscription.plan}</span></div>
            <div className="flex justify-between"><span className="text-slate">Billing</span><span className="font-semibold text-navy capitalize">{subscription.billing_cycle}</span></div>
            <div className="flex justify-between"><span className="text-slate">Status</span><span className="font-semibold text-navy capitalize">{subscription.status}</span></div>
            <div className="flex justify-between"><span className="text-slate">Payment provider</span><span className="font-semibold text-navy capitalize">{subscription.provider}</span></div>
          </div>
        ) : (
          <div>
            <p className="text-slate text-sm mb-4">You're on the 14-day free trial — no active subscription yet.</p>
            <a href="/pricing" className="inline-block px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition">
              Choose a plan
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
