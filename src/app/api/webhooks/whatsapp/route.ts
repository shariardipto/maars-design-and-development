import { createHash, randomUUID, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { db, transaction } from "@/lib/server/db";
import { failure, HttpError, json, readBody } from "@/lib/server/http";
import { validWebhookSignature } from "@/lib/server/integrations";
import { getConfig } from "@/lib/server/repository";
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams; const expected = process.env.WHATSAPP_VERIFY_TOKEN;
  const hash = (s: string) => createHash("sha256").update(s).digest();
  if (!expected || query.get("hub.mode") !== "subscribe" || !timingSafeEqual(hash(query.get("hub.verify_token") || ""), hash(expected))) return json({ error: "Verification failed." }, 403);
  return new Response(query.get("hub.challenge") || "", { headers: { "Cache-Control": "no-store" } });
}
const webhookSchema = z.object({ object: z.literal("whatsapp_business_account"), entry: z.array(z.object({ changes: z.array(z.object({ value: z.object({ metadata: z.object({ phone_number_id: z.string() }).optional(), messages: z.array(z.object({ id: z.string().max(300), from: z.string().max(30), type: z.string(), text: z.object({ body: z.string().max(10000) }).optional() })).optional() }) })) })) });
export async function POST(request: Request) {
  try {
    const secret = process.env.WHATSAPP_APP_SECRET;
    if (!secret) throw new HttpError(503,"Webhook is not configured.");
    const { raw, value } = await readBody(request, 256_000);
    if (!validWebhookSignature(raw, request.headers.get("x-hub-signature-256"), secret)) throw new HttpError(401,"Invalid signature.");
    const payload = webhookSchema.parse(value); const phoneId = getConfig("integrations").whatsappPhoneId;
    transaction(() => {
      for (const entry of payload.entry) for (const change of entry.changes) {
        if (!phoneId || change.value.metadata?.phone_number_id !== phoneId) continue;
        for (const message of change.value.messages || []) db().prepare("INSERT OR IGNORE INTO conversations(id,channel,external_id,sender,messages) VALUES(?,'whatsapp',?,?,?)").run(randomUUID(),message.id,message.from,JSON.stringify([{ role: "user", content: message.text?.body || `[${message.type} message]` }]));
      }
    }); return json({ received: true });
  } catch (error) { return failure(error); }
}
