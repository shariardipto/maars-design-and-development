import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { z } from "zod";
import { db } from "@/lib/server/db";
import { tokenHash } from "@/lib/server/auth";
import { getConfig } from "@/lib/server/repository";
import { generateReply, type ChatMessage } from "@/lib/server/integrations";
import { clientKey, failure, HttpError, json, rateLimit, readBody, sameOrigin } from "@/lib/server/http";
import { acquireLock } from "@/lib/server/locks";
export async function GET() {
  try {
    if (!getConfig("settings").chatEnabled) return json({ messages: [] });
    const token = (await cookies()).get("mddl_chat")?.value;
    if (!token || !/^[a-f0-9]{64}$/.test(token)) return json({ messages: [] });
    const row = db().prepare("SELECT messages FROM conversations WHERE id=? AND channel='web'").get(tokenHash(token)) as { messages: string } | undefined;
    return json({ messages: row ? JSON.parse(row.messages) : [] });
  } catch (error) { return failure(error); }
}
export async function POST(request: Request) {
  let release: (() => void) | undefined;
  try {
    sameOrigin(request);
    if (!getConfig("settings").chatEnabled) throw new HttpError(503,"The assistant is currently unavailable. Please use the contact form.");
    rateLimit(`chat:${clientKey(request)}`, 12, 60_000); rateLimit("chat-global", 100, 3600_000);
    const { message } = z.object({ message: z.string().trim().min(1).max(2000) }).parse((await readBody(request, 5000)).value);
    const existingToken = (await cookies()).get("mddl_chat")?.value;
    const token = existingToken && /^[a-f0-9]{64}$/.test(existingToken) ? existingToken : randomBytes(32).toString("hex");
    const id = tokenHash(token);
    // Prevent overlapping requests on the same conversation from overwriting history.
    release = acquireLock(`chat:${id}`);
    const row = db().prepare("SELECT messages FROM conversations WHERE id=? AND channel='web'").get(id) as { messages: string } | undefined;
    const history: ChatMessage[] = row ? JSON.parse(row.messages) : [];
    if (history.length >= 40) throw new HttpError(429,"This conversation has reached its limit. Please contact the studio.");
    const messages: ChatMessage[] = [...history, { role: "user", content: message }];
    const reply = await generateReply(messages); messages.push({ role: "assistant", content: reply });
    db().prepare("INSERT INTO conversations(id,channel,sender,messages) VALUES(?,'web','Website visitor',?) ON CONFLICT(id) DO UPDATE SET messages=excluded.messages").run(id,JSON.stringify(messages));
    const response = json({ reply });
    response.headers.set("Set-Cookie", `mddl_chat=${token}; HttpOnly; SameSite=Lax; Path=/api/chat; Max-Age=86400${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
    return response;
  } catch (error) { return failure(error); }
  finally { release?.(); }
}
