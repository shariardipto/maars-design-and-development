import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { randomUUID, randomBytes } from "node:crypto";

process.env.DATABASE_PATH = path.join(mkdtempSync(path.join(tmpdir(), "mddl-test-")), "auth.sqlite");

import { db } from "../src/lib/server/db";
import { createSession, userForToken, tokenHash } from "../src/lib/server/auth";
import { hashPassword } from "../src/lib/server/password";

async function seedUser(role: "admin" | "viewer" = "viewer") {
  const id = randomUUID();
  db()
    .prepare("INSERT INTO users(id,name,email,password_hash,role) VALUES(?,?,?,?,?)")
    .run(id, "Test User", `${id}@example.com`, await hashPassword("a-perfectly-long-enough-password"), role);
  return id;
}

test("createSession + userForToken returns the right user and permissions", async () => {
  const userId = await seedUser("viewer");
  const token = createSession(userId);
  const user = userForToken(token);

  assert.ok(user);
  assert.equal(user?.id, userId);
  assert.ok(user?.permissions.includes("dashboard.read"));
  assert.equal(user?.permissions.includes("users.write"), false);
});

test("userForToken returns null for missing, malformed or unknown tokens", () => {
  assert.equal(userForToken(undefined), null);
  assert.equal(userForToken("not-a-real-token"), null);
  assert.equal(userForToken("f".repeat(64)), null);
});

test("userForToken returns null for an expired session", async () => {
  const userId = await seedUser("viewer");
  const token = randomBytes(32).toString("hex");
  db()
    .prepare("INSERT INTO sessions VALUES(?,?,?)")
    .run(tokenHash(token), userId, Date.now() - 1000);

  assert.equal(userForToken(token), null);
});

test("userForToken returns null for a deactivated user", async () => {
  const userId = await seedUser("viewer");
  db().prepare("UPDATE users SET active=0 WHERE id=?").run(userId);
  const token = createSession(userId);

  assert.equal(userForToken(token), null);
});

test("admin sessions always resolve every permission, even if stale in the roles table", async () => {
  const userId = await seedUser("admin");
  const token = createSession(userId);
  const user = userForToken(token);

  assert.ok(user);
  assert.equal(user?.permissions.includes("roles.write"), true);
});
