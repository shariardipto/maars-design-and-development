import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/layout/PageBanner";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ContactCTA from "@/components/home/ContactCTA";
import { getProjectBySlug, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return {
    title: project ? project.title : "Project",
    description: project?.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <PageBanner title={project.title} crumb={project.title} />

      <section className="bg-white py-[110px]">
        <div className="mddl-container">
          <div className="relative mb-16 aspect-[16/9] w-full overflow-hidden">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              priority
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-1 gap-16 md:grid-cols-[2fr_1fr]">
            <div>
              <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1px] md:text-[34px]">
                Project overview
              </h2>
              <p className="mt-6 text-[14px] leading-[1.9] text-[#777]">{project.description}</p>
            </div>

            <div className="flex flex-col gap-6 border-l border-[#e5e5e5] pl-8">
              <div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">
                  Category
                </div>
                <div className="mt-1 text-[14px] font-semibold text-[#161616]">
                  {project.category}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">
                  Location
                </div>
                <div className="mt-1 text-[14px] font-semibold text-[#161616]">
                  {project.location}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">Year</div>
                <div className="mt-1 text-[14px] font-semibold text-[#161616]">
                  {project.year}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <ProjectGallery images={project.gallery} title={project.title} />
          </div>

          <div className="mt-16">
            <Link
              href="/projects"
              className="inline-flex h-[46px] items-center justify-center bg-[#161616] px-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7844]"
            >
              Back to All Projects
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
