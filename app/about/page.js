import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />

      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="bg-navy rounded-2xl min-h-[320px] p-7 flex flex-col justify-end order-2 md:order-1">
            <p className="text-white font-display text-xl leading-snug mb-3.5">
              "On3ra is built for founders who are done losing time to copy-pasting between five different tools."
            </p>
            <p className="text-[#9FB4D8] text-sm">— placeholder testimonial</p>
          </div>
          <div className="order-1 md:order-2">
            <h1 className="text-4xl text-navy font-display font-semibold mb-5">Built for teams who are just getting started</h1>
            <p className="text-slate text-[15.5px] mb-4">
              On3ra brings projects, content, analytics, and your website into one workspace, so small teams can move like bigger ones without paying for five separate subscriptions.
            </p>
            <p className="text-slate text-[15.5px] mb-6">
              We're just getting started ourselves — which is why On3ra is priced to be accessible from day one, with plans that grow as your team does.
            </p>
            <Link href="/contact" className="px-6 py-3 rounded-lg font-semibold text-sm border border-line text-navy hover:border-blue hover:text-blue transition inline-block">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center border-t border-line pt-16">
          {[
            ["Just launched", "Onboarding our first teams"],
            ["14 days", "Free trial, no card needed"],
            ["2 gateways", "Stripe and Paystack, your choice"],
            ["24/7", "Support while we grow together"],
          ].map(([num, label]) => (
            <div key={label}>
              <div className="text-2xl md:text-3xl font-display font-semibold text-navy">{num}</div>
              <div className="text-slate text-sm mt-1.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
