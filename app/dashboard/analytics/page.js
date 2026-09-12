"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AnalyticsPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError("You're not signed in. Please log in again.");
        setLoading(false);
        return;
      }

      const { data: projectData, error: projectError } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id);

      const { data: taskData, error: taskError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id);

      if (projectError || taskError) {
        setError((projectError || taskError).message);
        setLoading(false);
        return;
      }

      setProjects(projectData || []);
      setTasks(taskData || []);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p className="text-slate text-sm">Loading…</p>;

  const totalTasks = tasks.length;
  const doneCount = tasks.filter((t) => t.status === "done").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const todoCount = tasks.filter((t) => t.status === "todo").length;
  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;

  const statusBars = [
    { label: "To do", count: todoCount, color: "bg-slate" },
    { label: "In progress", count: inProgressCount, color: "bg-blue" },
    { label: "Done", count: doneCount, color: "bg-accent" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-display font-semibold text-navy mb-1">Analytics</h1>
      <p className="text-slate mb-8">Live numbers from your Projects, updated as you work.</p>

      {error && (
        <p className="text-sm text-red-600 mb-6 max-w-lg bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
          {error}
        </p>
      )}

      {totalTasks === 0 ? (
        <p className="text-slate text-sm">
          No data yet — create a project and add some tasks, and your analytics will show up here.
        </p>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-line rounded-xl p-4">
              <p className="text-2xl font-display font-semibold text-navy">{projects.length}</p>
              <p className="text-xs text-slate mt-1">Projects</p>
            </div>
            <div className="bg-white border border-line rounded-xl p-4">
              <p className="text-2xl font-display font-semibold text-navy">{totalTasks}</p>
              <p className="text-xs text-slate mt-1">Total tasks</p>
            </div>
            <div className="bg-white border border-line rounded-xl p-4">
              <p className="text-2xl font-display font-semibold text-navy">{doneCount}</p>
              <p className="text-xs text-slate mt-1">Completed</p>
            </div>
            <div className="bg-white border border-line rounded-xl p-4">
              <p className="text-2xl font-display font-semibold text-navy">{completionRate}%</p>
              <p className="text-xs text-slate mt-1">Completion rate</p>
            </div>
          </div>

          {/* Status breakdown */}
          <div className="bg-white border border-line rounded-xl p-5 mb-8 max-w-lg">
            <h2 className="font-display font-semibold text-navy text-sm mb-4">Tasks by status</h2>
            <div className="flex flex-col gap-3">
              {statusBars.map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs text-slate mb-1">
                    <span>{s.label}</span>
                    <span>{s.count}</span>
                  </div>
                  <div className="h-2 bg-sky rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${s.color}`}
                      style={{ width: totalTasks > 0 ? `${(s.count / totalTasks) * 100}%` : "0%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Per-project breakdown */}
          <div className="bg-white border border-line rounded-xl overflow-hidden max-w-2xl">
            <h2 className="font-display font-semibold text-navy text-sm p-5 pb-0 mb-2">Per project</h2>
            <div className="divide-y divide-line">
              {projects.map((p) => {
                const projectTasks = tasks.filter((t) => t.project_id === p.id);
                const projectDone = projectTasks.filter((t) => t.status === "done").length;
                const rate = projectTasks.length > 0 ? Math.round((projectDone / projectTasks.length) * 100) : 0;
                return (
                  <div key={p.id} className="flex items-center justify-between gap-3 px-5 py-3">
                    <span className="text-sm text-ink truncate">{p.name}</span>
                    <span className="text-xs text-slate whitespace-nowrap">
                      {projectDone}/{projectTasks.length} done ({rate}%)
                    </span>
                  </div>
                );
              })}
              {projects.length === 0 && (
                <p className="text-sm text-slate px-5 py-3">No projects yet.</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
