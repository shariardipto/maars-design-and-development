import Link from "next/link";
import LogoutButton from "./LogoutButton";
import AdminNav from "./AdminNav";
import type { SessionUser } from "@/lib/permissions";
export default function AdminShell({user,children}:{user:SessionUser;children:React.ReactNode}) {
 return <div className="admin-shell"><aside className="admin-sidebar"><div><Link href="/admin" className="admin-brand">MDDL<span>STUDIO MANAGEMENT</span></Link><AdminNav user={user}/></div><div className="admin-account"><strong>{user.name}</strong><span>{user.role}</span><LogoutButton /></div></aside><div className="admin-workspace"><header className="admin-topbar"><span>Workspace / Administration</span><Link href="/" target="_blank">View website ↗</Link></header><main className="admin-main">{children}</main></div></div>;
}
