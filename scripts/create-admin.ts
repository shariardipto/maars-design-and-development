import { randomUUID } from "node:crypto";
import { db, audit } from "../src/lib/server/db";
import { hashPassword } from "../src/lib/server/password";
import { passwordSchema } from "../src/lib/validation";
import { z } from "zod";
async function main() {
  const email = z.email().parse(process.env.ADMIN_EMAIL).toLowerCase();
  const password = passwordSchema.parse(process.env.ADMIN_PASSWORD);
  const name = z.string().min(1).max(100).parse(process.env.ADMIN_NAME || "Administrator");
  if (db().prepare("SELECT id FROM users WHERE email=?").get(email)) throw new Error("That account already exists. Use the admin panel to manage it.");
  const id = randomUUID();
  db().prepare("INSERT INTO users(id,name,email,password_hash,role) VALUES(?,?,?,?,'admin')").run(id,name,email,await hashPassword(password));
  audit("bootstrap", "user.create", id);
  console.log("Administrator created. Sign in at /admin/login.");
}
main().catch((error) => { console.error(error instanceof Error ? error.message : "Admin setup failed."); process.exitCode = 1; });
