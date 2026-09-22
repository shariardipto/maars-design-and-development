import { notFound } from "next/navigation";
import { adminRead } from "@/lib/server/admin";
import { currentUser } from "@/lib/server/auth";
import UserForm from "@/components/admin/UserForm";
import type { Role } from "@/lib/permissions";
type UserRow={id:string;name:string;email:string;role:Role;active:number};
export default async function AdminUserEditPage({params}:{params:Promise<{id:string}>}) {
 const {id}=await params;const actor=await currentUser();
 if(!actor?.permissions.includes("users.write"))return <p role="alert">You do not have permission to manage users.</p>;
 const user=id==="new"?undefined:(await adminRead("users") as UserRow[]).find((u)=>u.id===id);
 if(id!=="new"&&!user)notFound();
 return <div><h1 className="mb-8 text-2xl font-semibold">{id==="new"?"New user":"Edit user"}</h1><UserForm user={user?{...user,active:!!user.active}:undefined} canManageAdmins={actor.role==="admin"}/></div>;
}
