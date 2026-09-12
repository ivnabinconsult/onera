"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const columns = [
  { key: "todo", label: "To do" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
];

export default function ProjectBoardPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState(null);

  async function loadData() {
    setError(null);
    const supabase = createClient();

    const { data: projectData, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (projectError) {
      setError(projectError.message);
      setLoading(false);
      return;
    }

    const { data: taskData, error: taskError } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

    if (taskError) {
      setError(taskError.message);
    }

    setProject(projectData);
    setTasks(taskData || []);
    setLoading(false);
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleAddTask(e) {
    e.preventDefault();
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    setError(null);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setError("You're not signed in. Please log in again.");
      return;
    }

    const { data, error: insertError } = await supabase
      .from("tasks")
      .insert({ project_id: id, user_id: user.id, title: trimmed, status: "todo" })
      .select()
      .single();

    if (insertError) {
      setError(insertError.message);
      return;
    }

    // Add straight to the list rather than depending on a re-fetch
    setTasks((prev) => [...prev, data]);
    setNewTitle("");
  }

  async function handleMove(taskId, newStatus) {
    const supabase = createClient();
    const { error: updateError } = await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)));
  }

  async function handleDeleteTask(taskId) {
    const supabase = createClient();
    const { error: deleteError } = await supabase.from("tasks").delete().eq("id", taskId);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  if (loading) return <p className="text-slate text-sm">Loading…</p>;

  if (!project) {
    return (
      <div>
        <Link href="/dashboard/projects" className="text-sm text-blue font-semibold mb-3 inline-block">
          ← All projects
        </Link>
        <p className="text-red-600 text-sm">{error || "Project not found."}</p>
      </div>
    );
  }

  return (
    <div>
      <Link href="/dashboard/projects" className="text-sm text-blue font-semibold mb-3 inline-block">
        ← All projects
      </Link>
      <h1 className="text-2xl font-display font-semibold text-navy mb-6">{project.name}</h1>

      <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row gap-3 mb-4 max-w-lg">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 min-w-0 px-3.5 py-2.5 border border-line rounded-lg text-base focus:border-blue outline-none bg-white"
        />
        <button type="submit" className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition whitespace-nowrap">
          Add task
        </button>
      </form>

      {error && (
        <p className="text-sm text-red-600 mb-6 max-w-lg bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-3 gap-5">
        {columns.map((col) => (
          <div key={col.key} className="bg-sky rounded-xl p-4">
            <h2 className="font-display font-semibold text-navy text-sm mb-3">
              {col.label} <span className="text-slate font-normal">({tasks.filter((t) => t.status === col.key).length})</span>
            </h2>
            <div className="flex flex-col gap-2.5">
              {tasks
                .filter((t) => t.status === col.key)
                .map((t) => (
                  <div key={t.id} className="bg-white border border-line rounded-lg p-3">
                    <p className="text-sm text-ink mb-2.5">{t.title}</p>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <select
                        value={t.status}
                        onChange={(e) => handleMove(t.id, e.target.value)}
                        className="text-[13px] border border-line rounded px-2 py-1.5 bg-white"
                      >
                        <option value="todo">To do</option>
                        <option value="in_progress">In progress</option>
                        <option value="done">Done</option>
                      </select>
                      <button onClick={() => handleDeleteTask(t.id)} className="text-[13px] text-slate hover:text-red-600 px-2 py-1.5">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              {tasks.filter((t) => t.status === col.key).length === 0 && (
                <p className="text-xs text-slate italic">Nothing here yet</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
