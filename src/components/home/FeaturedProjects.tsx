import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project } from "@/lib/projects";
export default function FeaturedProjects({ projects, title }: { projects: Project[]; title: string }) {
  if (!projects.length) return null;
  return <section className="studio-section featured-section"><div className="mddl-container"><div className="section-heading centered" data-reveal><p className="eyebrow">Projects</p><h2>{title}</h2><div className="short-rule" /></div><div className="project-grid">{projects.slice(0,6).map((project) => <div key={project.slug} data-reveal><ProjectCard project={project} /></div>)}</div><div className="section-action"><Link href="/projects" className="studio-button">View all projects <span aria-hidden="true">&#8599;</span></Link></div></div></section>;
}
