import { test } from "node:test";
import assert from "node:assert/strict";
import { permissions, defaultPermissions } from "../src/lib/permissions";

test("admin has every permission", () => {
  assert.deepEqual([...defaultPermissions.admin].sort(), [...permissions].sort());
});

test("viewer only has read-only permissions", () => {
  assert.deepEqual([...defaultPermissions.viewer].sort(), ["dashboard.read", "projects.read"].sort());
});

test("manager cannot manage users or role permissions", () => {
  assert.equal(defaultPermissions.manager.includes("users.write"), false);
  assert.equal(defaultPermissions.manager.includes("roles.write"), false);
  assert.equal(defaultPermissions.manager.includes("projects.write"), true);
});

test("editor cannot write settings, users or roles", () => {
  assert.equal(defaultPermissions.editor.includes("settings.write"), false);
  assert.equal(defaultPermissions.editor.includes("users.write"), false);
  assert.equal(defaultPermissions.editor.includes("content.write"), true);
});
