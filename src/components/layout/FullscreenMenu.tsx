"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
const items = [{ label: "Home", href: "/" },{ label: "About", href: "/about" },{ label: "Project", href: "/projects" },{ label: "Services", href: "/services" },{ label: "Contact", href: "/contact" }];
export default function FullscreenMenu({ isOpen,onClose,triggerRef }: { isOpen:boolean; onClose:()=>void; triggerRef?: React.RefObject<HTMLButtonElement|null> }) {
  const dialog = useRef<HTMLDialogElement>(null); const pathname = usePathname();
  useEffect(() => {
    if (!isOpen) return;
    const element = dialog.current; const trigger = triggerRef?.current; const overflow = document.body.style.overflow;
    element?.showModal(); document.body.style.overflow="hidden";
    return () => { element?.close(); document.body.style.overflow=overflow; trigger?.focus(); };
  },[isOpen,triggerRef]);
  if (!isOpen) return null;
  return <dialog id="site-menu" ref={dialog} className="fullscreen-menu" aria-label="Site navigation" onCancel={onClose}><div className="menu-photo" aria-hidden="true" /><div className="menu-content"><button className="menu-close" onClick={onClose} aria-label="Close menu">&times;</button><nav>{items.map((item,index) => <Link key={item.href} href={item.href} onClick={onClose} aria-current={pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)) ? "page" : undefined}><small>{String(index+1).padStart(2,"0")}</small>{item.label}</Link>)}</nav><div className="menu-outline" aria-hidden="true">Architect</div></div></dialog>;
}
