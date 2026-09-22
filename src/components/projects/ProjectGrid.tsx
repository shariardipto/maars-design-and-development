"use client";

import { useMemo, useState } from "react";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projects";

export default function ProjectGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.category)))],
    [projects],
  );
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <div className="mb-12 flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors ${
              active === category
                ? "bg-[#ff7e44] text-white"
                : "bg-[#f5f5f5] text-[#191919] hover:bg-[#ececec]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
