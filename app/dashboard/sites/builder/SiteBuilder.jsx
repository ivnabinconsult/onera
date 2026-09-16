"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const BLOCK_TYPES = {
  heading: { label: "Heading", fields: ["text"] },
  text: { label: "Text", fields: ["text"] },
  image: { label: "Image", fields: ["url", "alt"] },
  button: { label: "Button", fields: ["label", "href"] },
};

function emptyBlock(type) {
  const id = crypto.randomUUID();
  if (type === "heading") return { id, type, text: "Heading" };
  if (type === "text") return { id, type, text: "Some text..." };
  if (type === "image") return { id, type, url: "", alt: "" };
  if (type === "button") return { id, type, label: "Click me", href: "#" };
}

export default function SiteBuilder({ site }) {
  const router = useRouter();
  const supabase = createClient();
  const [blocks, setBlocks] = useState(site.content?.blocks || []);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  function addBlock(type) {
    setBlocks([...blocks, emptyBlock(type)]);
  }

  function updateBlock(id, field, value) {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, [field]: value } : b)));
  }

  function removeBlock(id) {
    setBlocks(blocks.filter((b) => b.id !== id));
  }

  function moveBlock(index, direction) {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const next = [...blocks];
    [next[index], next[newIndex]] = [next[newIndex], next[index]];
    setBlocks(next);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const { error: dbError } = await supabase
      .from("sites")
      .update({ content: { blocks } })
      .eq("id", site.id);
    setSaving(false);
    if (dbError) {
      setError(dbError.message);
      return;
    }
    router.refresh();
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-2 mb-6">
        {Object.entries(BLOCK_TYPES).map(([type, { label }]) => (
          <button
            key={type}
            onClick={() => addBlock(type)}
            className="text-sm font-medium px-3 py-2 rounded-lg border border-[#64748B]/30 hover:border-[#2563EB]/50 transition"
          >
            + {label}
          </button>
        ))}
      </div>

      {blocks.length === 0 && (
        <div className="border border-dashed border-[#64748B]/30 rounded-xl p-10 text-center text-sm text-[#64748B] mb-6">
          No blocks yet. Add one above to start building the page.
        </div>
      )}

      <div className="flex flex-col gap-3 mb-6">
        {blocks.map((block, index) => (
          <div key={block.id} className="border border-[#64748B]/20 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium uppercase tracking-wide text-[#64748B]">
                {BLOCK_TYPES[block.type]?.label || block.type}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveBlock(index, -1)}
                  disabled={index === 0}
                  className="text-xs px-2 py-1 rounded hover:bg-[#64748B]/10 disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveBlock(index, 1)}
                  disabled={index === blocks.length - 1}
                  className="text-xs px-2 py-1 rounded hover:bg-[#64748B]/10 disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="text-xs px-2 py-1 rounded text-red-500 hover:bg-red-500/10"
                >
                  Remove
                </button>
              </div>
            </div>

            {BLOCK_TYPES[block.type]?.fields.map((field) => (
              <input
                key={field}
                type="text"
                value={block[field] || ""}
                onChange={(e) => updateBlock(block.id, field, e.target.value)}
                placeholder={field}
                className="w-full border border-[#64748B]/30 rounded-lg px-3 py-2 text-sm mb-2 last:mb-0 focus:outline-none focus:border-[#2563EB]"
              />
            ))}
          </div>
        ))}
      </div>

      {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-[#2563EB] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#2563EB]/90 transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save page"}
      </button>
    </div>
  );
}
