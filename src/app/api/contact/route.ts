import { randomUUID } from "node:crypto";
import { enquirySchema } from "@/lib/validation";
import { db } from "@/lib/server/db";
import { clientKey, failure, HttpError, json, rateLimit, readBody, sameOrigin } from "@/lib/server/http";
export async function POST(request: Request) {
  try {
    sameOrigin(request); rateLimit(`contact:${clientKey(request)}`, 5, 600_000);
    const value = enquirySchema.parse((await readBody(request, 12000)).value);
    if (value.website) throw new HttpError(400, "Unable to submit this enquiry.");
    const id = randomUUID();
    db().prepare("INSERT INTO enquiries(id,name,email,message) VALUES(?,?,?,?)").run(id,value.name,value.email,value.message);
    return json({ ok: true, id }, 201);
  } catch (error) { return failure(error); }
}
