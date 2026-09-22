const testimonials = [
  {
    name: "Helena Cross",
    role: "Homeowner, Grapevine",
    quote:
      "MDDL turned a vague idea into a home that actually fits how we live. Every detail, from the light to the storage, was considered.",
  },
  {
    name: "David Okafor",
    role: "Restaurant Owner",
    quote:
      "The team managed our build from sketch to handover without a single surprise. Communication was clear at every stage.",
  },
  {
    name: "Mei Lin Tan",
    role: "Property Developer",
    quote:
      "Their 3D visualizations let us show units before construction even started. Genuinely some of the best renders we've used.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-white py-[110px]">
      <div className="mddl-container">
        <div className="mb-16 max-w-[520px]">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-[5px] w-[5px] bg-[#ff7844]" />
            <span className="text-[10px] uppercase tracking-[0.08em] text-[#777]">
              Testimonials
            </span>
          </div>

          <h2 className="text-[36px] font-bold leading-[1.1] tracking-[-1px] md:text-[42px]">
            What clients say
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-[#f5f5f5] p-8">
              <p className="text-[14px] leading-[1.9] text-[#444]">“{testimonial.quote}”</p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-[44px] w-[44px] items-center justify-center rounded-full bg-[#ff7844] text-[13px] font-semibold text-white">
                  {testimonial.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")}
                </div>

                <div>
                  <div className="text-[14px] font-semibold text-[#161616]">
                    {testimonial.name}
                  </div>
                  <div className="text-[12px] text-[#888]">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
