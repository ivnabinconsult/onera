import { createClient } from "@/lib/supabase/server";
import DashboardSidebar from "@/components/DashboardSidebar";

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-paper">
      <DashboardSidebar userEmail={user?.email} />
      <main className="flex-1 p-5 sm:p-8 md:p-10 min-w-0">{children}</main>
    </div>
  );
}
