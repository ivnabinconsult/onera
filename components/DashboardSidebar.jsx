"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Content", href: "/dashboard/content" },
  { label: "Analytics", href: "/dashboard/analytics" },
  { label: "Sites", soon: true },
];

export default function DashboardSidebar({ userEmail }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href) =>
    href && (pathname === href || (href !== "/dashboard" && pathname.startsWith(href)));

  function NavLinks({ onClick }) {
    return (
      <>
        {navItems.map((item) =>
          item.soon ? (
            <span
              key={item.label}
              className="px-3 py-2.5 rounded-lg font-medium opacity-40 flex items-center gap-2 cursor-default text-sm text-[#B9C9E6]"
            >
              {item.label}
              <span className="text-[10px] border border-white/25 rounded px-1.5 py-0.5">Soon</span>
            </span>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClick}
              className={`px-3 py-2.5 rounded-lg font-medium text-sm transition ${
                isActive(item.href) ? "bg-white/10 text-white" : "text-[#B9C9E6] opacity-70 hover:opacity-100"
              }`}
            >
              {item.label}
            </Link>
          )
        )}
      </>
    );
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden bg-navy flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex-shrink-0">
          <Image src="/logo.png" alt="On3ra" width={120} height={36} className="h-7 w-auto brightness-0 invert opacity-90" />
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
        >
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-opacity ${open ? "opacity-0" : ""}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}></span>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      {open && (
        <div className="md:hidden bg-navy px-4 pb-4 flex flex-col gap-1 border-t border-white/10">
          <NavLinks onClick={() => setOpen(false)} />
          <div className="border-t border-white/10 mt-3 pt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-[#8FA6CC] truncate">{userEmail}</p>
            <SignOutButton />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 bg-navy p-5 flex-shrink-0">
        <Link href="/" className="mb-8 block">
          <Image src="/logo.png" alt="On3ra" width={130} height={40} className="h-8 w-auto brightness-0 invert opacity-90" />
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          <NavLinks />
        </nav>
        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-xs text-[#8FA6CC] mb-2 truncate">{userEmail}</p>
          <SignOutButton />
        </div>
      </aside>
    </>
  );
}
