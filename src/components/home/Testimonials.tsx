"use client";
import { useState } from "react";
import type { SiteContent } from "@/lib/config";
export default function Testimonials({ content }: { content: SiteContent }) {
  const [active,setActive] = useState(0); const items = content.testimonials;
  if (!items.length) return null;
  const quote = items[active % items.length];
  return <section className="studio-section testimonials-section"><div className="mddl-container testimonials-grid"><div className="section-copy" data-reveal><p className="eyebrow">Testimonial</p><h2>Our clients<br /><em>say.</em></h2><div className="short-rule" /><p>A shared vision. A considered process.<br />Spaces that make a difference.</p></div><div className="testimonial-carousel" aria-roledescription="carousel" aria-label="Client testimonials" data-reveal><span className="quote-mark" aria-hidden="true">&ldquo;</span><div aria-live="polite" aria-atomic="true"><blockquote key={active}><p>{quote.quote}</p><footer><span className="quote-avatar" aria-hidden="true">{quote.name.split(" ").map((p) => p[0]).slice(0,2).join("")}</span><div><strong>{quote.name}</strong><span>{quote.role}</span></div></footer></blockquote></div><div className="carousel-controls"><button onClick={() => setActive((active+items.length-1)%items.length)} aria-label="Previous testimonial">&#8592;</button><span>{String(active+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span><button onClick={() => setActive((active+1)%items.length)} aria-label="Next testimonial">&#8594;</button></div></div></div></section>;
}
