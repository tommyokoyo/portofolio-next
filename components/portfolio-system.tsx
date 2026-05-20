"use client";

import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, BriefcaseBusiness, Contact, FileText, Github, Home, Mail, MessageCircle, Moon, Sun, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolioItems, sections, type PortfolioItem } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Surface } from "@/components/surface";
import { useTheme } from "@/components/theme-provider";

const sectionIcons = {
  home: Home,
  work: BriefcaseBusiness,
  writing: FileText,
  cv: Contact
};

const typeLabels = {
  project: "Work",
  writing: "Writing",
  capability: "CV"
};

export function PortfolioShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const reducedMotion = useReducedMotion();

  return (
    <main className="min-h-screen overflow-hidden px-4 pb-24 pt-5 sm:px-6 lg:px-8">
      <AmbientField reducedMotion={Boolean(reducedMotion)} />
      <Navigation theme={theme} onThemeToggle={toggleTheme} />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 pt-20 sm:pt-24">{children}</div>
    </main>
  );
}

export function HomePage() {
  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const springX = useSpring(heroX, { stiffness: 55, damping: 22 });
  const springY = useSpring(heroY, { stiffness: 55, damping: 22 });
  const heroOffsetX = useTransform(springX, [-1, 1], [5, -5]);
  const heroOffsetY = useTransform(springY, [-1, 1], [4, -4]);

  function handlePointerMove(event: React.PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    heroX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    heroY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  }

  function handlePointerLeave() {
    heroX.set(0);
    heroY.set(0);
  }

  return (
    <PortfolioShell>
      <section
        className="relative -mt-10 flex min-h-[calc(100vh-7rem)] items-center justify-center overflow-hidden py-16 sm:py-20"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <IdentityField />
        <motion.div
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          style={{ x: heroOffsetX, y: heroOffsetY }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <h1 className="flex items-center justify-center gap-3 text-5xl font-semibold tracking-normal text-ink sm:text-6xl lg:text-7xl">
            Hello friend
            <motion.span
              aria-hidden="true"
              className="inline-block text-4xl sm:text-5xl"
              animate={{ rotate: [0, 9, -5, 7, 0], y: [0, -2, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
            >
              👋
            </motion.span>
          </h1>
          <p className="mt-7 text-lg leading-8 text-muted sm:text-xl">
            I&apos;m Thomas, a Security Engineer working on application behavior, runtime systems, and delivery pipeline security across mobile and backend environments.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {["API security", "Mobile reverse engineering", "CI/CD security", "Runtime instrumentation"].map((tag) => (
              <span key={tag} className="rounded-full border border-line/70 bg-surface/60 px-4 py-2 text-sm text-muted">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </section>
    </PortfolioShell>
  );
}

function IdentityField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    const fieldCanvas = canvas;
    const fieldContext = context;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, active: false };
    const flow = { x: 0, y: 0 };
    const scroll = { current: window.scrollY, target: window.scrollY, velocity: 0 };
    const nodes = Array.from({ length: 13 }, (_, index) => {
      const ring = index / 13;
      return {
        ax: 0.18 + ((index * 0.173) % 0.68),
        ay: 0.16 + ((index * 0.297) % 0.66),
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        radius: 3.5 + (index % 4),
        phase: ring * Math.PI * 2
      };
    });

    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;

    function readCssColor(name: string, alpha = 1) {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return `rgb(${value} / ${alpha})`;
    }

    function resize() {
      const rect = fieldCanvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      fieldCanvas.width = Math.max(1, Math.floor(width * dpr));
      fieldCanvas.height = Math.max(1, Math.floor(height * dpr));
      fieldContext.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((node) => {
        node.x = node.ax * width;
        node.y = node.ay * height;
      });
    }

    function onWindowPointerMove(event: PointerEvent) {
      if (event.pointerType !== "mouse") {
        return;
      }
      const rect = fieldCanvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.x <= rect.width && pointer.y >= 0 && pointer.y <= rect.height;
    }

    function onTouchMove(event: TouchEvent) {
      const touch = event.touches[0];
      if (!touch) {
        return;
      }
      const rect = fieldCanvas.getBoundingClientRect();
      flow.x += ((touch.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 0.02;
      flow.y += ((touch.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 0.02;
    }

    function onScroll() {
      const next = window.scrollY;
      scroll.velocity = next - scroll.current;
      scroll.target = next;
      scroll.current = next;
    }

    function draw() {
      frame += 0.006;
      scroll.velocity *= 0.92;
      flow.x *= 0.96;
      flow.y *= 0.96;

      fieldContext.clearRect(0, 0, width, height);

      const accent = readCssColor("--accent", 0.62);
      const accentSoft = readCssColor("--accent", 0.11);
      const ink = readCssColor("--ink", 0.11);
      const line = readCssColor("--line", 0.42);
      const scrollDepth = Math.min(window.scrollY / 420, 1);
      const scrollShift = Math.max(-28, Math.min(28, scroll.velocity * 0.35));
      const dispersion = scrollDepth * 18;
      const idleScale = 1 + Math.sin(frame * 1.6) * 0.012;

      fieldContext.save();
      fieldContext.globalAlpha = 0.9;
      fieldContext.translate(width / 2, height / 2);
      fieldContext.scale(idleScale, idleScale);
      fieldContext.translate(-width / 2, -height / 2);

      nodes.forEach((node, index) => {
        const fromCenterX = node.ax - 0.5;
        const fromCenterY = node.ay - 0.5;
        const baseX = node.ax * width + fromCenterX * dispersion + Math.sin(frame * (0.7 + index * 0.03) + node.phase) * 8 + flow.x * width;
        const baseY = node.ay * height + fromCenterY * dispersion + Math.cos(frame * (0.62 + index * 0.04) + node.phase) * 7 + scrollShift + flow.y * height;
        let targetX = baseX;
        let targetY = baseY;

        if (pointer.active && !prefersReducedMotion) {
          const dx = baseX - pointer.x;
          const dy = baseY - pointer.y;
          const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 1);
          const pressure = Math.max(0, 1 - distance / 190);
          targetX += (dx / distance) * pressure * 34;
          targetY += (dy / distance) * pressure * 34;
        }

        node.vx += (targetX - node.x) * 0.018;
        node.vy += (targetY - node.y) * 0.018;
        node.vx *= 0.86;
        node.vy *= 0.86;
        node.x += prefersReducedMotion ? (targetX - node.x) * 0.06 : node.vx;
        node.y += prefersReducedMotion ? (targetY - node.y) * 0.06 : node.vy;
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 190) {
            fieldContext.beginPath();
            fieldContext.strokeStyle = distance < 120 ? accent : line;
            fieldContext.globalAlpha = Math.max(0.05, 0.24 - distance / 850);
            fieldContext.lineWidth = 1;
            fieldContext.moveTo(a.x, a.y);
            fieldContext.lineTo(b.x, b.y);
            fieldContext.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        const pulse = 1 + Math.sin(frame * 2 + node.phase) * 0.08;
        const gradient = fieldContext.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 6);
        gradient.addColorStop(0, accent);
        gradient.addColorStop(1, accentSoft);
        fieldContext.globalAlpha = 0.58;
        fieldContext.fillStyle = gradient;
        fieldContext.beginPath();
        fieldContext.arc(node.x, node.y, node.radius * 5 * pulse, 0, Math.PI * 2);
        fieldContext.fill();
        fieldContext.globalAlpha = 0.72;
        fieldContext.fillStyle = index % 3 === 0 ? accent : ink;
        fieldContext.beginPath();
        fieldContext.arc(node.x, node.y, node.radius * pulse, 0, Math.PI * 2);
        fieldContext.fill();
      });

      fieldContext.restore();
      animationId = window.requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    animationId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("pointermove", onWindowPointerMove);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden [mask-image:radial-gradient(circle_at_center,black,transparent_82%)]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        animate={{ scale: [1, 1.015, 1], opacity: [0.72, 0.9, 0.72] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute left-[9%] top-[12%] h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-[12%] right-[8%] h-56 w-56 rounded-full bg-blue-400/10 blur-3xl" />
        <div className="absolute left-[42%] top-[36%] h-64 w-64 rounded-full bg-violet-400/10 blur-3xl" />
      </motion.div>
      <canvas ref={canvasRef} aria-hidden="true" className="relative h-full min-h-[calc(100vh-7rem)] w-full" />
    </div>
  );
}

export function WorkPage() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [previewed, setPreviewed] = useState<string | null>(null);
  const projects = portfolioItems.filter((item) => item.type === "project");

  useEffect(() => {
    const lastItem = window.localStorage.getItem("portfolio-last-item");
    if (lastItem) {
      setPreviewed(lastItem);
    }
  }, []);

  function openItem(item: PortfolioItem) {
    window.localStorage.setItem("portfolio-last-item", item.id);
    setPreviewed(item.id);
    setSelected(item);
  }

  return (
    <PortfolioShell>
      <section>
          <SectionHeader
            kicker="Work"
            title="Projects as interactive systems."
            body="Hover a tile for context. On mobile, tap once for a preview and again for the full view."
          />
          <TileGrid
            items={projects}
            previewed={previewed}
            onPreview={setPreviewed}
            onSelect={openItem}
          />
      </section>

      <AnimatePresence>
        {selected && <FocusView item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PortfolioShell>
  );
}

export function WritingPage() {
  const [selected, setSelected] = useState<PortfolioItem | null>(null);
  const [previewed, setPreviewed] = useState<string | null>(null);
  const writing = portfolioItems.filter((item) => item.type === "writing");

  useEffect(() => {
    const lastItem = window.localStorage.getItem("portfolio-last-item");
    if (lastItem) {
      setPreviewed(lastItem);
    }
  }, []);

  function openItem(item: PortfolioItem) {
    window.localStorage.setItem("portfolio-last-item", item.id);
    setPreviewed(item.id);
    setSelected(item);
  }

  return (
    <PortfolioShell>
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            kicker="Writing"
            title="Field notes with room to breathe."
            body="Short editorial pieces connect back into projects and capability areas, so reading remains part of exploration rather than a separate archive."
          />
          <div>
            <p className="mb-4 text-sm text-muted">Structured for future reading routes like /writing/api-security-notes.</p>
            <TileGrid items={writing} previewed={previewed} onPreview={setPreviewed} onSelect={openItem} />
          </div>
      </section>

      <AnimatePresence>
        {selected && <FocusView item={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </PortfolioShell>
  );
}

export function CvPage() {
  return (
    <PortfolioShell>
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <ProfilePanel />
          <CapabilityPanel />
      </section>
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <TimelinePanel />
          <ContactPanel />
      </section>
    </PortfolioShell>
  );
}

function Navigation({ theme, onThemeToggle }: { theme: "light" | "dark"; onThemeToggle: () => void }) {
  const pathname = usePathname();

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <>
      <nav className="fixed left-1/2 top-4 z-40 hidden -translate-x-1/2 rounded-full border border-line/70 bg-surface/78 px-2 py-2 shadow-soft backdrop-blur-xl md:block">
        <div className="flex items-center gap-1">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={section.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition hover:bg-accentSoft/60 hover:text-ink",
                isActive(section.href) ? "bg-accentSoft text-ink" : "text-muted"
              )}
            >
              {section.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={onThemeToggle}
            className="ml-1 inline-flex size-9 items-center justify-center rounded-full border border-line/70 text-muted transition hover:border-accent/40 hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </nav>

      <nav className="fixed inset-x-3 bottom-3 z-40 rounded-full border border-line/70 bg-surface/88 px-2 py-2 shadow-soft backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-5 gap-1">
          {sections.map((section) => {
            const Icon = sectionIcons[section.id as keyof typeof sectionIcons];
            return (
              <Link
                key={section.id}
                href={section.href}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-full transition hover:bg-accentSoft/60 hover:text-ink",
                  isActive(section.href) ? "bg-accentSoft text-ink" : "text-muted"
                )}
                aria-label={section.label}
              >
                <Icon size={18} />
              </Link>
            );
          })}
          <button
            type="button"
            onClick={onThemeToggle}
            className="inline-flex h-11 items-center justify-center rounded-full text-muted transition hover:bg-accentSoft/60 hover:text-ink"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </>
  );
}

function AmbientField({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 opacity-70"
      animate={reducedMotion ? undefined : { x: [0, 18, -10, 0], y: [0, -12, 8, 0] }}
      transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
    >
      <div className="absolute left-[12%] top-[18%] h-48 w-48 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute right-[8%] top-[42%] h-60 w-60 rounded-full bg-violet-400/10 blur-3xl" />
      <div className="absolute bottom-[8%] left-[35%] h-52 w-52 rounded-full bg-blue-400/10 blur-3xl" />
    </motion.div>
  );
}

function SectionHeader({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{body}</p>
    </div>
  );
}

function FilterBar({
  filter,
  onFilterChange
}: {
  filter: "all" | PortfolioItem["type"];
  onFilterChange: (filter: "all" | PortfolioItem["type"]) => void;
}) {
  const filters: Array<["all" | PortfolioItem["type"], string]> = [
    ["all", "All"],
    ["project", "Projects"],
    ["writing", "Writing"],
    ["capability", "CV"]
  ];

  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {filters.map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onFilterChange(value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            filter === value
              ? "border-accent/45 bg-accentSoft text-ink"
              : "border-line/70 bg-surface/45 text-muted hover:border-accent/35 hover:text-ink"
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function TileGrid({
  items,
  previewed,
  onPreview,
  onSelect
}: {
  items: PortfolioItem[];
  previewed: string | null;
  onPreview: (id: string | null) => void;
  onSelect: (item: PortfolioItem) => void;
}) {
  return (
    <motion.div layout className="grid auto-rows-[minmax(220px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
      {items.map((item) => (
        <InteractiveTile
          key={item.id}
          item={item}
          active={previewed === item.id}
          onPreview={onPreview}
          onSelect={onSelect}
        />
      ))}
    </motion.div>
  );
}

function InteractiveTile({
  item,
  active,
  onPreview,
  onSelect
}: {
  item: PortfolioItem;
  active: boolean;
  onPreview: (id: string | null) => void;
  onSelect: (item: PortfolioItem) => void;
}) {
  const span = item.size === "large" ? "md:col-span-4" : item.size === "medium" ? "md:col-span-3" : "md:col-span-2";

  function handleClick() {
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    if (mobile && !active) {
      onPreview(item.id);
      return;
    }
    onSelect(item);
  }

  return (
    <motion.button
      layoutId={`tile-${item.id}`}
      type="button"
      onClick={handleClick}
      onMouseEnter={() => onPreview(item.id)}
      onMouseLeave={() => onPreview(null)}
      whileHover={{ scale: 1.018, y: -3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("group min-h-[220px] text-left", span)}
    >
      <Surface interactive className="relative flex h-full min-h-[220px] flex-col overflow-hidden p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{item.eyebrow}</p>
            <h3 className="mt-3 text-2xl font-semibold leading-tight text-ink">{item.title}</h3>
          </div>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-canvas/35 text-accent">
            <item.icon size={18} />
          </span>
        </div>

        <p className="mt-4 max-w-xl text-sm leading-6 text-muted">{item.summary}</p>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-accentSoft/55 px-3 py-1 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>
          <PreviewLayer item={item} active={active} />
        </div>
      </Surface>
    </motion.button>
  );
}

function PreviewLayer({ item, active }: { item: PortfolioItem; active: boolean }) {
  return (
    <div className="relative h-16 overflow-hidden rounded-[8px] border border-line/60 bg-canvas/42">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-accent/10 via-transparent to-blue-400/10"
        animate={{ x: active ? ["-40%", "15%", "0%"] : "-45%" }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <div className="relative flex h-full items-center justify-between gap-3 px-4">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">{typeLabels[item.type]}</p>
        <motion.p
          initial={false}
          animate={{ opacity: active ? 1 : 0.58, filter: active ? "blur(0px)" : "blur(1.5px)" }}
          className="truncate text-sm text-ink"
        >
          {active ? item.preview : "Preview on hover"}
        </motion.p>
      </div>
    </div>
  );
}

function SystemMap({ onSelect }: { onSelect: (item: PortfolioItem) => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 90, damping: 18 });
  const springY = useSpring(y, { stiffness: 90, damping: 18 });
  const rotateX = useTransform(springY, [-40, 40], [3, -3]);
  const rotateY = useTransform(springX, [-40, 40], [-3, 3]);

  return (
    <motion.div
      style={{ rotateX, rotateY }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="perspective-1000"
    >
      <Surface className="relative min-h-[460px] overflow-hidden p-5 sm:p-7">
        <div className="absolute inset-x-0 top-1/2 h-px bg-line/60" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-line/50" />
        <div className="relative grid h-full min-h-[410px] grid-cols-2 gap-4">
          {portfolioItems.slice(0, 4).map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelect(item)}
              className="flex min-h-40 flex-col justify-between rounded-[8px] border border-line/70 bg-canvas/45 p-4 text-left transition hover:border-accent/40 hover:bg-accentSoft/35"
            >
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface/70 text-accent">
                <item.icon size={17} />
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-muted">0{index + 1}</p>
                <h3 className="mt-2 text-base font-semibold text-ink">{item.title}</h3>
              </div>
            </button>
          ))}
        </div>
      </Surface>
    </motion.div>
  );
}

function ReadingPanel({ onSelect }: { onSelect: (item: PortfolioItem) => void }) {
  const writing = portfolioItems.filter((item) => item.type === "writing");

  return (
    <div className="space-y-3">
      {writing.map((item) => (
        <button key={item.id} type="button" onClick={() => onSelect(item)} className="block w-full text-left">
          <Surface interactive className="p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">{item.eyebrow}</p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{item.summary}</p>
          </Surface>
        </button>
      ))}
    </div>
  );
}

function CapabilityPanel() {
  return (
    <Surface className="p-7 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">CV / Capabilities</p>
      <h2 className="mt-4 text-3xl font-semibold text-ink">Security Engineer profile</h2>
      <div className="mt-7 grid gap-3 sm:grid-cols-2">
        {["Application security", "Mobile assessment", "CI/CD hardening", "Developer enablement", "Threat modeling", "Secure architecture"].map((skill) => (
          <div key={skill} className="rounded-[8px] border border-line/70 bg-canvas/36 p-4">
            <p className="text-sm font-medium text-ink">{skill}</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line/50">
              <motion.div
                className="h-full rounded-full bg-accent/70"
                initial={{ width: "18%" }}
                whileInView={{ width: `${62 + (skill.length % 25)}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ProfilePanel() {
  return (
    <Surface className="p-7 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Profile summary</p>
      <h1 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Security Engineer profile</h1>
      <p className="mt-5 text-base leading-7 text-muted sm:text-lg">
        Application security and mobile-focused engineering practice with a bias toward useful evidence, calm collaboration, and systems that make risk easier to reason about.
      </p>
      <div className="mt-7 flex flex-wrap gap-2">
        {["AppSec", "Mobile", "DevSecOps", "Threat modeling", "Secure SDLC"].map((tag) => (
          <span key={tag} className="rounded-full border border-line/70 bg-accentSoft/45 px-4 py-2 text-sm text-muted">
            {tag}
          </span>
        ))}
      </div>
    </Surface>
  );
}

function TimelinePanel() {
  const moments = ["Mapped product risk into reviewable engineering systems", "Built reusable AppSec and mobile testing workflows", "Connected findings to fixes, automation, and team practice"];

  return (
    <Surface className="p-7 sm:p-8">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Experience timeline</p>
      <div className="mt-8 space-y-6">
        {moments.map((moment, index) => (
          <div key={moment} className="grid grid-cols-[2.5rem_1fr] gap-4">
            <div className="flex flex-col items-center">
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-accent/30 bg-accentSoft text-sm text-ink">
                {index + 1}
              </span>
              {index < moments.length - 1 && <span className="mt-3 h-12 w-px bg-line" />}
            </div>
            <p className="pt-2 text-base leading-7 text-muted">{moment}</p>
          </div>
        ))}
      </div>
    </Surface>
  );
}

function ContactPanel() {
  const links = [
    { label: "hello@example.com", href: "mailto:hello@example.com", icon: Mail },
    { label: "WhatsApp", href: "https://wa.me/254700000000", icon: MessageCircle },
    { label: "GitHub", href: "https://github.com/example", icon: Github }
  ];

  return (
    <Surface className="grid gap-8 p-7 sm:p-8">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Contact</p>
        <h2 className="mt-4 text-3xl font-semibold text-ink">Open, direct, low ceremony.</h2>
      </div>
      <div className="space-y-5 text-muted">
        <p className="text-base leading-7">
          For security engineering, AppSec review, mobile testing, or calm technical collaboration, the best starting point is a short message with the system, risk, or idea you want to explore.
        </p>
        <div className="flex flex-wrap gap-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accentSoft/70 px-5 py-3 text-sm font-medium text-ink transition hover:border-accent/60 hover:bg-accentSoft"
              >
                <Icon size={16} />
                {link.label}
                <ArrowUpRight size={15} />
              </a>
            );
          })}
        </div>
      </div>
    </Surface>
  );
}

function FocusView({ item, onClose }: { item: PortfolioItem; onClose: () => void }) {
  return (
    <motion.div className="fixed inset-0 z-50 overflow-y-auto bg-canvas/82 p-4 backdrop-blur-xl sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="mx-auto flex min-h-full max-w-5xl items-center">
        <motion.article
          layoutId={`tile-${item.id}`}
          className="relative w-full overflow-hidden rounded-[8px] border border-line bg-surface p-6 shadow-soft dark:shadow-soft-dark sm:p-9"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-line/70 text-muted transition hover:border-accent/40 hover:text-ink"
            aria-label="Close focus view"
          >
            <X size={18} />
          </button>

          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{item.eyebrow}</p>
            <h2 className="mt-4 text-4xl font-semibold text-ink sm:text-6xl">{item.title}</h2>
            <p className="mt-6 text-lg leading-8 text-muted">{item.summary}</p>
          </div>

          <div className="mt-9 grid gap-4 lg:grid-cols-3">
            {[
              ["Problem", item.detail.problem],
              ["Approach", item.detail.approach],
              ["Outcome", item.detail.outcome]
            ].map(([label, text]) => (
              <div key={label} className="rounded-[8px] border border-line/70 bg-canvas/35 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted">{label}</h3>
                <p className="mt-4 text-sm leading-6 text-ink">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <h3 className="text-lg font-semibold text-ink">Notes</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.detail.notes.map((note) => (
                  <span key={note} className="rounded-full border border-line/70 bg-accentSoft/45 px-4 py-2 text-sm text-muted">
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-ink">Connected context</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.links.map((link) => (
                  <span key={link} className="rounded-full border border-line/70 px-4 py-2 text-sm text-muted">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </motion.div>
  );
}
