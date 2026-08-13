"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PortfolioShell } from "@/components/portfolio-system";
import { Surface } from "@/components/surface";
import { type WorkProject } from "@/components/work/projects";
import { cn } from "@/lib/utils";

export function WorkCaseStudyGrid({ projects }: { projects: WorkProject[] }) {
  const [previewed, setPreviewed] = useState<string | null>(null);

  return (
    <PortfolioShell>
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 max-w-3xl"
        >
          <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">Security Case Studies</p>
          <h1 className="text-5xl font-semibold tracking-normal text-ink sm:text-6xl">Work</h1>
          <p className="mt-6 text-lg leading-8 text-muted">
            Projects I&apos;ve worked on while bored, then turned into something useful.
          </p>
        </motion.div>

        <motion.div layout className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          {projects.map((project, index) => (
            <ProjectTile
              key={project.slug}
              project={project}
              active={previewed === project.slug}
              index={index}
              onPreview={setPreviewed}
            />
          ))}
        </motion.div>
      </section>
    </PortfolioShell>
  );
}

function ProjectTile({
  project,
  active,
  index,
  onPreview
}: {
  project: WorkProject;
  active: boolean;
  index: number;
  onPreview: (slug: string | null) => void;
}) {
  const router = useRouter();
  const span = index === 0 ? "md:col-span-4" : index === 1 ? "md:col-span-2" : "md:col-span-3";

  function handleClick() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile && !active) {
      onPreview(project.slug);
      return;
    }

    router.push(`/work/${project.slug}`);
  }

  return (
    <motion.button
      layoutId={`work-${project.slug}`}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => onPreview(project.slug)}
      onMouseLeave={() => onPreview(null)}
      whileHover={{ scale: 1.018, y: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group min-h-[260px] text-left", span)}
    >
      <Surface interactive className="relative flex h-full min-h-[260px] flex-col overflow-hidden p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {project.type === "frontend" ? "Frontend case study" : "Case study"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-ink">{project.title}</h2>
          </div>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-canvas/35 text-accent">
            <ShieldCheck size={18} />
          </span>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-accentSoft/55 px-3 py-1 text-xs text-muted">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6">
          <StructuredPreview project={project} active={active} />
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            {project.githubUrl && (
              <span className="inline-flex items-center gap-2">
                <Github size={14} />
                Repository linked
              </span>
            )}
            {project.externalUrl && (
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accentSoft/70 px-3 py-1 text-ink">
                <ExternalLink size={13} />
                Live surface
                <ArrowUpRight size={12} />
              </span>
            )}
          </div>
        </div>
      </Surface>
    </motion.button>
  );
}

function StructuredPreview({ project, active }: { project: WorkProject; active: boolean }) {
  const rows = [
    ["What it is", project.preview.what],
    ["Why it exists", project.preview.why],
    ["Core focus", project.preview.focus]
  ];

  return (
    <div className="relative min-h-32 overflow-hidden rounded-[8px] border border-line/60 bg-canvas/42">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-blue-400/10"
        animate={{ x: active ? ["-40%", "15%", "0%"] : "-45%" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0.58, filter: active ? "blur(0px)" : "blur(1.5px)" }}
        className="relative space-y-2 p-4"
      >
        {active ? (
          rows.map(([label, value]) => (
            <p key={label} className="text-sm leading-5 text-ink">
              <span className="font-medium text-muted">{label}:</span> {value}
            </p>
          ))
        ) : (
          <p className="text-sm text-ink">Preview on hover</p>
        )}
      </motion.div>
    </div>
  );
}
