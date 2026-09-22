import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactCTA from "@/components/home/ContactCTA";
import { getConfig } from "@/lib/server/repository";
export const metadata:Metadata={title:"Services",description:"Architecture, interior design, construction and 3D visualization by MDDL."};
export default function ServicesPage(){
 const content=getConfig("content");
 return <main><PageBanner title="We are innovative." crumb="Our services"/><section className="studio-section"><div className="mddl-container"><div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">{content.services.map((s,i)=><article id={`service-${i+1}`} key={i} className="admin-panel scroll-mt-12" data-reveal><span className="text-5xl font-bold text-[#ff7e44]">{String(i+1).padStart(2,"0")}</span><h2 className="my-6 text-2xl font-bold">{s.title}</h2><p className="text-lg text-gray-500">{s.description}</p></article>)}</div></div></section><section className="studio-section bg-[#3e3e3e] text-white"><div className="mddl-container section-copy" data-reveal><p className="eyebrow text-white">Let's work together</p><h2>A thoughtful approach.<br/><em>From idea to completion.</em></h2><div className="mt-12 grid gap-10 md:grid-cols-3">{content.steps.map((s,i)=><div key={i}><span className="text-2xl text-[#ff7e44]">{String(i+1).padStart(2,"0")}</span><h3 className="my-4 text-2xl font-bold">{s.title}</h3><p className="text-white/75">{s.description}</p></div>)}</div></div></section><ContactCTA title={content.ctaTitle}/></main>;
}
