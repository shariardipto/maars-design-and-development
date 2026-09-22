import { adminRead, adminWrite } from "@/lib/server/admin";
import { failure, HttpError, json, readBody, sameOrigin } from "@/lib/server/http";
import { requireUser } from "@/lib/server/auth";
export const runtime = "nodejs";
type Context = { params: Promise<{ path: string[] }> };
export async function GET(_request: Request, context: Context) {
  try { const { path } = await context.params; if (path.length !== 1) throw new HttpError(404,"Not found."); return json(await adminRead(path[0])); }
  catch (error) { return failure(error); }
}
export async function POST(request: Request, context: Context) {
  try {
    sameOrigin(request); await requireUser();
    const { path } = await context.params; if (path.length > 2) throw new HttpError(404,"Not found.");
    return json(await adminWrite(path[0], path[1], (await readBody(request, 100_000)).value));
  } catch (error) { return failure(error); }
}
