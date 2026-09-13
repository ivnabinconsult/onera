import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Calls the Anthropic API server-side only — the API key never reaches the browser.
export async function POST(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first" }, { status: 401 });
  }

  const { prompt } = await request.json();
  if (!prompt || !prompt.trim()) {
    return NextResponse.json({ error: "Please enter a topic or prompt" }, { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "AI writer isn't configured yet — missing ANTHROPIC_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-5",
        max_tokens: 1024,
        messages: [
          {
            role: "user",
            content: `Write a piece of marketing/blog content based on this brief: "${prompt.trim()}". Keep it well-structured with a clear opening, a couple of short paragraphs, and a natural closing. Write only the content itself, no preamble.`,
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error?.message || "The AI writer failed to respond." },
        { status: response.status }
      );
    }

    const text = data.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n") || "";

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ error: "Could not reach the AI writer. Please try again." }, { status: 500 });
  }
}
