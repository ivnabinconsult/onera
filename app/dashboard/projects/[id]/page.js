"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

const columns = [
  { key: "todo", label: "To do" },
  { key: "in_progress", label: "In progress" },
  { key: "done", label: "Done" },
];

export default function ProjectBoardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");

  async function loadData() {
    const supabase = createClient();
    const { data: projectData } = await supabase.from("projects").select("*").eq("id", id).single();
    const { data: taskData } = await supabase
      .from("tasks")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: true });

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
    if (!newTitle.trim()) return;

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("tasks").insert({
      project_id: id,
      user_id: user.id,
      title: newTitle.trim(),
      status: "todo",
    });
    setNewTitle("");
    loadData();
  }

  async function handleMove(taskId, newStatus) {
    const supabase = createClient();
    await supabase.from("tasks").update({ status: newStatus }).eq("id", taskId);
    loadData();
  }

  async function handleDeleteTask(taskId) {
    const supabase = createClient();
    await supabase.from("tasks").delete().eq("id", taskId);
    loadData();
  }

  if (loading) return <p className="text-slate text-sm">Loading…</p>;
  if (!project) return <p className="text-slate text-sm">Project not found.</p>;

  return (
    <div>
      <Link href="/dashboard/projects" className="text-sm text-blue font-semibold mb-3 inline-block">
        ← All projects
      </Link>
      <h1 className="text-2xl font-display font-semibold text-navy mb-6">{project.name}</h1>

      <form onSubmit={handleAddTask} className="flex gap-3 mb-8 max-w-lg">
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New task"
          className="flex-1 px-3.5 py-2.5 border border-line rounded-lg text-base focus:border-blue outline-none bg-white"
        />
        <button type="submit" className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-blue text-white hover:bg-blueDeep transition whitespace-nowrap">
          Add task
        </button>
      </form>

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
                        className="text-xs border border-line rounded px-2 py-1 bg-white"
                      >
                        <option value="todo">To do</option>
                        <option value="in_progress">In progress</option>
                        <option value="done">Done</option>
                      </select>
                      <button onClick={() => handleDeleteTask(t.id)} className="text-xs text-slate hover:text-red-600">
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
