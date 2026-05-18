import { notFound } from "next/navigation";
import { WorkCaseStudyPage } from "@/components/work/work-case-study-page";
import { getAllProjects, getProjectBySlug } from "@/components/work/projects";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({
    slug: project.slug
  }));
}

export default async function ProjectCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <WorkCaseStudyPage project={project} />;
}
