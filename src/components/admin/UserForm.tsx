"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import { roles, type Role } from "@/lib/permissions";

type ManagedUser = { id: string; name: string; email: string; role: Role; active: boolean };

export default function UserForm({
  user,
  canManageAdmins,
}: {
  user?: ManagedUser;
  canManageAdmins: boolean;
}) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(user?.role || "viewer");
  const [active, setActive] = useState(user?.active ?? true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const availableRoles = roles.filter((r) => r !== "admin" || canManageAdmins || user?.role === "admin");
  const field = "h-[42px] w-full border border-[#e5e5e5] px-3 text-[13px] outline-none focus:border-[#ff7e44]";
  const label = "mb-1 block text-[11px] uppercase tracking-[0.06em] text-[#7a7a7a]";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    const data = new FormData(event.currentTarget);

    try {
      await adminPost("users", user?.id, {
        name: data.get("name"),
        email: data.get("email"),
        role,
        active,
        password: data.get("password") || "",
      });
      router.push("/admin/users");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this user.");
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-[480px] flex-col gap-6 bg-white p-8 shadow-sm">
      <div>
        <label className={label}>Name</label>
        <input name="name" defaultValue={user?.name} required className={field} />
      </div>

      <div>
        <label className={label}>Email</label>
        <input name="email" type="email" defaultValue={user?.email} required className={field} />
      </div>

      <div>
        <label className={label}>Password {user ? "(leave blank to keep current)" : ""}</label>
        <input name="password" type="password" minLength={12} required={!user} className={field} />
      </div>

      <div>
        <label className={label}>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value as Role)} className={field}>
          {availableRoles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-[13px]">
        <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} />
        Active
      </label>

      {error && <p className="text-[13px] text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saving}
        className="h-[46px] w-fit bg-[#191919] px-8 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
      >
        {saving ? "Saving..." : "Save User"}
      </button>
    </form>
  );
}
