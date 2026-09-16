"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SiteForm({ site }) {
  const router = useRouter();
  const supabase = createClient();
  const isEditing = Boolean(site);

  const [name, setName] = useState(site?.name || "");
  const [domain, setDomain] = useState(site?.domain || "");
  const [subdomain, setSubdomain] = useState(site?.subdomain || "");
  const [status, setStatus] = useState(site?.status || "draft");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);

  async function handleCheckStatus() {
    setChecking(true);
    setCheckResult(null);
    try {
      const res = await fetch("/api/sites/check-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteId: site.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Check failed");
      setCheckResult(data.uptime_status);
      router.refresh();
    } catch (err) {
      setCheckResult(`error: ${err.message}`);
    } finally {
      setChecking(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setError("Session not found — please refresh and try again.");
      setSaving(false);
      return;
    }

    const payload = { name, domain, subdomain, status, user_id: user.id };

    const { error: dbError } = isEditing
      ? await supabase.from("sites").update(payload).eq("id", site.id)
      : await supabase.from("sites").insert(payload);

    setSaving(false);

    if (dbError) {
      setError(dbError.message);
      return;
    }

    router.push("/dashboard/sites");
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("Delete this site? This can't be undone.")) return;
    setSaving(true);
    const { error: dbError } = await supabase.from("sites").delete().eq("id", site.id);
    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.push("/dashboard/sites");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl">
      <div className="mb-5">
        <label className="block text-sm font-medium text-[#111827] mb-1.5">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-[#64748B]/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563EB]"
          placeholder="My portfolio site"
        />
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-[#111827] mb-1.5">Subdomain</label>
        <div className="flex items-center border border-[#64748B]/30 rounded-lg overflow-hidden">
          <input
            type="text"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
            className="flex-1 px-3 py-2.5 text-sm focus:outline-none"
            placeholder="yourname"
          />
          <span className="px-3 text-sm text-[#64748B] bg-[#64748B]/5">.on3ra.app</span>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium text-[#111827] mb-1.5">
          Custom domain (optional)
        </label>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full border border-[#64748B]/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563EB]"
          placeholder="www.example.com"
        />
      </div>

      {isEditing && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#111827] mb-1.5">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border border-[#64748B]/30 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#2563EB]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="error">Error</option>
          </select>
        </div>
      )}

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-[#2563EB] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#2563EB]/90 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : isEditing ? "Save changes" : "Create site"}
        </button>
        {isEditing && (
          <>
            <button
              type="button"
              onClick={handleCheckStatus}
              disabled={checking}
              className="text-sm font-medium text-[#2563EB] px-4 py-2.5 rounded-lg hover:bg-[#2563EB]/10 transition disabled:opacity-50"
            >
              {checking ? "Checking..." : "Check status"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={saving}
              className="text-sm font-medium text-red-500 px-4 py-2.5 rounded-lg hover:bg-red-500/10 transition"
            >
              Delete
            </button>
          </>
        )}
      </div>
      {checkResult && (
        <p className="text-sm text-[#64748B] mt-3">Result: {checkResult}</p>
      )}
    </form>
  );
}
