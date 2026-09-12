import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FaqSection from "@/components/FaqSection";

export default function FaqPage() {
  return (
    <>
      <Header />
      <section className="pt-14 sm:pt-20 pb-6">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-navy font-display font-semibold mb-4 sm:mb-5">Questions, answered</h1>
          <p className="text-lg text-slate">Can't find what you're looking for? Reach out on the contact page.</p>
        </div>
      </section>
      <FaqSection />
      <Footer />
    </>
  );
}
