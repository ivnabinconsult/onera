import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Privacy Policy — On3ra" };

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <section className="pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-navy font-display font-semibold mb-3">Privacy Policy</h1>
          <p className="text-slate text-sm mb-10">Last updated: September 2026</p>

          <div className="flex flex-col gap-8 text-[15px] text-ink leading-relaxed">
            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">1. What this covers</h2>
              <p>This policy explains what personal data On3ra collects, how we use it, and your rights over it. On3ra is operated as a Nigeria-based business, and we aim to handle your data in line with the Nigeria Data Protection Act (NDPA).</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">2. Information we collect</h2>
              <p className="mb-2">When you use On3ra, we collect:</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li>• <strong>Account information</strong>: name, email address, and password (stored securely, hashed, via Supabase Auth)</li>
                <li>• <strong>Billing information</strong>: your subscription plan and status. Card and bank details are handled entirely by Paystack — On3ra never sees or stores your full card number</li>
                <li>• <strong>Content you create</strong>: projects, drafts, and published website content you make within the Service</li>
                <li>• <strong>Usage data</strong>: basic technical information like IP address and browser type, used for security and improving the Service</li>
              </ul>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">3. How we use your information</h2>
              <p>We use your information to: provide and maintain the Service; process payments and manage subscriptions; communicate with you about your account; and improve On3ra's features and reliability. We don't sell your personal data to third parties.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">4. Third-party services we use</h2>
              <p className="mb-2">On3ra relies on the following processors to operate:</p>
              <ul className="flex flex-col gap-1.5 pl-1">
                <li>• <strong>Supabase</strong> — hosts our database and handles authentication</li>
                <li>• <strong>Paystack</strong> — processes payments securely; we never store your full card details</li>
                <li>• <strong>Vercel</strong> — hosts the application</li>
              </ul>
              <p className="mt-2">Each of these providers has its own privacy practices governing the data they process on our behalf.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">5. Data retention</h2>
              <p>We keep your account data for as long as your account is active. If you cancel, published website content stays live for 30 days to allow you to export it, after which it and related data may be deleted from our active systems.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">6. Your rights</h2>
              <p>You can request access to, correction of, or deletion of your personal data at any time by contacting us. You can also export your project and content data directly from your dashboard.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">7. Security</h2>
              <p>We use industry-standard practices (encrypted connections, hashed passwords, access controls) to protect your data, but no system is 100% secure. Please use a strong, unique password for your account.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">8. Changes to this policy</h2>
              <p>We may update this policy from time to time. We'll post the updated version here with a new "last updated" date.</p>
            </div>

            <div>
              <h2 className="font-display font-semibold text-navy text-lg mb-2">9. Contact</h2>
              <p>Questions about your data or this policy? Reach us at aethinna@gmail.com or +234 705 532 9861.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
