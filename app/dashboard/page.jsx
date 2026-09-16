import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const statusStyles = {
  draft: "bg-white/10 text-[#B9C9E6]",
  published: "bg-[#2563EB]/20 text-[#60A5FA]",
  error: "bg-red-500/20 text-red-400",
};

export default async function SitesPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: sites, error } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">Sites</h1>
          <p className="text-sm text-[#64748B] mt-1">
            Build, monitor, and manage your published sites.
          </p>
        </div>
        <Link
          href="/dashboard/sites/new"
          className="bg-[#2563EB] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#2563EB]/90 transition"
        >
          New Site
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-500 mb-4">
          Couldn&apos;t load sites: {error.message}
        </p>
      )}

      {sites && sites.length === 0 && (
        <div className="border border-dashed border-[#64748B]/30 rounded-xl p-12 text-center">
          <p className="text-[#64748B] text-sm">
            No sites yet. Create your first one to get started.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sites?.map((site) => (
          <Link
            key={site.id}
            href={`/dashboard/sites/${site.id}`}
            className="border border-[#64748B]/20 rounded-xl p-5 hover:border-[#2563EB]/50 transition bg-white"
          >
            <div className="flex items-start justify-between mb-3">
              <h2 className="font-medium text-[#111827] truncate">{site.name}</h2>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                  statusStyles[site.status] || statusStyles.draft
                }`}
              >
                {site.status || "draft"}
              </span>
            </div>
            <p className="text-sm text-[#64748B] truncate">
              {site.domain || site.subdomain || "No domain set"}
            </p>
            {site.uptime_status && (
              <div className="mt-3 flex items-center gap-1.5 text-xs text-[#64748B]">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    site.uptime_status === "up"
                      ? "bg-emerald-500"
                      : site.uptime_status === "down"
                      ? "bg-red-500"
                      : "bg-[#64748B]"
                  }`}
                />
                {site.uptime_status}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
