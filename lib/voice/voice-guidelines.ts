export const unifiedVoiceSystem = {
  name: "Unified Voice System",
  scope: ["Home page", "CV page", "Work page", "Writing page"],
  coreVoice: [
    "Use first-person or implied first-person language.",
    "Keep the tone grounded in engineering work.",
    "Write direct sentences.",
    "Avoid marketing language and abstract filler phrasing."
  ],
  sentenceStyle: {
    guidance: "Use short to medium sentences with action verbs.",
    preferredVerbs: ["built", "tested", "analyzed", "integrated"],
    avoid: ["cutting-edge", "robust system", "innovative solution", "comprehensive framework"]
  },
  emotionalTone: ["calm", "technical", "minimal", "controlled"],
  pageRoles: {
    home: "Simple introduction",
    cv: "Precise identity and experience",
    work: "Systems built and outcomes",
    writing: "Thinking and experiments"
  },
  consistencyRule: "Voice stays the same; only depth changes.",
  exampleTransformation: {
    bad: "This page showcases a structured portfolio system...",
    good: "This shows what I've built and how it behaves in practice."
  }
} as const;
