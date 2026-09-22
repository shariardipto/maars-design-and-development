import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/config";
export default function Specialization({ content }: { content: SiteContent }) {
  return <section className="studio-section specialization"><div className="outline-word" aria-hidden="true">Specialization</div><div className="mddl-container specialization-grid"><div className="specialization-visual" data-reveal="image"><Image src={content.specializationImage} alt="Contemporary architecture reaching toward the sky" fill className="object-cover" sizes="(max-width: 767px) 90vw, 45vw" /><div className="specialization-badge"><span aria-hidden="true">&#10035;</span><strong>Designed<br />around you.</strong></div></div><div className="section-copy" data-reveal><p className="eyebrow">Specialization</p><h2>{content.specializationTitle}</h2><p>{content.specializationDescription}</p><Link href="/services" className="studio-button">Read more <span aria-hidden="true">&#8599;</span></Link></div></div></section>;
}
