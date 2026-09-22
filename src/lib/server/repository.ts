import { db } from "./db";
import type { Project } from "../projects";
import { defaultContent, defaultIntegrations, defaultSettings } from "../config";
export type ManagedProject = Project & { id: string; status: "draft" | "published" | "archived"; featured: boolean; sortOrder: number; updatedAt: string };
type ProjectRow = Omit<ManagedProject, "gallery" | "featured" | "sortOrder" | "updatedAt"> & { gallery: string; featured: number; sort_order: number; updated_at: string };
function mapProject(row: ProjectRow): ManagedProject {
  const { sort_order, updated_at, ...rest } = row;
  return { ...rest, gallery: JSON.parse(row.gallery), featured: !!row.featured, sortOrder: sort_order, updatedAt: updated_at };
}
export function listProjects(all = false): ManagedProject[] {
  return (db().prepare(`SELECT * FROM projects ${all ? "" : "WHERE status='published'"} ORDER BY sort_order, title`).all() as ProjectRow[]).map(mapProject);
}
export function findProject(slug: string) { return listProjects().find((p) => p.slug === slug); }
const defaults = { settings: defaultSettings, content: defaultContent, integrations: defaultIntegrations };
export function getConfig<K extends keyof typeof defaults>(key: K): typeof defaults[K] {
  const row = db().prepare("SELECT value FROM config WHERE key=?").get(key) as { value: string } | undefined;
  return { ...defaults[key], ...(row ? JSON.parse(row.value) : {}) };
}
export function saveConfig(key: keyof typeof defaults, value: unknown) {
  db().prepare("INSERT INTO config(key,value) VALUES(?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").run(key, JSON.stringify(value));
}
