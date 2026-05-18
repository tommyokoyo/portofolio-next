import projects from "@/content/projects/projects.json";

export type WorkProject = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  externalUrl?: string;
  preview: {
    what: string;
    why: string;
    focus: string;
  };
  caseStudy: {
    context: string;
    problem: string;
    systemDesign: string[];
    technicalFocus: string[];
  };
};

export function getAllProjects() {
  return projects as WorkProject[];
}

export function getProjectBySlug(slug: string) {
  return getAllProjects().find((project) => project.slug === slug) ?? null;
}
