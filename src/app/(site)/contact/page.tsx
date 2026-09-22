import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with MDDL to start your next architecture or interior design project.",
};

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function ContactPage() {
  return (
    <main>
      <PageBanner title="Ready to Start Your Project? Let's Talk." crumb="Contact" />

      <section className="bg-white py-[110px]">
        <div className="mddl-container grid grid-cols-1 gap-16 md:grid-cols-[1.4fr_1fr]">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="h-[5px] w-[5px] bg-[#ff7844]" />
              <span className="text-[10px] uppercase tracking-[0.08em] text-[#777]">
                Send A Message
              </span>
            </div>

            <h2 className="mb-10 text-[28px] font-bold leading-[1.15] tracking-[-1px] md:text-[34px]">
              Tell us about your project
            </h2>

            <ContactForm />
          </div>

          <div className="flex flex-col gap-10">
            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">Phone</div>
              <a
                href="tel:+18886541321"
                className="mt-2 block text-[18px] font-semibold text-[#161616] hover:text-[#ff7844]"
              >
                +1 (888) 654-321
              </a>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">Email</div>
              <a
                href="mailto:hello@mddl.studio"
                className="mt-2 block text-[18px] font-semibold text-[#161616] hover:text-[#ff7844]"
              >
                hello@mddl.studio
              </a>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-[0.08em] text-[#999]">
                Studio Address
              </div>
              <p className="mt-2 max-w-[260px] text-[15px] font-semibold leading-[1.6] text-[#161616]">
                41 Waldeck Avenue, Grapevine, Nashville, TX 76051
              </p>
            </div>

            <div>
              <div className="mb-3 text-[10px] uppercase tracking-[0.08em] text-[#999]">
                Follow Us
              </div>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-[40px] w-[40px] items-center justify-center border border-[#e5e5e5] text-[11px] font-semibold text-[#161616] transition-colors hover:border-[#ff7844] hover:text-[#ff7844]"
                  >
                    {social.label.slice(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="h-[420px] w-full">
        <iframe
          title="MDDL studio location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-86.8489%2C36.1327%2C-86.7489%2C36.2027&layer=mapnik"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </section>
    </main>
  );
}
