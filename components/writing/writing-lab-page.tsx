"use client";

import { motion } from "framer-motion";
import { BookOpen, CalendarDays } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PortfolioShell } from "@/components/portfolio-system";
import { Surface } from "@/components/surface";
import { type LabPost } from "@/components/writing/posts";
import { cn } from "@/lib/utils";

const filters = ["All", "AppSec", "API Security", "Mobile Security", "Runtime Analysis", "Frida", "DevSecOps", "Network Security"];

export function WritingLabPage({ posts }: { posts: LabPost[] }) {
  const [activeTag, setActiveTag] = useState("All");
  const [previewed, setPreviewed] = useState<string | null>(null);

  const filteredPosts = useMemo(
    () => posts.filter((post) => activeTag === "All" || post.tags.includes(activeTag)),
    [activeTag, posts]
  );

  return (
    <PortfolioShell>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">Security Lab Notes</p>
          <h1 className="text-5xl font-semibold tracking-normal text-ink sm:text-6xl">Writing</h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Notes, experiments, and things I figured out while breaking and fixing systems.
          </p>
        </motion.div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm transition",
                activeTag === tag
                  ? "border-accent/45 bg-accentSoft text-ink"
                  : "border-line/70 bg-surface/45 text-muted hover:border-accent/35 hover:text-ink"
              )}
            >
              {tag}
            </button>
          ))}
        </div>

        <motion.div layout className="grid auto-rows-[minmax(245px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {filteredPosts.map((post, index) => (
            <PostTile
              key={post.slug}
              post={post}
              active={previewed === post.slug}
              index={index}
              onPreview={setPreviewed}
            />
          ))}
        </motion.div>
      </section>
    </PortfolioShell>
  );
}

function PostTile({
  post,
  active,
  index,
  onPreview
}: {
  post: LabPost;
  active: boolean;
  index: number;
  onPreview: (slug: string | null) => void;
}) {
  const router = useRouter();
  const span = index === 0 ? "md:col-span-4" : "md:col-span-3";

  function handleClick() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile && !active) {
      onPreview(post.slug);
      return;
    }

    router.push(`/writing/${post.slug}`);
  }

  return (
    <motion.button
      layout
      type="button"
      onClick={handleClick}
      onMouseEnter={() => onPreview(post.slug)}
      onMouseLeave={() => onPreview(null)}
      whileHover={{ scale: 1.018, y: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group min-h-[245px] text-left", span)}
    >
      <Surface interactive className="relative flex h-full min-h-[245px] flex-col overflow-hidden p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Lab note</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">{post.title}</h2>
          </div>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-canvas/35 text-accent">
            <BookOpen size={18} />
          </span>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{post.description}</p>

        <div className="mt-5 flex items-center gap-2 text-xs text-muted">
          <CalendarDays size={14} />
          {post.date}
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accentSoft/55 px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <div className="relative min-h-20 overflow-hidden rounded-[8px] border border-line/60 bg-canvas/42">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-blue-400/10"
              animate={{ x: active ? ["-40%", "15%", "0%"] : "-45%" }}
              transition={{ duration: 1.6, ease: "easeOut" }}
            />
            <motion.p
              initial={false}
              animate={{ opacity: active ? 1 : 0.58, filter: active ? "blur(0px)" : "blur(1.5px)" }}
              className="relative line-clamp-3 px-4 py-4 text-sm leading-6 text-ink"
            >
              {active ? post.preview : "Preview on hover"}
            </motion.p>
          </div>
        </div>
      </Surface>
    </motion.button>
  );
}
