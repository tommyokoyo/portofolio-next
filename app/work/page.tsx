import { getAllProjects } from "@/components/work/projects";
import { WorkCaseStudyGrid } from "@/components/work/work-case-study-grid";

export default function Work() {
  return <WorkCaseStudyGrid projects={getAllProjects()} />;
}
