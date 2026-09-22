import Link from "next/link";

type PageBannerProps = {
  title: string;
  crumb: string;
};

export default function PageBanner({ title, crumb }: PageBannerProps) {
  return (
    <section className="bg-[#161616] pb-16 pt-[160px] text-white">
      <div className="mddl-container">
        <div className="mb-4 flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-white/50">
          <Link href="/" className="hover:text-[#ff7844]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#ff7844]">{crumb}</span>
        </div>

        <h1 className="max-w-[720px] text-[40px] font-bold leading-[1.1] tracking-[-1px] md:text-[56px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
