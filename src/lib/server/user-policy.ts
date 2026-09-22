import type { Permission, SessionUser } from "../permissions";
import { HttpError } from "./http";
export function assertCanManageUser(actor: SessionUser, currentPermissions: Permission[], desiredPermissions: Permission[], adminTarget: boolean) {
  if (actor.role === "admin") return;
  if (adminTarget || [...currentPermissions, ...desiredPermissions].some((p) => !actor.permissions.includes(p))) {
    throw new HttpError(403, "You cannot manage accounts with permissions beyond your own.");
  }
}
