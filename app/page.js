import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrbitGraphic from "@/components/OrbitGraphic";

const modules = [
  { name: "Projects", desc: "Plan sprints and track progress without leaving the tab your team lives in." },
  { name: "Content", desc: "Draft and schedule copy with an AI writer trained on your brand voice." },
  { name: "Analytics", desc: "See projects, content, and site performance together, in one view." },
  { name: "Sites", desc: "Build and publish a fast website without a developer." },
];

export default function Home() {
  return (
    <>
      <Header />

      {/* HERO */}
      <section className="pt-20 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-5xl leading-[1.08] text-navy font-display font-semibold mb-6 max-w-lg">
              Run your whole business from one place
            </h1>
            <p className="text-lg text-slate max-w-md mb-8">
              On3ra brings your projects, content, analytics, and website into a single workspace, so a small team can move like a much bigger one.
            </p>
            <div className="flex gap-3.5 mb-7">
              <Link href="/signup" className="px-6 py-3.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition">
                Start free trial
              </Link>
              <Link href="/product" className="px-6 py-3.5 rounded-lg font-semibold text-sm border border-line text-navy hover:border-blue hover:text-blue transition">
                See how it works
              </Link>
            </div>
            <p className="text-[13.5px] text-slate">No card required · Free 14-day trial · Cancel anytime</p>
          </div>
          <OrbitGraphic />
        </div>
      </section>

      {/* MODULES TEASER */}
      <section className="py-20 border-t border-line">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex items-end justify-between mb-12 gap-6 flex-wrap">
            <h2 className="text-3xl text-navy font-display font-semibold max-w-md">Four tools, working from the same data</h2>
            <Link href="/product" className="text-blue font-semibold text-sm whitespace-nowrap">Explore the product →</Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {modules.map((m) => (
              <div key={m.name} className="border border-line rounded-xl p-5 bg-white">
                <h3 className="font-display font-semibold text-navy mb-2">{m.name}</h3>
                <p className="text-sm text-slate leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-20 bg-sky">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <h2 className="text-3xl text-navy font-display font-semibold mb-3">Priced for teams just getting started</h2>
          <p className="text-slate mb-8 max-w-md mx-auto">Plans start at $9/month. Every plan includes all four modules — no add-ons to unlock.</p>
          <Link href="/pricing" className="inline-block px-7 py-3.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition">
            See plans and pricing
          </Link>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 bg-navy text-center">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-3xl text-white font-display font-semibold mb-3.5">Ready to bring your tools into one place?</h2>
          <p className="text-[#C4D5F0] mb-7">Start your free 14-day trial today. No card required.</p>
          <div className="flex gap-3.5 justify-center">
            <Link href="/signup" className="px-6 py-3.5 rounded-lg font-semibold text-sm bg-teal text-navy hover:bg-white transition">
              Start free trial
            </Link>
            <Link href="/contact" className="px-6 py-3.5 rounded-lg font-semibold text-sm border border-white/35 text-white hover:border-white transition">
              Talk to sales
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
