import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block aspect-[4/5] overflow-hidden bg-[#161616]"
    >
      <Image
        src={project.cover}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#ff7844]">
          {project.category}
        </span>
        <h3 className="mt-2 text-[19px] font-semibold leading-tight text-white">
          {project.title}
        </h3>
      </div>
    </Link>
  );
}
