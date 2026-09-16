import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Uses the service role key so it can check every user's sites,
// bypassing RLS (this route is only reachable by Vercel Cron / the secret below).
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkOne(site) {
  const target =
    site.deployment_url ||
    site.domain ||
    (site.subdomain ? `https://${site.subdomain}.on3ra.app` : null);

  if (!target) return { id: site.id, uptime_status: "unknown" };

  const url = target.startsWith("http") ? target : `https://${target}`;
  let uptime_status = "unknown";
  try {
    const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(8000) });
    uptime_status = res.ok ? "up" : "down";
  } catch {
    uptime_status = "down";
  }
  return { id: site.id, uptime_status };
}

export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: sites, error } = await supabase
    .from("sites")
    .select("id, deployment_url, domain, subdomain");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = await Promise.all(sites.map(checkOne));

  await Promise.all(
    results.map(({ id, uptime_status }) =>
      supabase
        .from("sites")
        .update({ uptime_status, last_checked_at: new Date().toISOString() })
        .eq("id", id)
    )
  );

  return NextResponse.json({ checked: results.length, results });
}
