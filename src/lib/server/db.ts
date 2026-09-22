import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { projects } from "../projects";
import { defaultContent, defaultIntegrations, defaultSettings } from "../config";
import { defaultPermissions, roles } from "../permissions";

let database: DatabaseSync | undefined;
export function db() {
  if (database) return database;
  const filename = process.env.DATABASE_PATH || path.join(process.cwd(), "data", "mddl.sqlite");
  mkdirSync(path.dirname(path.resolve(/* turbopackIgnore: true */ filename)), { recursive: true });
  const connection = new DatabaseSync(filename);
  connection.exec("PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;");
  connection.exec("CREATE TABLE IF NOT EXISTS migrations (version INTEGER PRIMARY KEY, applied_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)");
  if (!connection.prepare("SELECT version FROM migrations WHERE version=1").get()) {
    connection.exec("BEGIN IMMEDIATE");
    try {
      // Another worker may have completed initialization while this worker waited.
      if (!connection.prepare("SELECT version FROM migrations WHERE version=1").get()) {
      connection.exec(`
        CREATE TABLE roles (name TEXT PRIMARY KEY, permissions TEXT NOT NULL);
        CREATE TABLE users (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE COLLATE NOCASE, password_hash TEXT NOT NULL, role TEXT NOT NULL REFERENCES roles(name), active INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE sessions (token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at INTEGER NOT NULL);
        CREATE INDEX session_expiry ON sessions(expires_at);
        CREATE TABLE projects (id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, title TEXT NOT NULL, category TEXT NOT NULL, cover TEXT NOT NULL, gallery TEXT NOT NULL, location TEXT NOT NULL, year TEXT NOT NULL, description TEXT NOT NULL, status TEXT NOT NULL CHECK(status IN ('draft','published','archived')), featured INTEGER NOT NULL DEFAULT 0, sort_order INTEGER NOT NULL DEFAULT 0, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE config (key TEXT PRIMARY KEY, value TEXT NOT NULL);
        CREATE TABLE enquiries (id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL, message TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'new', created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE conversations (id TEXT PRIMARY KEY, channel TEXT NOT NULL, external_id TEXT UNIQUE, sender TEXT NOT NULL, messages TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE audit (id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT NOT NULL, action TEXT NOT NULL, target TEXT NOT NULL, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
        CREATE TABLE rate_limits (key TEXT PRIMARY KEY, count INTEGER NOT NULL, expires_at INTEGER NOT NULL);
        CREATE INDEX rate_expiry ON rate_limits(expires_at);
        CREATE INDEX project_public ON projects(status, sort_order);
        INSERT INTO migrations(version) VALUES(1);`);
      const insertRole = connection.prepare("INSERT INTO roles VALUES (?, ?)");
      roles.forEach((role) => insertRole.run(role, JSON.stringify(defaultPermissions[role])));
      const insertConfig = connection.prepare("INSERT INTO config VALUES (?, ?)");
      Object.entries({ settings: defaultSettings, content: defaultContent, integrations: defaultIntegrations }).forEach(([key, value]) => insertConfig.run(key, JSON.stringify(value)));
      const insertProject = connection.prepare("INSERT INTO projects(id,slug,title,category,cover,gallery,location,year,description,status,featured,sort_order) VALUES (?,?,?,?,?,?,?,?,?,'published',?,?)");
      projects.forEach((p, i) => insertProject.run(randomUUID(), p.slug, p.title, p.category, p.cover, JSON.stringify(p.gallery), p.location, p.year, p.description, i < 6 ? 1 : 0, i));
      }
      connection.exec("COMMIT");
    } catch (error) { connection.exec("ROLLBACK"); connection.close(); throw error; }
  }
  connection.exec("BEGIN IMMEDIATE");
  try {
    if (!connection.prepare("SELECT version FROM migrations WHERE version=2").get()) {
      connection.exec("CREATE TABLE request_locks (key TEXT PRIMARY KEY, token TEXT NOT NULL, expires_at INTEGER NOT NULL); INSERT INTO migrations(version) VALUES(2);");
    }
    connection.exec("COMMIT");
  } catch (error) { connection.exec("ROLLBACK"); connection.close(); throw error; }
  database = connection;
  return connection;
}
export function transaction<T>(fn: () => T): T {
  db().exec("BEGIN IMMEDIATE");
  try { const result = fn(); db().exec("COMMIT"); return result; }
  catch (error) { db().exec("ROLLBACK"); throw error; }
}
export function audit(actor: string, action: string, target: string) {
  db().prepare("INSERT INTO audit(actor,action,target) VALUES(?,?,?)").run(actor, action, target);
}
