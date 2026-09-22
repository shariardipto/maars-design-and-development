const steps = [
  {
    number: "01",
    title: "Client Needs",
    description:
      "We start by listening — understanding how you live, work and move through a space before a single line is drawn.",
  },
  {
    number: "02",
    title: "Planning Design",
    description:
      "Concepts are developed into detailed plans, balancing light, material and layout against budget and site constraints.",
  },
  {
    number: "03",
    title: "Architect Sketch",
    description:
      "Refined drawings and 3D visualizations bring the design to life, ready to guide construction from start to finish.",
  },
];

export default function ProcessSection() {
  return (
    <section className="bg-white py-[110px]">
      <div className="mddl-container">
        <div className="mb-16 max-w-[520px]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#ff7844]" />
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#777]">
              How We Work
            </span>
          </div>

          <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
            Our process
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-[#e5e5e5] pt-8">
              <span className="text-[15px] font-semibold text-[#ff7844]">{step.number}</span>
              <h3 className="mt-4 text-[22px] font-semibold text-[#161616]">{step.title}</h3>
              <p className="mt-4 text-[13px] leading-[1.9] text-[#777]">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
