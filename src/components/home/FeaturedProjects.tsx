import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/lib/projects";

export default function FeaturedProjects() {
  const featured = projects.slice(0, 6);

  return (
    <section className="bg-[#f5f5f5] py-[110px]">
      <div className="mddl-container">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[520px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7844]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#777]">
                Our Portfolio
              </span>
            </div>

            <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
              Selected works
            </h2>
          </div>

          <Link
            href="/projects"
            className="inline-flex h-[46px] items-center justify-center bg-[#161616] px-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7844]"
          >
            View All Projects
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
