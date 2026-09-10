"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/product", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <nav className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="On3ra" width={160} height={48} className="h-10 w-auto" priority />
        </Link>
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "text-navy" : "text-slate hover:text-navy"}
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex gap-3 items-center">
          <Link href="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-line text-navy hover:border-blue hover:text-blue transition">
            Sign in
          </Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue text-white hover:bg-blueDeep transition">
            Start free trial
          </Link>
        </div>
      </nav>
    </header>
  );
}
