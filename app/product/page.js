import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const modules = [
  {
    title: "Projects",
    desc: "Plan sprints, assign work, and track progress without leaving the tab your team already lives in.",
    points: ["Boards, lists, and timelines that stay in sync", "Automatic status rollups for stakeholders", "Time tracking built into every task"],
    image: "/images/product/projects.jpg",
  },
  {
    title: "Content",
    desc: "Draft, edit, and schedule copy with an AI writer trained on your brand voice, not a generic tone.",
    points: ["Brand voice trained from your past content", "Built-in editor with version history", "One-click scheduling to your channels"],
    image: "/images/product/content.jpg",
  },
  {
    title: "Analytics",
    desc: "See how your projects, content, and site perform together, no exporting data between dashboards.",
    points: ["Cross-tool reporting in one view", "Custom dashboards for each team", "Weekly digest sent to your inbox"],
    image: "/images/product/analytics.jpg",
  },
  {
    title: "Sites",
    desc: "Build and publish a fast, responsive website without a developer, connected straight to your analytics.",
    points: ["Drag-and-drop page builder", "Free SSL and global hosting included", "SEO checks before every publish"],
    image: "/images/product/sites.jpg",
  },
];

export default function ProductPage() {
  return (
    <>
      <Header />

      <section className="pt-20 pb-16">
        <div className="max-w-3xl mx-auto px-5 sm:px-8 text-center">
          <h1 className="text-4xl md:text-5xl text-navy font-display font-semibold mb-5">One workspace, four connected tools</h1>
          <p className="text-lg text-slate">
            Every module in On3ra reads and writes to the same data, so a task, a draft, and a chart are never three logins away from each other.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          {modules.map((m, i) => (
            <div key={m.title} className={`grid md:grid-cols-2 gap-14 items-center py-14 ${i !== 0 ? "border-t border-line" : ""}`}>
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <h2 className="text-2xl text-navy font-display font-semibold mb-3.5">{m.title}</h2>
                <p className="text-slate text-[15.5px] mb-4">{m.desc}</p>
                <ul className="flex flex-col gap-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex gap-2.5 text-[14.5px] text-ink">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 flex-shrink-0"></span>{p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`relative rounded-2xl overflow-hidden border border-line aspect-[4/3] ${i % 2 === 1 ? "md:order-1" : ""}`}>
                <Image
                  src={m.image}
                  alt={`${m.title} module preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-navy text-center">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <h2 className="text-3xl text-white font-display font-semibold mb-3.5">See it running in your own workspace</h2>
          <p className="text-[#C4D5F0] mb-7">Start free for 14 days. No card required.</p>
          <Link href="/signup" className="inline-block px-6 py-3.5 rounded-lg font-semibold text-sm bg-teal text-navy hover:bg-white transition">
            Start free trial
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
