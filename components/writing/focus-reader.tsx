"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MarkdownContent } from "@/components/writing/markdown-content";
import { type LabPost } from "@/components/writing/posts";
import { Surface } from "@/components/surface";

export function FocusReader({ post }: { post: LabPost }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.2 });

  return (
    <main className="min-h-screen bg-canvas px-4 pb-16 pt-20 text-ink sm:px-6 lg:px-8">
      <header className="fixed inset-x-0 top-0 z-40 border-b border-line/70 bg-canvas/88 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <Link
            href="/writing"
            className="inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-2 text-sm text-muted transition hover:bg-accentSoft/60 hover:text-ink"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to Writing</span>
          </Link>
          <p className="min-w-0 flex-1 truncate text-center text-sm font-medium text-muted">{post.title}</p>
          <span className="hidden w-24 text-right text-xs text-muted sm:block">{post.date}</span>
        </div>
        <motion.div className="h-px origin-left bg-accent/70" style={{ scaleX }} />
      </header>

      <motion.article
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-3xl"
      >
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{post.date}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-normal text-ink sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line/70 bg-surface/60 px-4 py-2 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <Surface className="p-5 sm:p-9">
          <MarkdownContent content={post.content} />
        </Surface>
      </motion.article>
    </main>
  );
}
