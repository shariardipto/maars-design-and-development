import { randomUUID } from "node:crypto";
import { db } from "./db";
import { HttpError } from "./http";
export function acquireLock(key: string, ttl = 30_000) {
  const token = randomUUID(); const now = Date.now();
  db().prepare("DELETE FROM request_locks WHERE expires_at < ?").run(now);
  const result = db().prepare("INSERT OR IGNORE INTO request_locks(key,token,expires_at) VALUES(?,?,?)").run(key,token,now+ttl);
  if (!result.changes) throw new HttpError(409, "A reply is already being prepared. Please wait.");
  return () => { db().prepare("DELETE FROM request_locks WHERE key=? AND token=?").run(key,token); };
}
