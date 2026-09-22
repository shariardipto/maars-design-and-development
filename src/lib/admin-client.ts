export async function adminPost(resource: string, id: string | undefined, body: unknown) {
  const response = await fetch(`/api/admin/${resource}${id ? `/${id}` : ""}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = (await response.json()) as { error?: string } & Record<string, unknown>;
  if (!response.ok) throw new Error(payload.error || "The request could not be completed.");
  return payload;
}
