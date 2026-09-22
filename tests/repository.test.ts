import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

process.env.DATABASE_PATH = path.join(mkdtempSync(path.join(tmpdir(), "mddl-test-")), "repository.sqlite");

import { db } from "../src/lib/server/db";
import { listProjects, getConfig, saveConfig } from "../src/lib/server/repository";

test("listProjects only returns published projects by default", () => {
  const all = listProjects(true);
  const published = listProjects(false);

  assert.ok(all.length > 0, "seed data should include projects");
  assert.ok(published.every((project) => project.status === "published"));
  assert.ok(published.length <= all.length);

  db().prepare("UPDATE projects SET status='draft' WHERE id=?").run(all[0].id);
  const afterDraft = listProjects(false);
  assert.equal(afterDraft.some((project) => project.id === all[0].id), false);
});

test("getConfig/saveConfig round-trips and merges over defaults", () => {
  const before = getConfig("settings");
  assert.equal(before.whatsappEnabled, false);

  saveConfig("settings", { ...before, whatsappEnabled: true, whatsappNumber: "18886541321" });
  const after = getConfig("settings");

  assert.equal(after.whatsappEnabled, true);
  assert.equal(after.whatsappNumber, "18886541321");
  assert.equal(after.siteName, before.siteName);
});
