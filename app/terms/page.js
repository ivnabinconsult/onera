import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Terms of Service — On3ra" };

export default function TermsPage() {
  return (
    <>
      <Header />
      <section className="pt-16 pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-3xl md:text-4xl text-navy font-display font-semibold mb-3">Terms of Service</h1>
          <p className="text-slate text-sm mb-10">Last updated: September 2026</p>

          <div className="flex flex-col gap-8 text-[15px] text-ink leading-relaxed">
            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">1. Acceptance of terms</h2>
              <p>By creating an account or using On3ra ("the Service"), you agree to these Terms of Service. If you don't agree, please don't use the Service. On3ra is operated as a Nigeria-based business.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">2. Description of service</h2>
              <p>On3ra provides a workspace for project management, content creation, analytics, and website publishing, offered on a subscription basis. Features and pricing may change over time; we'll do our best to notify you of material changes.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">3. Accounts</h2>
              <p>You're responsible for keeping your login credentials secure and for all activity under your account. You must provide accurate information when signing up and are responsible for keeping it up to date.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">4. Free trial, billing, and cancellation</h2>
              <p>New accounts receive a 14-day free trial. Paid plans are billed monthly or annually via Paystack, in advance. You can cancel at any time from your dashboard; cancellation stops future billing but doesn't refund the current billing period unless required by law. Published websites remain live for 30 days after cancellation to allow you to export your data.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">5. Acceptable use</h2>
              <p>You agree not to use On3ra to: violate any law; distribute malware, spam, or harmful content; infringe on others' intellectual property; or attempt to gain unauthorized access to our systems or other users' data. We may suspend or terminate accounts that violate this section.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">6. Your content</h2>
              <p>You retain ownership of the content you create and upload using On3ra (projects, drafts, published website content, etc.). By using the Service, you grant On3ra a limited license to host, store, and display that content solely for the purpose of operating the Service.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">7. Intellectual property</h2>
              <p>The On3ra name, logo, and underlying software are our property (or that of our licensors) and may not be copied or used without permission, aside from your normal use of the Service.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">8. Disclaimers and limitation of liability</h2>
              <p>On3ra is provided "as is" without warranties of any kind. To the fullest extent permitted by law, On3ra and its operators are not liable for indirect, incidental, or consequential damages arising from your use of the Service. Our total liability for any claim is limited to the amount you paid us in the 12 months before the claim arose.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">9. Termination</h2>
              <p>We may suspend or terminate your access if you violate these terms, or discontinue the Service with reasonable notice. You may stop using the Service and cancel your subscription at any time.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">10. Governing law</h2>
              <p>These terms are governed by the laws of the Federal Republic of Nigeria, without regard to conflict-of-law principles.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">11. Changes to these terms</h2>
              <p>We may update these terms from time to time. Continued use of On3ra after changes take effect means you accept the updated terms.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">12. Contact</h2>
              <p>Questions about these terms? Reach us at aethinna@gmail.com or +234 705 532 9861.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
