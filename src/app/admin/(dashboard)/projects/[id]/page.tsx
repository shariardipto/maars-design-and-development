import { notFound } from "next/navigation";
import { adminRead } from "@/lib/server/admin";
import { currentUser } from "@/lib/server/auth";
import ProjectForm from "@/components/admin/ProjectForm";
import type { ManagedProject } from "@/lib/server/repository";
export default async function AdminProjectEditPage({params}:{params:Promise<{id:string}>}) {
 const {id}=await params; const actor=await currentUser();
 if(!actor?.permissions.includes("projects.write")) return <p role="alert">You do not have permission to edit projects.</p>;
 const media=await adminRead("media") as string[];
 const project=id==="new"?undefined:(await adminRead("projects") as ManagedProject[]).find((p)=>p.id===id);
 if(id!=="new"&&!project)notFound();
 return <div><h1 className="mb-8 text-2xl font-semibold">{id==="new"?"New project":"Edit project"}</h1><ProjectForm project={project} media={media}/></div>;
}
