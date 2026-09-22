import Image from "next/image";
import type { SiteContent } from "@/lib/config";
export default function ProcessSection({ content }: { content: SiteContent }) {
  return <section className="studio-section process-section"><div className="outline-word" aria-hidden="true">Our process</div><div className="mddl-container process-grid">
    <div className="process-visual" data-reveal="image"><Image src={content.processImage} alt="Architectural detail and natural light" fill sizes="(max-width: 767px) 90vw, 42vw" className="object-cover" /></div>
    <div className="process-content"><div className="section-copy" data-reveal><p className="eyebrow">Our process</p><h2>{content.processTitle}</h2><div className="short-rule" /><p>{content.processDescription}</p></div><div className="process-cards">{content.steps.map((step,index) => <article key={index} data-reveal><span>{String(index+1).padStart(2,"0")}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}</div></div>
  </div></section>;
}
