import { createHash } from "node:crypto";
import { ZodError } from "zod";
import { db } from "./db";

export class HttpError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
export function json(value: unknown, status = 200) { return Response.json(value, { status, headers: { "Cache-Control": "no-store" } }); }
export function failure(error: unknown) {
  if (error instanceof HttpError) return json({ error: error.message }, error.status);
  if (error instanceof ZodError) return json({ error: error.issues.map((i) => `${i.path.join(".") || "Form"}: ${i.message}`).join("; ") }, 400);
  if (error instanceof Error && error.message.includes("UNIQUE constraint")) return json({ error: "That email or project slug already exists." }, 409);
  console.error("Request failed:", error instanceof Error ? error.name : "Unknown error");
  return json({ error: "The request could not be completed. Please try again." }, 500);
}
export function sameOrigin(request: Request) {
  const expected = new URL(process.env.APP_ORIGIN || request.url).origin;
  if (request.headers.get("origin") !== expected) throw new HttpError(403, "This request must come from this website.");
}
export async function readBody(request: Request, maxBytes = 32_768) {
  if (!request.headers.get("content-type")?.includes("application/json")) throw new HttpError(415, "Send application/json.");
  const reader = request.body?.getReader();
  if (!reader) throw new HttpError(400, "A request body is required.");
  const chunks: Uint8Array[] = []; let length = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    length += value.byteLength;
    if (length > maxBytes) { await reader.cancel(); throw new HttpError(413, "The request is too large."); }
    chunks.push(value);
  }
  const raw = Buffer.concat(chunks).toString("utf8");
  try { return { value: JSON.parse(raw) as unknown, raw }; }
  catch { throw new HttpError(400, "Invalid JSON."); }
}
export function clientKey(request: Request) {
  // Only trust a forwarding header when the deployment's reverse proxy overwrites it.
  const ip = process.env.TRUST_PROXY === "true" ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() : "shared";
  return createHash("sha256").update(ip || "shared").digest("hex");
}
export function rateLimit(key: string, limit: number, windowMs = 60_000) {
  const now = Date.now();
  db().prepare("DELETE FROM rate_limits WHERE expires_at < ?").run(now);
  const row = db().prepare("INSERT INTO rate_limits(key,count,expires_at) VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count").get(key, now + windowMs) as { count: number };
  if (row.count > limit) throw new HttpError(429, "Too many requests. Please try again later.");
}
