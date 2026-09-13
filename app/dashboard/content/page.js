"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ContentPage() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadDrafts() {
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in. Please log in again.");
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from("content_drafts")
      .select("*")
      .eq("user_id", user.id)
      .order("updated_at", { ascending: false });

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setDrafts(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadDrafts();
  }, []);

  async function handleNewDraft() {
    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in. Please log in again.");
      return;
    }

    const { data, error: insertError } = await supabase
      .from("content_drafts")
      .insert({ user_id: user.id, title: "Untitled draft", body: "" })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setDrafts((prev) => [data, ...prev]);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this draft?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("content_drafts").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-3">
        <h1 className="text-2xl font-display font-semibold text-navy">Content</h1>
        <button
          onClick={handleNewDraft}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition"
        >
          New draft
        </button>
      </div>
      <p className="text-slate mb-8">Write with an AI assistant, then edit and save your drafts.</p>

      {error && (
        <p className="text-sm text-red-600 mb-6 max-w-lg bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

      {loading ? (
        <p className="text-slate text-sm">Loading…</p>
      ) : drafts.length === 0 ? (
        <p className="text-slate text-sm">No drafts yet — click "New draft" to start writing.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {drafts.map((d) => (
            <div key={d.id} className="bg-white border border-line rounded-xl p-5 flex flex-col">
              <Link href={`/dashboard/content/${d.id}`} className="font-display font-semibold text-navy mb-1 hover:text-blue truncate">
                {d.title || "Untitled draft"}
              </Link>
              <p className="text-sm text-slate mb-4 line-clamp-2">
                {d.body ? d.body.slice(0, 100) : "No content yet"}
              </p>
              <div className="flex gap-3 mt-auto items-center">
                <Link href={`/dashboard/content/${d.id}`} className="text-sm text-blue font-semibold py-1.5">
                  Open →
                </Link>
                <button onClick={() => handleDelete(d.id)} className="text-sm text-slate hover:text-red-600 ml-auto py-1.5 px-2">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
