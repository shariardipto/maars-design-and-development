import { test } from "node:test";
import assert from "node:assert/strict";
import { settingsSchema, imagePath, passwordSchema } from "../src/lib/validation";

test("settingsSchema requires a WhatsApp number once WhatsApp is enabled", () => {
  const base = {
    siteName: "MDDL",
    tagline: "",
    description: "",
    phone: "",
    email: "",
    address: "",
    instagram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    whatsappEnabled: true,
    whatsappNumber: "",
    whatsappMessage: "Hi",
    chatEnabled: false,
    chatTitle: "Chat",
    chatWelcome: "Hello",
  };

  assert.equal(settingsSchema.safeParse(base).success, false);
  assert.equal(settingsSchema.safeParse({ ...base, whatsappNumber: "18886541321" }).success, true);
  assert.equal(settingsSchema.safeParse({ ...base, whatsappEnabled: false }).success, true);
});

test("imagePath only accepts local /images paths with no traversal", () => {
  assert.equal(imagePath.safeParse("/images/home/photo.jpg").success, true);
  assert.equal(imagePath.safeParse("/etc/passwd").success, false);
  assert.equal(imagePath.safeParse("/images/../secret.png").success, false);
  assert.equal(imagePath.safeParse("/images/home/photo.exe").success, false);
  assert.equal(imagePath.safeParse("https://example.com/images/home/photo.png").success, false);
});

test("passwordSchema enforces a 12-character minimum", () => {
  assert.equal(passwordSchema.safeParse("short").success, false);
  assert.equal(passwordSchema.safeParse("a-perfectly-long-enough-password").success, true);
});
