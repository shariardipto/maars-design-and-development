import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ContactCTA from "@/components/home/ContactCTA";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse MDDL's residential architecture and interior design projects.",
};

export default function ProjectsPage() {
  return (
    <main>
      <PageBanner title="Projects" crumb="Projects" />

      <section className="bg-white py-[110px]">
        <div className="mddl-container">
          <p className="mb-16 max-w-[560px] text-[13px] leading-[1.9] text-[#777]">
            A selection of residential architecture and interior design work, spanning full
            builds, renovations and standalone interiors.
          </p>

          <ProjectGrid projects={projects} />
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
