import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  const { siteId } = await request.json();

  if (!siteId) {
    return NextResponse.json({ error: "siteId is required" }, { status: 400 });
  }

  const supabase = createClient();

  const { data: site, error: fetchError } = await supabase
    .from("sites")
    .select("id, deployment_url, domain, subdomain")
    .eq("id", siteId)
    .single();

  if (fetchError || !site) {
    return NextResponse.json({ error: "Site not found" }, { status: 404 });
  }

  const target =
    site.deployment_url ||
    site.domain ||
    (site.subdomain ? `https://${site.subdomain}.on3ra.app` : null);

  if (!target) {
    return NextResponse.json({ error: "Site has no URL to check" }, { status: 400 });
  }

  const url = target.startsWith("http") ? target : `https://${target}`;

  let uptimeStatus = "unknown";
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    uptimeStatus = res.ok ? "up" : "down";
  } catch {
    uptimeStatus = "down";
  }

  const { error: updateError } = await supabase
    .from("sites")
    .update({ uptime_status: uptimeStatus, last_checked_at: new Date().toISOString() })
    .eq("id", siteId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ siteId, uptime_status: uptimeStatus });
}
