"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ContentEditorPage() {
  const { id } = useParams();
  const [draft, setDraft] = useState(null);
  const [title, setTitle] = useState("");
  const [prompt, setPrompt] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [savedMsg, setSavedMsg] = useState(false);

  async function loadDraft() {
    setError(null);
    const supabase = createClient();
    const { data, error: fetchError } = await supabase
      .from("content_drafts")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError) {
      setError(fetchError.message);
      setLoading(false);
      return;
    }

    setDraft(data);
    setTitle(data.title || "");
    setPrompt(data.prompt || "");
    setBody(data.body || "");
    setLoading(false);
  }

  useEffect(() => {
    loadDraft();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleGenerate() {
    if (!prompt.trim()) {
      setError("Enter a topic or brief first.");
      return;
    }
    setError(null);
    setGenerating(true);

    const res = await fetch("/api/content/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();

    setGenerating(false);

    if (!res.ok) {
      setError(data.error || "Something went wrong generating content.");
      return;
    }

    setBody(data.text);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("content_drafts")
      .update({ title: title.trim() || "Untitled draft", prompt, body, updated_at: new Date().toISOString() })
      .eq("id", id);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }

  if (loading) return <p className="text-slate text-sm">Loading…</p>;

  if (!draft) {
    return (
      <div>
        <Link href="/dashboard/content" className="text-sm text-blue font-semibold mb-3 inline-block">
          ← All drafts
        </Link>
        <p className="text-red-600 text-sm">{error || "Draft not found."}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <Link href="/dashboard/content" className="text-sm text-blue font-semibold mb-3 inline-block">
        ← All drafts
      </Link>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Draft title"
        className="w-full text-2xl font-display font-semibold text-navy mb-6 outline-none bg-transparent border-b border-transparent focus:border-line pb-1"
      />

      {error && (
        <p className="text-sm text-red-600 mb-4 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

      <label className="block text-xs font-semibold text-navy mb-1.5 font-display">
        What should the AI write about?
      </label>
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. A short blog post announcing our new pricing"
          className="flex-1 min-w-0 px-3.5 py-2.5 border border-line rounded-lg text-base focus:border-blue outline-none bg-white"
        />
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition whitespace-nowrap"
        >
          {generating ? "Writing…" : "Generate with AI"}
        </button>
      </div>

      <label className="block text-xs font-semibold text-navy mb-1.5 font-display">Content</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        rows={14}
        placeholder="Generated content will appear here — or just write your own."
        className="w-full px-3.5 py-3 border border-line rounded-lg text-base focus:border-blue outline-none bg-white resize-y mb-4"
      />

      <div className="flex items-center gap-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-navy text-white hover:opacity-90 transition"
        >
          {saving ? "Saving…" : "Save draft"}
        </button>
        {savedMsg && <span className="text-sm text-accent font-semibold">Saved ✓</span>}
      </div>
    </div>
  );
}
