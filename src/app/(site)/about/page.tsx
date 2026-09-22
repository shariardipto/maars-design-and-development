import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "@/components/layout/PageBanner";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about MDDL — our team, our process and the values behind every project.",
};

const team = [
  { name: "Amara Whitfield", role: "Principal Architect" },
  { name: "Jonas Kessler", role: "Interior Design Lead" },
  { name: "Priya Anand", role: "Project Manager" },
  { name: "Elliot Marsh", role: "3D Visualization Artist" },
  { name: "Sofia Bianchi", role: "Landscape Designer" },
  { name: "Marcus Lindqvist", role: "Construction Lead" },
];

const stats = [
  { value: "180+", label: "Completed Projects" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "220+", label: "Projects Launched" },
  { value: "45+", label: "Materials Sourced" },
];

const regions = ["Nashville, TN", "Grapevine, TX", "Austin, TX", "Dallas, TX"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("");
}

export default function AboutPage() {
  return (
    <main>
      <PageBanner title="About Us" crumb="About" />

      {/* INTRO */}
      <section className="bg-white py-[110px]">
        <div className="mddl-container grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="relative aspect-[4/3]">
            <Image
              src="/images/home/2024_10_05_11_11_IMG_2082.JPG"
              alt="MDDL studio interior"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7e44]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#7a7a7a]">
                Who We Are
              </span>
            </div>

            <h2 className="max-w-[420px] text-[38px] font-bold leading-[1.05] tracking-[-1.5px] md:text-[50px]">
              We design & build interiors that people actually live in
            </h2>

            <p className="mt-6 max-w-[440px] text-[13px] leading-[1.9] text-[#7a7a7a]">
              MDDL is a small studio of architects, interior designers and builders who believe
              good design is measured by how a space is used, not just how it photographs.
            </p>

            <p className="mt-4 max-w-[440px] text-[13px] leading-[1.9] text-[#7a7a7a]">
              We work across residential and light commercial projects, staying involved from
              the first sketch through to the final coat of paint.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-[#f5f5f5] py-[110px]">
        <div className="mddl-container">
          <div className="mb-16 max-w-[520px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7e44]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#7a7a7a]">
                Our Team
              </span>
            </div>

            <h2 className="text-[42px] font-bold leading-[1.05] tracking-[-1.5px] md:text-[58px]">
              Meet the people behind MDDL
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto flex h-[84px] w-[84px] items-center justify-center rounded-full bg-[#191919] text-[20px] font-semibold text-white">
                  {initials(member.name)}
                </div>

                <div className="mt-4 text-[14px] font-semibold text-[#191919]">
                  {member.name}
                </div>
                <div className="text-[12px] text-[#888]">{member.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-[#191919] py-[90px] text-white">
        <div className="mddl-container grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[36px] font-bold text-[#ff7e44] md:text-[44px]">
                {stat.value}
              </div>
              <div className="mt-2 text-[12px] uppercase tracking-[0.08em] text-white/60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WE BUILD VALUE */}
      <section className="bg-white py-[110px]">
        <div className="mddl-container grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7e44]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#7a7a7a]">
                Our Values
              </span>
            </div>

            <h2 className="max-w-[420px] text-[38px] font-bold leading-[1.05] tracking-[-1.5px] md:text-[50px]">
              We build value, not just buildings
            </h2>

            <p className="mt-6 max-w-[440px] text-[13px] leading-[1.9] text-[#7a7a7a]">
              &ldquo;Good design should still feel right in ten years, not just on the day
              it&apos;s finished.&rdquo; It&apos;s a principle we return to on every project,
              from material choice to layout.
            </p>

            <Link
              href="/contact"
              className="mt-8 inline-flex h-[46px] items-center justify-center bg-[#191919] px-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#ff7e44]"
            >
              Work With Us
            </Link>
          </div>

          <div className="relative aspect-[4/3]">
            <Image
              src="/images/home/2024_10_05_11_09_IMG_2050.JPG"
              alt="MDDL interior detail"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHERE WE WORK */}
      <section className="bg-[#f5f5f5] py-[90px]">
        <div className="mddl-container text-center">
          <h3 className="text-[14px] uppercase tracking-[0.1em] text-[#7a7a7a]">Where we work</h3>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {regions.map((region) => (
              <span key={region} className="text-[18px] font-semibold text-[#191919]">
                {region}
              </span>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
