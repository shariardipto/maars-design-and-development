import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactCTA from "@/components/home/ContactCTA";

export const metadata: Metadata = {
  title: "Services",
  description: "Architecture, interior design, construction and 3D visualization services from MDDL.",
};

const services = [
  {
    number: "01",
    title: "Furniture & Accessories",
    description:
      "Custom and curated furniture selection tailored to the scale, material palette and budget of each room.",
  },
  {
    number: "02",
    title: "Construction",
    description:
      "Full site management from groundwork to handover, with a single point of contact throughout the build.",
  },
  {
    number: "03",
    title: "Architecture",
    description:
      "Concept-to-construction architectural design shaped by site conditions, light and how people move through space.",
  },
  {
    number: "04",
    title: "Design Project",
    description:
      "Detailed design development, material specification and drawings ready to hand to your builder.",
  },
  {
    number: "05",
    title: "3D Animation",
    description:
      "Photorealistic renders and walkthroughs so you can see, and adjust, a space before construction begins.",
  },
  {
    number: "06",
    title: "Office Design",
    description:
      "Workspace planning that balances focus, collaboration and brand identity for teams of any size.",
  },
];

const trust = [
  {
    number: "01",
    title: "10 Years Experience",
    description: "A decade of residential and commercial projects across the Southeast.",
  },
  {
    number: "02",
    title: "Best Team in Architecture",
    description: "Architects, designers and builders who work as one team, not separate vendors.",
  },
  {
    number: "03",
    title: "We Design Solutions",
    description:
      "Every recommendation is grounded in your budget, timeline and how you'll actually use the space.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <PageBanner title="Services" crumb="Services" />

      <section className="bg-white py-[110px]">
        <div className="mddl-container">
          <div className="mb-16 max-w-[560px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7844]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#777]">
                What We Offer
              </span>
            </div>

            <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
              We are innovative
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div key={service.number} className="border-t border-[#e5e5e5] pt-8">
                <span className="text-[15px] font-semibold text-[#ff7844]">{service.number}</span>
                <h3 className="mt-4 text-[19px] font-semibold text-[#161616]">{service.title}</h3>
                <p className="mt-4 text-[13px] leading-[1.9] text-[#777]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#161616] py-[110px] text-white">
        <div className="mddl-container">
          <div className="mb-16 max-w-[560px]">
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7844]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-white/50">
                Why MDDL
              </span>
            </div>

            <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
              Why choose & trust us
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {trust.map((item) => (
              <div key={item.number} className="border-t border-white/10 pt-8">
                <span className="text-[15px] font-semibold text-[#ff7844]">{item.number}</span>
                <h3 className="mt-4 text-[19px] font-semibold">{item.title}</h3>
                <p className="mt-4 text-[13px] leading-[1.9] text-white/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}
