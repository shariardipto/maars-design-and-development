"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { adminPost } from "@/lib/admin-client";
import { permissions, type Permission, type Role } from "@/lib/permissions";

type RoleRow = { name: Role; permissions: Permission[] };

export default function RolesEditor({ roles }: { roles: RoleRow[] }) {
  const router = useRouter();
  const editable = roles.filter((role) => role.name !== "admin");
  const [state, setState] = useState<Record<string, Permission[]>>(
    Object.fromEntries(editable.map((role) => [role.name, role.permissions])),
  );
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState("");

  function toggle(role: string, permission: Permission) {
    setState((current) => {
      const current_perms = current[role] || [];
      const next = current_perms.includes(permission)
        ? current_perms.filter((p) => p !== permission)
        : [...current_perms, permission];
      return { ...current, [role]: next };
    });
  }

  async function save(role: string) {
    setSaving(role);
    setError("");
    try {
      await adminPost("roles", undefined, { role, permissions: state[role] });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save this role.");
    } finally {
      setSaving(null);
    }
  }

  return (
    <div className="flex flex-col gap-10">
      {error && <p className="text-[13px] text-red-600">{error}</p>}

      {editable.map((role) => (
        <section key={role.name} className="bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-semibold capitalize">{role.name}</h2>
            <button
              type="button"
              disabled={saving === role.name}
              onClick={() => save(role.name)}
              className="h-[36px] bg-[#191919] px-5 text-[11px] font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#ff7e44] disabled:opacity-60"
            >
              {saving === role.name ? "Saving..." : "Save"}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {permissions.map((permission) => (
              <label key={permission} className="flex items-center gap-2 text-[12px] text-[#444]">
                <input
                  type="checkbox"
                  checked={state[role.name]?.includes(permission) ?? false}
                  onChange={() => toggle(role.name, permission)}
                />
                {permission}
              </label>
            ))}
          </div>
        </section>
      ))}

      <section className="bg-white p-8 text-[13px] text-[#7a7a7a] shadow-sm">
        <span className="font-semibold text-[#191919]">admin</span> always has every permission and cannot be
        changed.
      </section>
    </div>
  );
}
