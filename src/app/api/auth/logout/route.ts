import { cookies } from "next/headers";
import { cookieName, sessionCookie, tokenHash } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { failure, json, sameOrigin } from "@/lib/server/http";
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const token = (await cookies()).get(cookieName)?.value;
    if (token) db().prepare("DELETE FROM sessions WHERE token_hash=?").run(tokenHash(token));
    const response = json({ ok: true }); response.headers.set("Set-Cookie", sessionCookie("", 0)); return response;
  } catch (error) { return failure(error); }
}
