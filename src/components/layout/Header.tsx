"use client";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FullscreenMenu from "./FullscreenMenu";
import type { SiteSettings } from "@/lib/config";
export default function Header({ settings }: { settings: SiteSettings }) {
  const [menuOpen,setMenuOpen] = useState(false); const trigger = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => setMenuOpen(false), []);
  return <><header className="site-header"><Link className="site-logo" href="/" aria-label={`${settings.siteName} home`}><Image src="/branding/logo.png" alt={settings.siteName} width={177} height={70} priority /></Link><div className="header-actions">{settings.phone && <a href={`tel:${settings.phone.replace(/[^+\d]/g,"")}`}>CALL US! <span>{settings.phone}</span></a>}<button ref={trigger} className="menu-toggle" onClick={() => setMenuOpen(true)} aria-label="Open menu" aria-expanded={menuOpen} aria-controls="site-menu"><span /><span /><span /></button></div></header><FullscreenMenu isOpen={menuOpen} onClose={close} triggerRef={trigger} /></>;
}
