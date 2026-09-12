"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Projects", href: "/dashboard/projects" },
  { label: "Content", soon: true },
  { label: "Analytics", soon: true },
  { label: "Sites", soon: true },
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row md:flex-col gap-1 text-sm text-[#B9C9E6] flex-1 min-w-0 overflow-x-auto md:overflow-visible">
      {navItems.map((item) => {
        const active = item.href && (pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href)));

        if (item.soon) {
          return (
            <span
              key={item.label}
              className="px-3 py-2 md:py-2.5 rounded-lg font-medium whitespace-nowrap opacity-40 flex items-center gap-2 cursor-default"
            >
              {item.label}
              <span className="text-[10px] border border-white/25 rounded px-1.5 py-0.5">Soon</span>
            </span>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            className={`px-3 py-2 md:py-2.5 rounded-lg font-medium whitespace-nowrap transition ${
              active ? "bg-white/10 text-white" : "opacity-70 hover:opacity-100"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
