"use client";

import { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper/90 backdrop-blur border-b border-line">
      <nav className="max-w-6xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="On3ra" width={160} height={48} className="h-8 sm:h-10 w-auto" priority />
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

        <div className="hidden md:flex gap-3 items-center">
          <Link href="/login" className="px-5 py-2.5 rounded-lg text-sm font-semibold border border-line text-navy hover:border-blue hover:text-blue transition">
            Sign in
          </Link>
          <Link href="/signup" className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-blue text-white hover:bg-blueDeep transition">
            Start free trial
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 -mr-1"
        >
          <span className={`block w-6 h-0.5 bg-navy transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-navy transition-opacity ${open ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-navy transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </nav>

      {/* Mobile menu panel */}
      {open && (
        <div className="md:hidden border-t border-line bg-paper px-5 py-5 flex flex-col gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-[15px] font-medium ${pathname === l.href ? "text-navy" : "text-slate"}`}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex flex-col gap-2.5 mt-3 pt-4 border-t border-line">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-lg text-sm font-semibold border border-line text-navy text-center"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="px-5 py-3 rounded-lg text-sm font-semibold bg-blue text-white text-center"
            >
              Start free trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
