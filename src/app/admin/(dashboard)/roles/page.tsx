import { adminRead } from "@/lib/server/admin";
import RolesEditor from "@/components/admin/RolesEditor";
import type { Permission, Role } from "@/lib/permissions";

export default async function AdminRolesPage() {
  let roles: { name: Role; permissions: Permission[] }[];
  try {
    roles = (await adminRead("roles")) as { name: Role; permissions: Permission[] }[];
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <h1 className="mb-8 text-[24px] font-semibold">Roles & Permissions</h1>
      <RolesEditor roles={roles} />
    </div>
  );
}
