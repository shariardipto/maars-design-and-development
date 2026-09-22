import type { Metadata } from "next";
import PageBanner from "@/components/layout/PageBanner";
import ContactForm from "@/components/contact/ContactForm";
import { getConfig } from "@/lib/server/repository";
export const metadata:Metadata={title:"Contact",description:"Talk to MDDL about your next architecture or interior design project."};
export default function ContactPage(){
 const settings=getConfig("settings");
 const socials=[{label:"Instagram",href:settings.instagram},{label:"Facebook",href:settings.facebook},{label:"LinkedIn",href:settings.linkedin},{label:"Twitter",href:settings.twitter}].filter((s)=>s.href);
 return <main><PageBanner title="Ready to start a project? Let's talk." crumb="Contact"/><section className="studio-section"><div className="mddl-container grid grid-cols-1 gap-16 md:grid-cols-[1.4fr_1fr]"><div data-reveal><p className="eyebrow">Send a message</p><h2 className="mb-10 text-3xl font-bold">Tell us about your project</h2><ContactForm/></div><div className="space-y-9" data-reveal>{settings.phone&&<div><p className="eyebrow">Phone</p><a className="text-xl" href={`tel:${settings.phone.replace(/[^+\d]/g,"")}`}>{settings.phone}</a></div>}{settings.email&&<div><p className="eyebrow">Email</p><a className="text-xl" href={`mailto:${settings.email}`}>{settings.email}</a></div>}{settings.address&&<div><p className="eyebrow">Studio address</p><p className="max-w-sm text-xl">{settings.address}</p></div>}{socials.length>0&&<div><p className="eyebrow">Follow us</p><div className="flex flex-wrap gap-5">{socials.map((s)=><a key={s.label} href={s.href} target="_blank" rel="noreferrer">{s.label} ↗</a>)}</div></div>}<p className="text-gray-500">Your enquiry is saved securely for our studio team. Please do not include sensitive personal information.</p></div></div></section></main>;
}
