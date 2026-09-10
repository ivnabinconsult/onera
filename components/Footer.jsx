import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy pt-16 pb-7 text-[#B9C9E6]">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-11 border-b border-white/10">
          <div>
            <Image src="/logo.png" alt="On3ra" width={140} height={42} className="h-9 w-auto mb-4 brightness-0 invert opacity-90" />
            <p className="text-sm leading-relaxed max-w-xs">
              One workspace for projects, content, analytics, and your website — built for teams who'd rather work than switch tabs.
            </p>
          </div>
          <div>
            <h4 className="text-white text-sm font-display font-semibold mb-4">Product</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/product" className="hover:text-white">Overview</a></li>
              <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-display font-semibold mb-4">Company</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/faq" className="hover:text-white">FAQ</a></li>
              <li><a href="/contact" className="hover:text-white">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-display font-semibold mb-4">Legal</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
              <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-wrap justify-between items-center pt-6 gap-3 text-[13px]">
          <span>© 2026 On3ra. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
