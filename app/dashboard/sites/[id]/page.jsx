import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SiteForm from "../SiteForm";

export default async function EditSitePage({ params }) {
  const supabase = createClient();
  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!site) notFound();

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl font-semibold text-[#111827] mb-8">Edit Site</h1>
      <SiteForm site={site} />
    </div>
  );
}
