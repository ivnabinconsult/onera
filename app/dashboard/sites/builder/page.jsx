import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SiteBuilder from "./SiteBuilder";

export default async function SiteBuilderPage({ params }) {
  const supabase = createClient();
  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!site) notFound();

  return (
    <div className="p-6 md:p-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-[#111827]">{site.name}</h1>
          <p className="text-sm text-[#64748B] mt-1">Page builder</p>
        </div>
        <Link
          href={`/dashboard/sites/${site.id}`}
          className="text-sm font-medium text-[#64748B] hover:text-[#111827]"
        >
          Back to settings
        </Link>
      </div>
      <SiteBuilder site={site} />
    </div>
  );
}
