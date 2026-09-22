export const permissions = ["dashboard.read", "projects.read", "projects.write", "content.write", "settings.write", "enquiries.read", "enquiries.write", "integrations.read", "integrations.write", "users.read", "users.write", "roles.write", "audit.read"] as const;
export type Permission = (typeof permissions)[number];
export const roles = ["admin", "manager", "editor", "viewer"] as const;
export type Role = (typeof roles)[number];
export const defaultPermissions: Record<Role, readonly Permission[]> = {
  admin: permissions,
  manager: permissions.filter((p) => !["users.write", "roles.write"].includes(p)),
  editor: ["dashboard.read", "projects.read", "projects.write", "content.write"],
  viewer: ["dashboard.read", "projects.read"],
};
export type SessionUser = { id: string; name: string; email: string; role: Role; permissions: Permission[] };
