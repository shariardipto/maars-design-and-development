import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

process.env.DATABASE_PATH = path.join(mkdtempSync(path.join(tmpdir(), "mddl-test-")), "http.sqlite");
process.env.APP_ORIGIN = "http://localhost:3000";

import { rateLimit, sameOrigin, HttpError } from "../src/lib/server/http";

test("rateLimit allows requests under the limit and throws once exceeded", () => {
  const key = `test-key-${Date.now()}`;
  rateLimit(key, 3);
  rateLimit(key, 3);
  rateLimit(key, 3);
  assert.throws(() => rateLimit(key, 3), HttpError);
});

test("rateLimit tracks separate keys independently", () => {
  const keyA = `test-a-${Date.now()}`;
  const keyB = `test-b-${Date.now()}`;
  rateLimit(keyA, 1);
  assert.throws(() => rateLimit(keyA, 1), HttpError);
  assert.doesNotThrow(() => rateLimit(keyB, 1));
});

test("sameOrigin passes when Origin matches APP_ORIGIN and throws otherwise", () => {
  const good = new Request("http://localhost:3000/api/test", {
    headers: { origin: "http://localhost:3000" },
  });
  assert.doesNotThrow(() => sameOrigin(good));

  const bad = new Request("http://localhost:3000/api/test", {
    headers: { origin: "http://evil.example" },
  });
  assert.throws(() => sameOrigin(bad), HttpError);

  const missing = new Request("http://localhost:3000/api/test");
  assert.throws(() => sameOrigin(missing), HttpError);
});
