"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const plans = [
  {
    id: "starter",
    name: "Starter",
    who: "For solo founders and small teams",
    monthly: 9,
    annual: 90,
    features: ["Up to 5 users", "Projects, content & analytics", "1 published website", "Email support"],
  },
  {
    id: "growth",
    name: "Growth",
    who: "For teams ready to scale",
    monthly: 19,
    annual: 190,
    highlight: true,
    features: ["Up to 25 users", "All modules, unlimited projects", "5 published websites", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    who: "For larger organizations",
    monthly: null,
    annual: null,
    features: ["Unlimited users", "SSO & advanced permissions", "Dedicated account manager", "Custom SLA"],
  },
];

export default function PricingSection() {
  const [cycle, setCycle] = useState("monthly");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const router = useRouter();

  async function handleChoosePlan(planId) {
    if (planId === "enterprise") {
      window.location.href = "/contact";
      return;
    }

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push(`/signup?plan=${planId}&cycle=${cycle}`);
      return;
    }

    setLoadingPlan(planId);
    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: planId, cycle }),
    });
    const data = await res.json();
    setLoadingPlan(null);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert(data.error || "Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      <div className="flex justify-center mb-14">
        <div className="inline-flex items-center bg-white border border-line rounded-full p-1">
          <button
            onClick={() => setCycle("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${cycle === "monthly" ? "bg-blue text-white" : "text-slate"}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setCycle("annual")}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition ${cycle === "annual" ? "bg-blue text-white" : "text-slate"}`}
          >
            Annual, 2 months free
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch max-w-5xl mx-auto">
        {plans.map((plan) => {
          const price = plan[cycle];
          const dark = plan.highlight;
          return (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 flex flex-col ${
                dark
                  ? "bg-navy text-white md:-translate-y-3 shadow-[0_30px_60px_-20px_rgba(15,42,74,0.5)]"
                  : plan.id === "enterprise"
                  ? "bg-white border border-dashed border-line"
                  : "bg-white border border-line"
              }`}
            >
              <h3 className={`text-lg font-display font-semibold mb-1 ${dark ? "text-white" : "text-navy"}`}>{plan.name}</h3>
              <p className={`text-sm mb-6 ${dark ? "text-[#9FB4D8]" : "text-slate"}`}>{plan.who}</p>

              {price !== null ? (
                <div className={`text-4xl font-display font-bold mb-1 ${dark ? "text-white" : "text-navy"}`}>
                  ${price}
                  <span className={`text-sm font-medium ${dark ? "text-[#9FB4D8]" : "text-slate"}`}>/{cycle === "monthly" ? "mo" : "yr"}</span>
                </div>
              ) : (
                <div className={`text-4xl font-display font-bold mb-1 ${dark ? "text-white" : "text-navy"}`}>Custom</div>
              )}

              <div className="flex flex-col gap-2 my-6">
                {plan.id === "enterprise" ? (
                  <button
                    onClick={() => handleChoosePlan(plan.id)}
                    className="w-full py-3 rounded-lg font-semibold text-sm border border-line text-navy hover:border-blue hover:text-blue transition"
                  >
                    Talk to sales
                  </button>
                ) : (
                  <button
                    onClick={() => handleChoosePlan(plan.id)}
                    disabled={loadingPlan === plan.id}
                    className={`w-full py-3 rounded-lg font-semibold text-sm transition ${
                      dark ? "bg-teal text-navy hover:bg-white" : "border border-line text-navy hover:border-blue hover:text-blue"
                    }`}
                  >
                    {loadingPlan === plan.id ? "Redirecting…" : "Get started"}
                  </button>
                )}
              </div>

              <ul className={`flex flex-col gap-3 border-t pt-6 mt-auto ${dark ? "border-white/15" : "border-line"}`}>
                {plan.features.map((f) => (
                  <li key={f} className={`text-sm flex gap-2 ${dark ? "text-[#DCE7F8]" : "text-ink"}`}>
                    <span className={dark ? "text-teal font-bold" : "text-blue font-bold"}>✓</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
