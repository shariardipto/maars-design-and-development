import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/config";
export default function AboutIntro({ content }: { content: SiteContent }) {
  return <section className="studio-section about-section"><div className="mddl-container about-grid">
    <div className="section-copy" data-reveal><p className="eyebrow">About us</p><h2>{content.aboutTitle}</h2><div className="short-rule" /><p>{content.aboutDescription}</p><Link href="/about" className="studio-button">Read more <span aria-hidden="true">&#8599;</span></Link></div>
    <div className="about-visual" data-reveal="image"><Image src={content.aboutImage} alt="Light-filled contemporary interior" fill sizes="(max-width: 767px) 90vw, 55vw" className="object-cover" /><div className="about-caption"><strong>Beautiful Interior</strong>{content.videoUrl ? <a href={content.videoUrl} target="_blank" rel="noreferrer"><span aria-hidden="true">&#8599;</span> Watch video</a> : <Link href="/projects">Explore our work <span aria-hidden="true">&#8599;</span></Link>}</div></div>
  </div></section>;
}
