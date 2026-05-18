"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";
import { PortfolioShell } from "@/components/portfolio-system";
import { Surface } from "@/components/surface";
import { type WorkProject } from "@/components/work/projects";

export function WorkCaseStudyPage({ project }: { project: WorkProject }) {
  return (
    <PortfolioShell>
      <motion.article
        layoutId={`work-${project.slug}`}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-5xl"
      >
        <Link
          href="/work"
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line/70 bg-surface/60 px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:bg-accentSoft/60 hover:text-ink"
        >
          <ArrowLeft size={16} />
          Back to Work
        </Link>

        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Case study</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-normal text-ink sm:text-6xl">{project.title}</h1>
          <p className="mt-6 text-lg leading-8 text-muted">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line/70 bg-surface/60 px-4 py-2 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <CaseBlock title="Context" body={project.caseStudy.context} />
          <CaseBlock title="Problem" body={project.caseStudy.problem} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Surface className="p-6 sm:p-7">
            <h2 className="text-2xl font-semibold text-ink">System Design</h2>
            <div className="mt-5 space-y-3">
              {project.caseStudy.systemDesign.map((item) => (
                <p key={item} className="text-sm leading-6 text-muted">{item}</p>
              ))}
            </div>
          </Surface>

          <Surface className="p-6 sm:p-7">
            <h2 className="text-2xl font-semibold text-ink">Security / Technical Focus</h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.caseStudy.technicalFocus.map((item) => (
                <span key={item} className="rounded-full bg-accentSoft/55 px-3 py-1 text-sm text-muted">
                  {item}
                </span>
              ))}
            </div>
          </Surface>
        </div>

        <Surface className="mt-4 p-6 sm:p-7">
          <h2 className="text-2xl font-semibold text-ink">Links</h2>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent/30 bg-accentSoft/70 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/60 hover:bg-accentSoft sm:w-auto"
            >
              <Github size={17} />
              View on GitHub
              <ArrowUpRight size={15} />
            </a>
            {project.externalUrl && (
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line/70 bg-surface/60 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/50 hover:bg-accentSoft/60 sm:w-auto"
              >
                External Reference
                <ArrowUpRight size={15} />
              </a>
            )}
            <Link
              href="/work"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line/70 bg-surface/60 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/50 hover:bg-accentSoft/60 sm:w-auto"
            >
              Back to Work
            </Link>
          </div>
        </Surface>
      </motion.article>
    </PortfolioShell>
  );
}

function CaseBlock({ title, body }: { title: string; body: string }) {
  return (
    <Surface className="p-6 sm:p-7">
      <h2 className="text-2xl font-semibold text-ink">{title}</h2>
      <p className="mt-5 text-sm leading-6 text-muted">{body}</p>
    </Surface>
  );
}
