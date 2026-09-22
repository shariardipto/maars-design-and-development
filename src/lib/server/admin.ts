import { randomUUID } from "node:crypto";
import { existsSync, readdirSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { audit, db, transaction } from "./db";
import { requireUser } from "./auth";
import { getConfig, listProjects, saveConfig } from "./repository";
import { HttpError } from "./http";
import { hashPassword } from "./password";
import { contentSchema, integrationSchema, passwordSchema, projectSchema, roleSchema, settingsSchema, userSchema } from "../validation";
import type { Permission } from "../permissions";
import { integrationStatus, testIntegration } from "./integrations";

const access: Record<string, Permission> = { dashboard: "dashboard.read", projects: "projects.read", settings: "settings.write", content: "content.write", integrations: "integrations.read", users: "users.read", roles: "roles.write", enquiries: "enquiries.read", conversations: "integrations.read", audit: "audit.read", media: "projects.read" };
export async function adminRead(resource: string) {
  if (resource === "me") return requireUser();
  if (!access[resource]) throw new HttpError(404, "Not found.");
  const user = await requireUser(access[resource]);
  if (resource === "dashboard") {
    const count = (sql: string) => (db().prepare(sql).get() as { n: number }).n;
    return { projects: count("SELECT count(*) n FROM projects WHERE status='published'"), drafts: count("SELECT count(*) n FROM projects WHERE status='draft'"), enquiries: user.permissions.includes("enquiries.read") ? count("SELECT count(*) n FROM enquiries WHERE status='new'") : null, users: user.permissions.includes("users.read") ? count("SELECT count(*) n FROM users WHERE active=1") : null };
  }
  if (resource === "projects") return listProjects(true);
  if (resource === "settings" || resource === "content") return getConfig(resource);
  if (resource === "integrations") return { ...getConfig("integrations"), status: integrationStatus() };
  if (resource === "users") return db().prepare("SELECT id,name,email,role,active,created_at FROM users ORDER BY created_at DESC").all();
  if (resource === "roles") return db().prepare("SELECT * FROM roles").all().map((r) => ({ ...r, permissions: JSON.parse(r.permissions as string) }));
  if (resource === "enquiries") return db().prepare("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 500").all();
  if (resource === "conversations") return db().prepare("SELECT * FROM conversations ORDER BY created_at DESC LIMIT 100").all().map((r) => ({ ...r, messages: JSON.parse(r.messages as string) }));
  if (resource === "audit") return db().prepare("SELECT a.*,coalesce(u.name,a.actor) actor_name FROM audit a LEFT JOIN users u ON u.id=a.actor ORDER BY a.id DESC LIMIT 200").all();
  if (resource === "media") return readdirSync(path.join(process.cwd(), "public/images"), { recursive: true }).filter((p) => /\.(jpg|jpeg|png|webp|avif)$/i.test(String(p))).map((p) => `/images/${String(p).replaceAll("\\", "/")}`);
}
export async function adminWrite(resource: string, id: string | undefined, body: unknown) {
  if (resource === "projects") {
    const user = await requireUser("projects.write"); const p = projectSchema.parse(body);
    for (const image of [p.cover, ...p.gallery]) if (!existsSync(path.join(process.cwd(), "public", image))) throw new HttpError(400, `Image not found: ${image}`);
    const projectId = id || randomUUID();
    transaction(() => {
      if (id) {
        const result = db().prepare("UPDATE projects SET slug=?,title=?,category=?,cover=?,gallery=?,location=?,year=?,description=?,status=?,featured=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").run(p.slug,p.title,p.category,p.cover,JSON.stringify(p.gallery),p.location,p.year,p.description,p.status,Number(p.featured),p.sortOrder,id);
        if (!result.changes) throw new HttpError(404, "Project not found.");
      } else db().prepare("INSERT INTO projects(id,slug,title,category,cover,gallery,location,year,description,status,featured,sort_order) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)").run(projectId,p.slug,p.title,p.category,p.cover,JSON.stringify(p.gallery),p.location,p.year,p.description,p.status,Number(p.featured),p.sortOrder);
      audit(user.id, id ? "project.update" : "project.create", projectId);
    }); return { id: projectId };
  }
  if (resource === "settings" || resource === "content" || resource === "integrations") {
    const user = await requireUser(resource === "settings" ? "settings.write" : resource === "content" ? "content.write" : "integrations.write");
    if (resource === "integrations" && id === "test") {
      const { provider } = z.object({ provider: z.enum(["whatsapp", "chatbot"]) }).parse(body);
      return testIntegration(provider);
    }
    const value = (resource === "settings" ? settingsSchema : resource === "content" ? contentSchema : integrationSchema).parse(body);
    if (resource === "content") for (const [key, image] of Object.entries(value)) if (key.endsWith("Image") && typeof image === "string" && !existsSync(path.join(process.cwd(), "public", image))) throw new HttpError(400, `Image not found: ${image}`);
    transaction(() => { saveConfig(resource, value); audit(user.id, `${resource}.update`, resource); }); return { ok: true };
  }
  if (resource === "users") {
    const actor = await requireUser("users.write"); const value = userSchema.parse(body);
    // Only administrators may create, edit or assign administrators, even with delegated user management.
    const existing = id ? db().prepare("SELECT role FROM users WHERE id=?").get(id) as { role: string } | undefined : undefined;
    if ((value.role === "admin" || existing?.role === "admin") && actor.role !== "admin") throw new HttpError(403, "Only administrators can manage administrators.");
    const password = value.password ? await hashPassword(value.password) : undefined;
    if (!id && !password) passwordSchema.parse("");
    const userId = id || randomUUID();
    transaction(() => {
      if (id) {
        if (!existing) throw new HttpError(404, "User not found.");
        if (id === actor.id && (!value.active || value.role !== actor.role)) throw new HttpError(400, "You cannot disable yourself or change your own role.");
        if (existing.role === "admin" && (!value.active || value.role !== "admin")) {
          const others = db().prepare("SELECT count(*) n FROM users WHERE role='admin' AND active=1 AND id<>?").get(id) as { n: number };
          if (!others.n) throw new HttpError(400, "Keep at least one active administrator.");
        }
        db().prepare("UPDATE users SET name=?,email=?,role=?,active=? WHERE id=?").run(value.name,value.email,value.role,Number(value.active),id);
        if (password) db().prepare("UPDATE users SET password_hash=? WHERE id=?").run(password,id);
        db().prepare("DELETE FROM sessions WHERE user_id=?").run(id);
      } else db().prepare("INSERT INTO users(id,name,email,role,active,password_hash) VALUES(?,?,?,?,?,?)").run(userId,value.name,value.email,value.role,Number(value.active),password!);
      audit(actor.id, id ? "user.update" : "user.create", userId);
    }); return { id: userId };
  }
  if (resource === "roles") {
    const actor = await requireUser("roles.write");
    if (actor.role !== "admin") throw new HttpError(403, "Only administrators can change role permissions.");
    const value = roleSchema.parse(body);
    transaction(() => { db().prepare("UPDATE roles SET permissions=? WHERE name=?").run(JSON.stringify([...new Set(value.permissions)]),value.role); audit(actor.id,"role.update",value.role); });
    return { ok: true };
  }
  if (resource === "enquiries" && id) {
    const user = await requireUser("enquiries.write"); const { status } = z.object({ status: z.enum(["new", "in-progress", "closed"]) }).parse(body);
    transaction(() => { const result = db().prepare("UPDATE enquiries SET status=? WHERE id=?").run(status,id); if (!result.changes) throw new HttpError(404,"Enquiry not found."); audit(user.id,"enquiry.update",id); }); return { ok: true };
  }
  throw new HttpError(404, "Not found.");
}
