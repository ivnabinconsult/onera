import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex bg-paper">
      <aside className="w-60 bg-navy flex flex-col p-5 flex-shrink-0">
        <Link href="/" className="mb-8 block">
          <Image src="/logo.png" alt="On3ra" width={130} height={40} className="h-8 w-auto brightness-0 invert opacity-90" />
        </Link>
        <nav className="flex flex-col gap-1 text-sm text-[#B9C9E6] flex-1">
          <span className="px-3 py-2.5 rounded-lg bg-white/10 text-white font-medium">Overview</span>
          <span className="px-3 py-2.5 rounded-lg font-medium opacity-70">Projects</span>
          <span className="px-3 py-2.5 rounded-lg font-medium opacity-70">Content</span>
          <span className="px-3 py-2.5 rounded-lg font-medium opacity-70">Analytics</span>
          <span className="px-3 py-2.5 rounded-lg font-medium opacity-70">Sites</span>
          <span className="px-3 py-2.5 rounded-lg font-medium opacity-70">Billing</span>
        </nav>
        <div className="border-t border-white/10 pt-4 mt-4">
          <p className="text-xs text-[#8FA6CC] mb-2 truncate">{user?.email}</p>
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-10">{children}</main>
    </div>
  );
}
