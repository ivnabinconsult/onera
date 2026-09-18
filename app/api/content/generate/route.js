import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Calls the Groq API server-side only — the API key never reaches the browser.
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

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      { error: "AI writer isn't configured yet — missing GROQ_API_KEY." },
      { status: 500 }
    );
  }

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
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

    const text = data.choices?.[0]?.message?.content || "";

    return NextResponse.json({ text });
  } catch (err) {
    return NextResponse.json({ error: "Could not reach the AI writer. Please try again." }, { status: 500 });
  }
}
