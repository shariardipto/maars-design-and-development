"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Permission, SessionUser } from "@/lib/permissions";
const links: {label:string;href:string;permission:Permission}[] = [
{label:"Overview",href:"/admin",permission:"dashboard.read"},{label:"Projects",href:"/admin/projects",permission:"projects.read"},
{label:"Website content",href:"/admin/content",permission:"content.write"},{label:"Settings",href:"/admin/settings",permission:"settings.write"},
{label:"Integrations",href:"/admin/integrations",permission:"integrations.read"},{label:"Conversations",href:"/admin/conversations",permission:"integrations.read"},
{label:"Enquiries",href:"/admin/enquiries",permission:"enquiries.read"},{label:"Users",href:"/admin/users",permission:"users.read"},
{label:"Roles & permissions",href:"/admin/roles",permission:"roles.write"},{label:"Activity",href:"/admin/audit",permission:"audit.read"}];
export default function AdminNav({user}:{user:SessionUser}) {
 const pathname=usePathname();
 return <nav aria-label="Administration">{links.filter((l)=>user.permissions.includes(l.permission) && (l.permission!=="roles.write" || user.role==="admin")).map((l)=><Link key={l.href} href={l.href} aria-current={(l.href==="/admin" ? pathname===l.href : pathname.startsWith(l.href)) ? "page" : undefined}>{l.label}</Link>)}</nav>;
}
