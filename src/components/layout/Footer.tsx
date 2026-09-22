import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const serviceLinks = ["Architecture", "Interior Design", "Construction", "3D Animation"];

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Facebook", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-[#161616] text-white">
      <div className="mddl-container grid grid-cols-1 gap-12 py-20 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <Image
            src="/branding/logo.png"
            alt="MDDL Logo"
            width={140}
            height={56}
            className="mb-6 w-[140px] brightness-0 invert"
          />
          <p className="max-w-[320px] text-[13px] leading-[1.9] text-white/60">
            MDDL creates thoughtful architectural and interior spaces through
            design, detail and a strong understanding of how people
            experience the built environment.
          </p>
        </div>

        <div>
          <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Explore
          </h3>
          <ul className="flex flex-col gap-4">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[14px] text-white/80 transition-colors hover:text-[#ff7844]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Services
          </h3>
          <ul className="flex flex-col gap-4">
            {serviceLinks.map((service) => (
              <li key={service} className="text-[14px] text-white/80">
                {service}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-6 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/40">
            Get In Touch
          </h3>
          <ul className="flex flex-col gap-3 text-[14px] text-white/80">
            <li>
              <a href="tel:+18886541321" className="hover:text-[#ff7844]">
                +1 (888) 654-321
              </a>
            </li>
            <li>
              <a href="mailto:hello@mddl.studio" className="hover:text-[#ff7844]">
                hello@mddl.studio
              </a>
            </li>
            <li className="max-w-[220px] leading-[1.7]">
              41 Waldeck Avenue, Grapevine, Nashville, TX 76051
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mddl-container flex flex-col items-center justify-between gap-4 py-6 text-[12px] text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} MDDL. All rights reserved.</p>

          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="transition-colors hover:text-[#ff7844]"
              >
                {social.label.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
