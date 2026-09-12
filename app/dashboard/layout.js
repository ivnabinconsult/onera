import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";
import DashboardNav from "@/components/DashboardNav";

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper">
      <aside className="w-full md:w-60 bg-navy flex flex-row md:flex-col items-center md:items-stretch p-4 md:p-5 flex-shrink-0 gap-4 md:gap-0">
        <Link href="/" className="flex-shrink-0 md:mb-8 md:block">
          <Image src="/logo.png" alt="On3ra" width={130} height={40} className="h-7 md:h-8 w-auto brightness-0 invert opacity-90" />
        </Link>

        <DashboardNav />

        <div className="hidden md:block border-t border-white/10 pt-4 mt-4">
          <p className="text-xs text-[#8FA6CC] mb-2 truncate">{user?.email}</p>
          <SignOutButton />
        </div>

        {/* Compact sign-out on mobile, no email shown to save space */}
        <div className="md:hidden flex-shrink-0">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-5 sm:p-8 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
