"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  async function loadProjects() {
    const supabase = createClient();
    const { data } = await supabase
      .from("projects")
      .select("*, tasks(count)")
      .order("created_at", { ascending: false });
    setProjects(data || []);
    setLoading(false);
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("projects").insert({ name: newName.trim(), user_id: user.id });

    setNewName("");
    setCreating(false);
    loadProjects();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project and all its tasks?")) return;
    const supabase = createClient();
    await supabase.from("projects").delete().eq("id", id);
    loadProjects();
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-navy mb-1">Projects</h1>
      <p className="text-slate mb-8">Create a project, then break it into tasks.</p>

      <form onSubmit={handleCreate} className="flex gap-3 mb-8 max-w-lg">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New project name"
          className="flex-1 px-3.5 py-2.5 border border-line rounded-lg text-base focus:border-blue outline-none bg-white"
        />
        <button
          type="submit"
          disabled={creating}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition whitespace-nowrap"
        >
          {creating ? "Adding…" : "Add project"}
        </button>
      </form>

      {loading ? (
        <p className="text-slate text-sm">Loading…</p>
      ) : projects.length === 0 ? (
        <p className="text-slate text-sm">No projects yet — create your first one above.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white border border-line rounded-xl p-5 flex flex-col">
              <Link href={`/dashboard/projects/${p.id}`} className="font-display font-semibold text-navy mb-1 hover:text-blue">
                {p.name}
              </Link>
              <p className="text-sm text-slate mb-4">{p.tasks?.[0]?.count ?? 0} tasks</p>
              <div className="flex gap-3 mt-auto">
                <Link href={`/dashboard/projects/${p.id}`} className="text-sm text-blue font-semibold">
                  Open →
                </Link>
                <button onClick={() => handleDelete(p.id)} className="text-sm text-slate hover:text-red-600 ml-auto">
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
