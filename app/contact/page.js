import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl text-navy font-display font-semibold mb-4">Let's talk</h1>
            <p className="text-slate text-[15.5px] mb-6">
              Have questions about which plan fits your team? Send us a note and we'll get back to you within one business day.
            </p>
            <div className="flex flex-col gap-4">
              <div className="border-t border-line pt-3.5">
                <div className="text-xs text-slate mb-1">Email</div>
                <div className="font-display font-semibold text-navy">aethinna@gmail.com</div>
              </div>
              <div className="border-t border-line pt-3.5">
                <div className="text-xs text-slate mb-1">Phone</div>
                <div className="font-display font-semibold text-navy">+234 705 532 9861</div>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
