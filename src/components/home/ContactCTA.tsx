import Link from "next/link";
export default function ContactCTA({ title = "Let's Talk About Your Project." }: { title?: string }) {
  return <section className="contact-cta" data-reveal><div><h2>{title}</h2><span className="cta-arrow" aria-hidden="true">&#10230;</span></div><Link className="studio-button" href="/contact">Contact us</Link></section>;
}
