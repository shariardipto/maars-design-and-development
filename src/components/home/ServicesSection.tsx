import Link from "next/link";

const services = [
  {
    title: "Furniture & Accessories",
    description:
      "Custom and curated furniture pieces selected to match the scale and material palette of each space.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path d="M4 13h16v6a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1v-1H7v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6Z" />
        <path d="M5 13V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4" />
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      </svg>
    ),
  },
  {
    title: "Construction",
    description:
      "End-to-end build management, from groundwork to finishing, with a dedicated site lead on every project.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path d="M3 21h18" />
        <path d="M5 21V10l7-5 7 5v11" />
        <path d="M10 21v-6h4v6" />
      </svg>
    ),
  },
  {
    title: "Architecture",
    description:
      "Concept-to-construction architectural design shaped around site, light and the way people move through space.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path d="M4 21V9l8-5 8 5v12" />
        <path d="M9 21v-7h6v7" />
        <path d="M4 12h16" />
      </svg>
    ),
  },
  {
    title: "3D Animation",
    description:
      "Photorealistic renders and walkthroughs that help clients see and refine a space before construction begins.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7">
        <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
        <path d="M12 12v9" />
        <path d="m4 7.5 8 4.5 8-4.5" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-[#161616] py-[110px] text-white">
      <div className="mddl-container">
        <div className="mb-16 max-w-[560px]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#ff7844]" />
            <span className="text-[10px] uppercase tracking-[0.08em] text-white/50">
              What We Do
            </span>
          </div>

          <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
            Our services
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div key={service.title} className="border-t border-white/10 pt-8">
              <div className="text-[#ff7844]">{service.icon}</div>

              <h3 className="mt-6 text-[18px] font-semibold">{service.title}</h3>

              <p className="mt-4 text-[13px] leading-[1.9] text-white/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <Link
            href="/services"
            className="inline-flex h-[46px] items-center justify-center bg-[#ff7844] px-7 text-[11px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#161616]"
          >
            All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
