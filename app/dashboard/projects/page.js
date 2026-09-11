"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState(null);

  async function loadProjects() {
    setError(null);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in. Please log in again.");
      setLoading(false);
      return;
    }

    const { data, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (projectsError) {
      setError(projectsError.message);
      setLoading(false);
      return;
    }

    setProjects(data || []);
    setLoading(false);

    // Fetch task counts separately (avoids relying on a nested relationship query)
    if (data && data.length > 0) {
      const { data: taskRows } = await supabase
        .from("tasks")
        .select("project_id")
        .in("project_id", data.map((p) => p.id));

      const counts = {};
      (taskRows || []).forEach((t) => {
        counts[t.project_id] = (counts[t.project_id] || 0) + 1;
      });
      setTaskCounts(counts);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) return;

    setCreating(true);
    setError(null);
    const supabase = createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("You're not signed in. Please log in again.");
      setCreating(false);
      return;
    }

    const { data, error: insertError } = await supabase
      .from("projects")
      .insert({ name: trimmed, user_id: user.id })
      .select()
      .single();

    setCreating(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Add the new project straight to the list — don't depend on a re-fetch succeeding
    setProjects((prev) => [data, ...prev]);
    setNewName("");
  }

  async function handleDelete(id) {
    if (!confirm("Delete this project and all its tasks?")) return;
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("projects").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-navy mb-1">Projects</h1>
      <p className="text-slate mb-8">Create a project, then break it into tasks.</p>

      <form onSubmit={handleCreate} className="flex gap-3 mb-4 max-w-lg">
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

      {error && (
        <p className="text-sm text-red-600 mb-6 max-w-lg bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

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
              <p className="text-sm text-slate mb-4">{taskCounts[p.id] || 0} tasks</p>
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
