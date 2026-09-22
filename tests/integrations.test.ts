import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { validWebhookSignature } from "../src/lib/server/integrations";

test("validWebhookSignature accepts a correctly signed payload", () => {
  const secret = "test-secret";
  const body = JSON.stringify({ hello: "world" });
  const signature = `sha256=${createHmac("sha256", secret).update(body).digest("hex")}`;

  assert.equal(validWebhookSignature(body, signature, secret), true);
});

test("validWebhookSignature rejects a tampered body", () => {
  const secret = "test-secret";
  const signature = `sha256=${createHmac("sha256", secret).update("original").digest("hex")}`;

  assert.equal(validWebhookSignature("tampered", signature, secret), false);
});

test("validWebhookSignature rejects a malformed signature header", () => {
  assert.equal(validWebhookSignature("body", "not-a-signature", "secret"), false);
  assert.equal(validWebhookSignature("body", null, "secret"), false);
  assert.equal(validWebhookSignature("body", "sha256=short", "secret"), false);
});
