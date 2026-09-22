import type { SiteContent } from "@/lib/config";

export default function ClientLogos({ content }: { content: SiteContent }) {
  if (content.clients.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="mddl-container">
        <p className="mb-10 text-center text-[10px] uppercase tracking-[0.12em] text-[#999]">
          Trusted by teams and homeowners across the country
        </p>

        <div className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {content.clients.map((client) => (
            <div
              key={client}
              className="flex items-center justify-center text-[16px] font-bold tracking-[0.04em] text-[#191919]/30 transition-colors hover:text-[#191919]"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
