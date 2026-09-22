"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function RevealMotion() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry,index) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        element.animate(element.dataset.reveal === "image" ? [{clipPath:"inset(0 100% 0 0)",transform:"translateY(20px)"},{clipPath:"inset(0 0 0 0)",transform:"translateY(0)"}] : [{opacity:0,transform:"translateY(45px)"},{opacity:1,transform:"translateY(0)"}],{duration:element.dataset.reveal === "image" ? 1500 : 1100,delay:Math.min(index*100,300),easing:"cubic-bezier(.165,.84,.44,1)",fill:"backwards"});
        observer.unobserve(element);
      });
    },{threshold:0.08});
    document.querySelectorAll("[data-reveal]").forEach((element)=>observer.observe(element));
    return () => observer.disconnect();
  },[pathname]);
  return null;
}
