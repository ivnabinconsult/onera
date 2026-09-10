import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";

export default function PricingPage() {
  return (
    <>
      <Header />
      <section className="pt-20 pb-24">
        <div className="max-w-3xl mx-auto px-8 text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-navy font-display font-semibold mb-5">Affordable plans for growing teams</h1>
          <p className="text-lg text-slate">
            Every plan includes all four modules — Projects, Content, Analytics, and Sites. Pay securely by card or bank transfer via Paystack.
          </p>
        </div>
        <div className="max-w-6xl mx-auto px-8">
          <PricingSection />
        </div>
      </section>
      <Footer />
    </>
  );
}
