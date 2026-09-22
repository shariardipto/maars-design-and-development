import { z } from "zod";
import { audit, db } from "@/lib/server/db";
import { createSession, sessionCookie } from "@/lib/server/auth";
import { verifyPassword } from "@/lib/server/password";
import { clientKey, failure, HttpError, json, rateLimit, readBody, sameOrigin } from "@/lib/server/http";
import { createHash } from "node:crypto";
export async function POST(request: Request) {
  try {
    sameOrigin(request); rateLimit(`login-ip:${clientKey(request)}`, 30, 900_000);
    const { email, password } = z.object({ email: z.email().max(254).transform((s) => s.toLowerCase()), password: z.string().max(128) }).parse((await readBody(request, 2048)).value);
    rateLimit(`login-email:${createHash("sha256").update(email).digest("hex")}`, 8, 900_000);
    const user = db().prepare("SELECT id,password_hash,active FROM users WHERE email=?").get(email) as { id: string; password_hash: string; active: number } | undefined;
    const valid = await verifyPassword(password, user?.password_hash || `scrypt:00000000000000000000000000000000:${"0".repeat(128)}`);
    if (!user || !valid || !user.active) throw new HttpError(401, "Email or password is incorrect.");
    const token = createSession(user.id); audit(user.id, "auth.login", user.id);
    const response = json({ ok: true }); response.headers.set("Set-Cookie", sessionCookie(token)); return response;
  } catch (error) { return failure(error); }
}
