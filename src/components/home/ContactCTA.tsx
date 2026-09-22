import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="bg-[#ff7844] py-[90px] text-white">
      <div className="mddl-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <h2 className="max-w-[560px] text-[32px] font-bold leading-[1.15] tracking-[-1px] md:text-[42px]">
          Ready to start your project? Let&apos;s talk.
        </h2>

        <Link
          href="/contact"
          className="inline-flex h-[52px] shrink-0 items-center justify-center bg-[#161616] px-9 text-[12px] font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-white hover:text-[#161616]"
        >
          Get In Touch
        </Link>
      </div>
    </section>
  );
}
