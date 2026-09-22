import Link from "next/link";
import { adminRead } from "@/lib/server/admin";
import type { Role } from "@/lib/permissions";

type UserRow = { id: string; name: string; email: string; role: Role; active: number; created_at: string };

export default async function AdminUsersPage() {
  let users: UserRow[];
  try {
    users = (await adminRead("users")) as UserRow[];
  } catch (error) {
    return <p className="text-[14px] text-[#7a7a7a]">{error instanceof Error ? error.message : "Access denied."}</p>;
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-[24px] font-semibold">Users</h1>
        <Link
          href="/admin/users/new"
          className="inline-flex h-[40px] items-center bg-[#191919] px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44]"
        >
          New User
        </Link>
      </div>

      <div className="overflow-hidden bg-white shadow-sm">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#f0f0f0] text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-[#eee]">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-[#7a7a7a]">{user.email}</td>
                <td className="px-4 py-3 capitalize text-[#7a7a7a]">{user.role}</td>
                <td className="px-4 py-3 text-[#7a7a7a]">{user.active ? "Yes" : "No"}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/users/${user.id}`} className="text-[#ff7e44] hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
