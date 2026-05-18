import { BookOpen, BriefcaseBusiness, Code2, Fingerprint, Radio, ShieldCheck, Smartphone, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type PortfolioItem = {
  id: string;
  type: "project" | "writing" | "capability";
  title: string;
  eyebrow: string;
  size: "small" | "medium" | "large";
  summary: string;
  preview: string;
  tags: string[];
  links: string[];
  icon: LucideIcon;
  detail: {
    problem: string;
    approach: string;
    outcome: string;
    notes: string[];
  };
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "insecure-api-lab",
    type: "project",
    title: "Insecure API Lab",
    eyebrow: "Project",
    size: "large",
    summary: "A guided environment for testing broken authorization, weak object references, and token mistakes.",
    preview: "Request -> policy check -> abuse case -> fix note",
    tags: ["API Security", "OWASP", "Node"],
    links: ["API security notes", "AppSec focus"],
    icon: ShieldCheck,
    detail: {
      problem: "Security learning often becomes abstract before engineers can touch the failure mode.",
      approach: "Built realistic endpoints, seeded vulnerable patterns, and paired each exploit path with a repair path.",
      outcome: "Turns API review into a repeatable lab exercise with clear risk framing.",
      notes: ["Broken object level authorization", "Token misuse scenarios", "Policy drift examples"]
    }
  },
  {
    id: "mobile-instrumentation-toolkit",
    type: "project",
    title: "Mobile Instrumentation Toolkit",
    eyebrow: "Project",
    size: "medium",
    summary: "A practical toolkit for observing mobile app behavior without drowning in raw traces.",
    preview: "Device -> capture -> annotate -> finding",
    tags: ["Mobile", "Instrumentation", "Frida"],
    links: ["mobile security insights", "AppSec + mobile focus"],
    icon: Smartphone,
    detail: {
      problem: "Mobile assessments can become scattered across devices, scripts, notes, and screenshots.",
      approach: "Collected repeatable instrumentation recipes and structured the output around behaviors.",
      outcome: "Reduced setup friction and made findings easier to reproduce.",
      notes: ["Runtime observation", "Network behavior", "Storage inspection"]
    }
  },
  {
    id: "mpesa-simulator",
    type: "project",
    title: "MPESA Simulator",
    eyebrow: "Project",
    size: "medium",
    summary: "A safe payment-flow simulator for testing callbacks, idempotency, and failure recovery.",
    preview: "Checkout -> callback -> reconcile -> retry",
    tags: ["Payments", "Reliability", "TypeScript"],
    links: ["CI/CD security thoughts", "DevSecOps experience"],
    icon: Radio,
    detail: {
      problem: "Payment integrations are hard to test calmly when every edge case feels expensive.",
      approach: "Modeled callback states, retry paths, and reconciliation checks as deterministic flows.",
      outcome: "Gives teams confidence before production money starts moving.",
      notes: ["Idempotency checks", "Callback verification", "Failure simulation"]
    }
  },
  {
    id: "auth-flow-analyzer",
    type: "project",
    title: "Auth Flow Analyzer",
    eyebrow: "Project",
    size: "small",
    summary: "A compact mapper for login, reset, session, and permission transitions.",
    preview: "Identity -> session -> permission -> boundary",
    tags: ["Auth", "Threat Modeling"],
    links: ["Security Engineer profile"],
    icon: Fingerprint,
    detail: {
      problem: "Auth flaws hide in transitions rather than in one isolated screen.",
      approach: "Represented each transition as a state with assumptions, checks, and abuse paths.",
      outcome: "Makes review conversations concrete and easier to prioritize.",
      notes: ["Session lifecycle", "MFA gaps", "Privilege transitions"]
    }
  },
  {
    id: "api-security-notes",
    type: "writing",
    title: "API Security Notes",
    eyebrow: "Writing",
    size: "medium",
    summary: "Short field notes on authorization, object references, tokens, and operational review habits.",
    preview: "The quiet failures are usually missing ownership checks.",
    tags: ["Writing", "API", "Review"],
    links: ["Insecure API Lab"],
    icon: BookOpen,
    detail: {
      problem: "Teams know API risks, but the review language often stays too generic.",
      approach: "Collected examples as concise notes that connect patterns to engineering decisions.",
      outcome: "A reading path that supports both builders and reviewers.",
      notes: ["Authorization first", "Use concrete abuse cases", "Prefer repairable language"]
    }
  },
  {
    id: "mobile-security-insights",
    type: "writing",
    title: "Mobile Security Insights",
    eyebrow: "Writing",
    size: "small",
    summary: "Observations from mobile testing: local trust, transport assumptions, and runtime behavior.",
    preview: "A mobile app is a distributed system with a pocket-sized edge node.",
    tags: ["Writing", "Mobile"],
    links: ["Mobile Instrumentation Toolkit"],
    icon: BookOpen,
    detail: {
      problem: "Mobile security discussions can collapse into checklist work too quickly.",
      approach: "Framed testing around behaviors, trust boundaries, and verifiable evidence.",
      outcome: "Keeps reviews practical while preserving engineering nuance.",
      notes: ["Local storage", "Certificate assumptions", "Runtime checks"]
    }
  },
  {
    id: "cicd-security-thoughts",
    type: "writing",
    title: "CI/CD Security Thoughts",
    eyebrow: "Writing",
    size: "small",
    summary: "A calm look at pipeline trust, release controls, and useful security automation.",
    preview: "A pipeline is production-adjacent long before deploy.",
    tags: ["Writing", "DevSecOps"],
    links: ["MPESA Simulator", "DevSecOps experience"],
    icon: Workflow,
    detail: {
      problem: "Pipeline security gets noisy when every warning is treated as equally urgent.",
      approach: "Separated trust boundaries, credential paths, and release gates into practical review layers.",
      outcome: "Creates a healthier path from finding to durable fix.",
      notes: ["Secrets exposure", "Branch protections", "Dependency review"]
    }
  },
  {
    id: "security-engineer-profile",
    type: "capability",
    title: "Security Engineer Profile",
    eyebrow: "CV",
    size: "large",
    summary: "A structured profile across AppSec, mobile, DevSecOps, review systems, and engineering collaboration.",
    preview: "Assess -> explain -> automate -> teach",
    tags: ["CV", "AppSec", "DevSecOps"],
    links: ["Insecure API Lab", "Auth Flow Analyzer"],
    icon: BriefcaseBusiness,
    detail: {
      problem: "Security work needs to be visible as a system, not only as a list of tools.",
      approach: "Grouped experience into capability clusters, timeline moments, and linked examples.",
      outcome: "Shows how projects, writing, and practice reinforce each other.",
      notes: ["Application security", "Mobile testing", "Developer enablement"]
    }
  },
  {
    id: "appsec-mobile-focus",
    type: "capability",
    title: "AppSec + Mobile Focus",
    eyebrow: "CV",
    size: "medium",
    summary: "Hands-on review across APIs, Android/iOS behavior, identity flows, and release systems.",
    preview: "Threat model -> test -> document -> improve",
    tags: ["CV", "Mobile", "API"],
    links: ["Mobile Instrumentation Toolkit", "mobile security insights"],
    icon: Code2,
    detail: {
      problem: "Security impact depends on joining technical depth with usable guidance.",
      approach: "Use structured testing, clear evidence, and repair-minded communication.",
      outcome: "Better fixes, calmer teams, and fewer repeated findings.",
      notes: ["API review", "Mobile instrumentation", "Secure SDLC"]
    }
  }
];

export const sections = [
  { id: "home", label: "Home", href: "/" },
  { id: "work", label: "Work", href: "/work" },
  { id: "writing", label: "Writing", href: "/writing" },
  { id: "cv", label: "CV", href: "/cv" }
];
