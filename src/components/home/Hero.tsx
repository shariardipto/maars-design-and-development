import Image from "next/image";
import Link from "next/link";
import type { SiteContent, SiteSettings } from "@/lib/config";
export default function Hero({ content, settings }: { content: SiteContent; settings: SiteSettings }) {
  const socials = [{ label: "TW", href: settings.twitter }, { label: "IG", href: settings.instagram }, { label: "FB", href: settings.facebook }, { label: "LN", href: settings.linkedin }].filter((item) => item.href);
  return <section className="hero" aria-label="Architecture and interior design">
    <div className="hero-dark" aria-hidden="true" /><div className="hero-orange" aria-hidden="true" />
    <div className="hero-outline" aria-hidden="true">{content.heroOutline}</div>
    <div className="hero-inner">
      <div className="hero-copy" data-reveal><h1>{content.heroTitle}{" "}<span>{content.heroAccent === "and Decor." ? <>and<br />Decor<span className="dark-dot">.</span></> : content.heroAccent}</span></h1></div>
      <div className="hero-landscape" data-reveal="image"><Image src={content.heroImage} alt="Modern home entrance and landscaped garden" fill priority sizes="(max-width: 767px) 90vw, 48vw" className="object-cover" /></div>
      <div className="hero-description" data-reveal><p>{content.heroDescription}</p><Link className="studio-button orange" href="/about">Read more <span aria-hidden="true">&#8599;</span></Link></div>
      <div className="hero-portrait" data-reveal="image"><Image src={content.heroSideImage} alt="Sculptural architectural facade" fill priority sizes="(max-width: 767px) 42vw, 36vw" className="object-cover" /></div>
      <aside className="hero-rail"><span>{new Date().getFullYear()}</span><i aria-hidden="true" />{socials.map((social) => <a key={social.label} href={social.href} target="_blank" rel="noreferrer">{social.label}</a>)}</aside>
    </div>
  </section>;
}
