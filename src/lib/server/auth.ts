import { randomBytes, createHash } from "node:crypto";
import { cookies } from "next/headers";
import { db } from "./db";
import { HttpError } from "./http";
import { permissions, type Permission, type SessionUser } from "../permissions";

export const cookieName = "mddl_session";
export const sessionAge = 8 * 60 * 60;
export const tokenHash = (token: string) => createHash("sha256").update(token).digest("hex");
export function createSession(userId: string) {
  const token = randomBytes(32).toString("hex");
  db().prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  db().prepare("INSERT INTO sessions VALUES(?,?,?)").run(tokenHash(token), userId, Date.now() + sessionAge * 1000);
  return token;
}
export function userForToken(token?: string): SessionUser | null {
  if (!token || !/^[a-f0-9]{64}$/.test(token)) return null;
  const row = db().prepare("SELECT u.id,u.name,u.email,u.role,r.permissions FROM sessions s JOIN users u ON u.id=s.user_id JOIN roles r ON r.name=u.role WHERE s.token_hash=? AND s.expires_at>? AND u.active=1").get(tokenHash(token), Date.now()) as (Omit<SessionUser, "permissions"> & { permissions: string }) | undefined;
  if (!row) return null;
  return { ...row, permissions: row.role === "admin" ? [...permissions] : JSON.parse(row.permissions) };
}
export async function currentUser() { return userForToken((await cookies()).get(cookieName)?.value); }
export async function requireUser(permission?: Permission) {
  const user = await currentUser();
  if (!user) throw new HttpError(401, "Please sign in.");
  if (permission && !user.permissions.includes(permission)) throw new HttpError(403, "You do not have permission for this action.");
  return user;
}
export function sessionCookie(token: string, maxAge = sessionAge) {
  return `${cookieName}=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAge}${process.env.NODE_ENV === "production" ? "; Secure" : ""}`;
}
