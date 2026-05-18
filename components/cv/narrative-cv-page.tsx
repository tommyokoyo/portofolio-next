"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PortfolioShell } from "@/components/portfolio-system";
import { Surface } from "@/components/surface";
import { cn } from "@/lib/utils";

type CapabilityGroup = {
  title: string;
  description: string;
  details: string;
  items: string[];
};

type ExperienceEntry = {
  title: string;
  company: string;
  range: string;
  context: string;
  systemWork: string[];
  execution: string;
  impact: string;
};

const focusTags = ["Application Security", "Mobile Security", "DevSecOps", "API Security", "Runtime Analysis"];

const capabilities: CapabilityGroup[] = [
  {
    title: "Application Security",
    description:
      "I focus on identifying and fixing security issues in APIs and backend systems, especially around authentication, authorization, and business logic flaws.",
    details: "I use Burp Suite, OWASP ZAP, SQLMap, and secure code review to validate issues and give developers clear remediation guidance.",
    items: ["API security testing", "Authentication/authorization analysis", "Secure code review", "OWASP Top 10 mapping"]
  },
  {
    title: "Mobile Security",
    description:
      "I work on Android application security testing using runtime analysis and instrumentation techniques to understand and validate app behavior under tampering and reverse engineering.",
    details: "I use Frida-based workflows for runtime analysis, tamper detection testing, SSL pinning validation, and behavioral inspection.",
    items: ["Android application analysis", "Runtime instrumentation", "Frida-based testing workflows", "Tamper detection strategies", "Reverse engineering workflows"]
  },
  {
    title: "DevSecOps Engineering",
    description:
      "I integrate security checks into CI/CD pipelines and work with developers to ensure vulnerabilities are detected early during the software delivery process.",
    details: "I have worked with GitHub Actions, GitLab CI/CD, Jenkins, Docker, OWASP ZAP, and Burp Suite in delivery workflows.",
    items: ["CI/CD security integration", "SAST / DAST pipeline integration", "Secure build pipelines", "Container security basics"]
  },
  {
    title: "Systems & Tooling",
    description: "I build and use tooling to support security testing, automation, and analysis across distributed systems and APIs.",
    details: "This includes scripting, API analysis, network analysis with Wireshark and Nmap, and small tools that make testing easier to repeat.",
    items: ["Distributed system understanding", "API systems analysis", "Security automation", "Scripting and tooling"]
  }
];

const experience: ExperienceEntry[] = [
  {
    title: "Information Security Analyst",
    company: "Current Role",
    range: "Current",
    context: "Fintech application security testing across mobile apps, web applications, APIs, cloud services, and internet-facing systems.",
    systemWork: [
      "Simulated attack scenarios against mobile and web applications to test resilience against reverse engineering, runtime manipulation, and unauthorized access.",
      "Led developer training sessions on secure coding practices, OWASP Top 10 risks, and common application vulnerabilities.",
      "Built custom Frida scripts for Android runtime analysis, tamper detection testing, and SSL pinning validation.",
      "Integrated security testing into CI/CD pipelines using OWASP ZAP and Burp Suite to improve early vulnerability detection.",
      "Performed secure code reviews across Java, Node.js, and Python services and provided remediation guidance based on OWASP best practices.",
      "Worked with clients to improve cloud and internet-facing system security by identifying exposure risks and recommending hardening improvements."
    ],
    execution: "Frida, Burp Suite, OWASP ZAP, Java, Node.js, Python, CI/CD security testing, secure code review, and cloud exposure review.",
    impact: "Improved early vulnerability detection, reduced pre-production security risks, and helped developers fix issues with clearer guidance."
  },
  {
    title: "Junior Information Security Analyst",
    company: "Previous Role",
    range: "Previous",
    context: "Vulnerability assessment work for web applications, APIs, networks, and development environments.",
    systemWork: [
      "Performed vulnerability assessments on web applications and APIs to identify security weaknesses before deployment.",
      "Worked with development teams to fix insecure coding patterns and configuration issues.",
      "Analyzed network traffic using Wireshark to detect unauthorized devices, rogue access points, and suspicious activity.",
      "Participated in security awareness training focused on phishing, credential safety, and secure development practices.",
      "Researched emerging security threats and tools to support internal security improvements."
    ],
    execution: "Burp Suite, Wireshark, Nmap, SQLMap, vulnerability assessment, API testing, configuration review, and developer support.",
    impact: "Helped teams identify issues earlier, fix insecure patterns, and improve day-to-day security awareness."
  },
  {
    title: "Information Security Intern",
    company: "Internship",
    range: "Early Experience",
    context: "Entry-level security support across network reconnaissance, awareness training, monitoring, and internal testing.",
    systemWork: [
      "Assisted in network reconnaissance and asset discovery to identify exposed services and potential security risks.",
      "Supported security awareness programs covering phishing, social engineering, and secure system usage.",
      "Monitored emerging threats in the financial sector and contributed to internal security reporting.",
      "Participated in basic vulnerability testing of internal systems and applications."
    ],
    execution: "Network reconnaissance, asset discovery, basic vulnerability testing, threat monitoring, and internal security reporting.",
    impact: "Built a practical foundation in vulnerability testing, security reporting, and financial-sector threat awareness."
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" }
};

export function NarrativeCvPage() {
  return (
    <PortfolioShell>
      <IdentityLayer />
      <CapabilitySystem />
      <ExperienceTimeline />
      <ContactLayer />
    </PortfolioShell>
  );
}

function IdentityLayer() {
  return (
    <section>
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-4xl"
      >
        <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-muted">CV / Capabilities</p>
        <h1 className="text-5xl font-semibold tracking-normal text-ink sm:text-6xl lg:text-7xl">Security Engineer</h1>
        <p className="mt-7 max-w-3xl text-base leading-7 text-muted sm:text-lg">
          Security Engineer with 4+ years of experience in application security, mobile security, and DevSecOps within fintech environments. I work on securing APIs, improving CI/CD security workflows, and analyzing application behavior through both static and runtime techniques.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {focusTags.map((tag) => (
            <span key={tag} className="rounded-full border border-line/70 bg-surface/60 px-4 py-2 text-sm text-muted">
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function CapabilitySystem() {
  return (
    <section>
      <SectionIntro
        kicker="Security areas"
        title="What I work on."
        body="A direct view of the main areas I work across in application security, mobile testing, DevSecOps, and tooling."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {capabilities.map((capability, index) => (
          <CapabilityCard key={capability.title} capability={capability} index={index} />
        ))}
      </div>
    </section>
  );
}

function CapabilityCard({ capability, index }: { capability: CapabilityGroup; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => setExpanded((current) => !current)}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, scale: 1.012 }}
      className="text-left"
    >
      <Surface
        interactive
        className={cn(
          "h-full min-h-[310px] p-6",
          expanded && "border-accent/40 bg-surface/88"
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">Area 0{index + 1}</p>
            <h2 className="mt-3 text-2xl font-semibold text-ink">{capability.title}</h2>
          </div>
          <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-canvas/35 text-accent">
            <ShieldCheck size={18} />
          </span>
        </div>

        <p className="mt-5 text-sm leading-6 text-muted">{capability.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {capability.items.map((item) => (
            <span key={item} className="rounded-full bg-accentSoft/55 px-3 py-1 text-xs text-muted">
              {item}
            </span>
          ))}
        </div>

        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <p className="mt-6 border-t border-line/60 pt-5 text-sm leading-6 text-ink">{capability.details}</p>
        </motion.div>
      </Surface>
    </motion.button>
  );
}

function ExperienceTimeline() {
  return (
    <section>
      <SectionIntro
        kicker="Experience"
        title="Security work and responsibilities."
        body="A summary of the application security, mobile testing, CI/CD security, and vulnerability assessment work I have done."
      />
      <div className="relative space-y-6">
        <motion.div
          aria-hidden="true"
          className="absolute bottom-8 left-4 top-8 hidden w-px origin-top bg-accent/30 sm:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        {experience.map((entry, index) => (
          <TimelineEntry key={`${entry.title}-${entry.range}`} entry={entry} index={index} />
        ))}
      </div>
    </section>
  );
}

function TimelineEntry({ entry, index }: { entry: ExperienceEntry; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid gap-4 sm:grid-cols-[2rem_1fr]"
    >
      <div className="hidden sm:flex sm:justify-center">
        <span className="relative z-10 mt-8 inline-flex size-8 items-center justify-center rounded-full border border-accent/30 bg-accentSoft text-sm text-ink">
          {index + 1}
        </span>
      </div>
      <Surface className="p-6 sm:p-7">
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{entry.company}</p>
            <h3 className="mt-3 text-2xl font-semibold text-ink">{entry.title}</h3>
          </div>
          <span className="w-fit rounded-full border border-line/70 bg-canvas/35 px-3 py-1 text-sm text-muted">{entry.range}</span>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <LayerBlock label="Environment" text={entry.context} />
          <LayerBlock label="Technical execution" text={entry.execution} />
        </div>

        <div className="mt-5 rounded-[8px] border border-line/70 bg-canvas/35 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Work performed</h4>
          <div className="mt-4 space-y-3">
            {entry.systemWork.map((item) => (
              <p key={item} className="text-sm leading-6 text-ink">{item}</p>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-[8px] border border-accent/20 bg-accentSoft/35 p-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Impact</h4>
          <p className="mt-4 text-sm leading-6 text-ink">{entry.impact}</p>
        </div>
      </Surface>
    </motion.article>
  );
}

function LayerBlock({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-[8px] border border-line/70 bg-canvas/35 p-5">
      <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">{label}</h4>
      <p className="mt-4 text-sm leading-6 text-ink">{text}</p>
    </div>
  );
}

function ContactLayer() {
  const links = [
    { label: "Email", value: "okoyotommy@gmail.com", href: "mailto:okoyotommy@gmail.com", icon: Mail },
    { label: "GitHub", value: "github.com/tommyokoyo", href: "https://github.com/tommyokoyo", icon: Github },
    { label: "Portfolio", value: "Return home", href: "/", icon: ArrowUpRight },
    { label: "WhatsApp", value: "Direct contact", href: "https://wa.me/254716210475", icon: MessageCircle }
  ];

  return (
    <section>
      <Surface className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">Let&apos;s Connect</p>
          <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">Open, direct, low ceremony.</h2>
          <p className="mt-5 text-base leading-7 text-muted">
            For AppSec, mobile security, DevSecOps, or technical collaboration, start with the system you want to understand.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((link) => {
            const Icon = link.icon;
            const content = (
              <>
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-line/70 bg-canvas/35 text-accent">
                  <Icon size={17} />
                </span>
                <span>
                  <span className="block text-sm font-medium text-ink">{link.label}</span>
                  <span className="mt-1 block text-sm text-muted">{link.value}</span>
                </span>
              </>
            );

            const className =
              "flex w-full items-center gap-3 rounded-[8px] border border-accent/25 bg-accentSoft/45 p-4 text-left transition hover:border-accent/50 hover:bg-accentSoft/70 hover:shadow-soft";

            return link.href === "/" ? (
              <Link key={link.label} href={link.href} className={className}>
                {content}
              </Link>
            ) : (
              <a key={link.label} href={link.href} className={className}>
                {content}
              </a>
            );
          })}
        </div>
      </Surface>
    </section>
  );
}

function SectionIntro({ kicker, title, body }: { kicker: string; title: string; body: string }) {
  return (
    <div className="mb-7 max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.18em] text-muted">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold text-ink sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-7 text-muted sm:text-lg">{body}</p>
    </div>
  );
}
